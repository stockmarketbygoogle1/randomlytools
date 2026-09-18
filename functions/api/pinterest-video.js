export async function onRequestGet(context) {
  const requestUrl = new URL(context.request.url);
  const input = requestUrl.searchParams.get("url");

  if (!input) return json({ ok: false, error: "Missing Pinterest URL." }, 400);

  let target;
  try {
    target = new URL(input);
  } catch {
    return json({ ok: false, error: "Invalid URL." }, 400);
  }

  if (!isPinterestHost(target.hostname) || !["http:", "https:"].includes(target.protocol)) {
    return json({ ok: false, error: "Only Pinterest URLs are supported." }, 400);
  }

  try {
    const response = await fetch(target.toString(), {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RandomlyTools Pinterest Downloader/1.0)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.8"
      }
    });

    if (!response.ok) {
      return json({ ok: false, error: "Pinterest could not provide this public Pin page." }, 502);
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return json({ ok: false, error: "The Pinterest link did not return a public Pin page." }, 502);
    }

    const html = await response.text();
    const limitedHtml = html.slice(0, 8_000_000);
    const candidates = extractVideoCandidates(limitedHtml);

    if (!candidates.length) {
      return json({
        ok: false,
        error: "No downloadable public video source was found. The Pin may be an image, restricted, or not currently supported."
      }, 404);
    }

    return json({
      ok: true,
      sourceUrl: response.url,
      videos: candidates.slice(0, 8)
    });
  } catch {
    return json({ ok: false, error: "Pinterest could not be processed right now. Please try again." }, 502);
  }
}

function isPinterestHost(hostname) {
  const host = hostname.toLowerCase();
  return host === "pinterest.com" || host.endsWith(".pinterest.com") || host === "pin.it";
}

function extractVideoCandidates(html) {
  const found = new Map();

  const add = (raw, label = "Available video") => {
    if (!raw) return;
    let value = raw;
    try { value = JSON.parse(`"${raw.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`); } catch {}
    value = decodeHtml(value).replace(/\\u002F/gi, "/").replace(/\\\//g, "/").replace(/\\u003A/gi, ":").trim();
    if (!/^https?:\/\//i.test(value) || !/\.(mp4|m3u8)(?:[?#]|$)/i.test(value)) return;
    if (isUnsafeMediaHost(value)) return;
    found.set(value, { url: value, quality: inferQuality(value), label });
  };

  const metaPatterns = [
    /<meta[^>]+property=["']og:video(?::secure_url|:url)?["'][^>]+content=["']([^"']+)["'][^>]*>/gi,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:video(?::secure_url|:url)?["'][^>]*>/gi
  ];
  for (const pattern of metaPatterns) {
    let match;
    while ((match = pattern.exec(html))) add(match[1], "Pinterest video");
  }

  const keyPattern = /["'](?:video_url|url|src)["']\s*:\s*["'](https?:\\?\/\\?\/[^"']+?(?:mp4|m3u8)(?:[^"']*)?)["']/gi;
  let match;
  while ((match = keyPattern.exec(html))) add(match[1], "Detected video source");

  const directPattern = /https?:\\?\/\\?\/[^\s"'<>\\]+?\.(?:mp4|m3u8)(?:\?[^\s"'<>\\]*)?/gi;
  while ((match = directPattern.exec(html))) add(match[0], "Detected video source");

  return [...found.values()].sort((a, b) => qualityScore(b.quality) - qualityScore(a.quality));
}

function decodeHtml(value) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x2F;/gi, "/").replace(/&#47;/g, "/");
}

function inferQuality(url) {
  const match = url.match(/(?:^|[^0-9])(2160|1440|1080|720|480|360)p?(?:[^0-9]|$)/i);
  return match ? `${match[1]}p` : "Available";
}

function qualityScore(value) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function isUnsafeMediaHost(value) {
  try {
    const host = new URL(value).hostname.toLowerCase();
    return ["localhost", "127.0.0.1", "0.0.0.0", "::1"].includes(host) || host.endsWith(".local");
  } catch {
    return true;
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*"
    }
  });
}
