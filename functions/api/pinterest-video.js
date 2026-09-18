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
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none"
      }
    });

    if (!response.ok) {
      return json({ ok: false, error: "Pinterest could not provide this public Pin page." }, 502);
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return json({ ok: false, error: "The Pinterest link did not return a public Pin page." }, 502);
    }

    const html = (await response.text()).slice(0, 12_000_000);
    const candidates = extractVideoCandidates(html);

    if (!candidates.length) {
      return json({
        ok: false,
        error: "No downloadable public video source was found. Try a direct public Pin link (not a board, profile, or search URL)."
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
  const decoded = decodeEmbedded(html);

  const add = (raw, label = "Available video") => {
    if (!raw) return;
    let value = decodeEmbedded(raw).trim();
    if (!/^https?:\/\//i.test(value)) return;
    if (!/\.(mp4|m3u8)(?:[?#]|$)/i.test(value)) return;
    if (isUnsafeMediaHost(value)) return;

    found.set(value, {
      url: value,
      quality: inferQuality(value),
      label
    });
  };

  // Open Graph video tags.
  const metaPatterns = [
    /<meta[^>]+property=["']og:video(?::secure_url|:url)?["'][^>]+content=["']([^"']+)["'][^>]*>/gi,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:video(?::secure_url|:url)?["'][^>]*>/gi,
    /<meta[^>]+name=["']twitter:player:stream["'][^>]+content=["']([^"']+)["'][^>]*>/gi
  ];
  for (const pattern of metaPatterns) {
    let match;
    while ((match = pattern.exec(html))) add(match[1], "Pinterest video");
  }

  // Pinterest commonly embeds video data under video_list / videos.videoList / videoUrls.
  const pinimgPattern = /https?:\\?\/?\\?\/?(?:v\d+\.)?pinimg\.com\/videos\/[A-Za-z0-9_./%-]+\.(?:mp4|m3u8)(?:\?[^\s"'<>\\]*)?/gi;
  let match;
  while ((match = pinimgPattern.exec(decoded))) add(match[0], "Pinterest video source");

  // Generic MP4/HLS URLs embedded in the server-rendered page.
  const directPattern = /https?:\/\/[^\s"'<>]+?\.(?:mp4|m3u8)(?:\?[^\s"'<>]*)?/gi;
  while ((match = directPattern.exec(decoded))) add(match[0], "Detected video source");

  // JSON properties can contain URLs whose key is video_url, url, src, or progressive_url.
  const keyPattern = /["'](?:video_url|videoUrl|progressive_url|progressiveUrl|url|src)["']\s*:\s*["'](https?:\/\/[^"']+?\.(?:mp4|m3u8)(?:\?[^"']*)?)["']/gi;
  while ((match = keyPattern.exec(decoded))) add(match[1], "Detected video source");

  // Some public Pins expose an HLS URL. Where Pinterest uses the conventional
  // /hls/<name>.m3u8 and /720p/<name>.mp4 layout, add the progressive MP4 too.
  for (const item of [...found.values()]) {
    if (/\.m3u8(?:[?#]|$)/i.test(item.url) && /\/hls\//i.test(item.url)) {
      const progressive = item.url.replace(/\/hls\//i, "/720p/").replace(/\.m3u8(?=$|[?#])/i, ".mp4");
      add(progressive, "720p MP4");
    }
  }

  return [...found.values()].sort((a, b) => qualityScore(b.quality) - qualityScore(a.quality));
}

function decodeEmbedded(value) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#x2F;/gi, "/")
    .replace(/&#47;/gi, "/")
    .replace(/\\u002F/gi, "/")
    .replace(/\\u003A/gi, ":")
    .replace(/\\u0026/gi, "&")
    .replace(/\\\//g, "/")
    .replace(/\\u003d/gi, "=");
}

function inferQuality(url) {
  const match = url.match(/(?:^|[^0-9])(2160|1440|1080|720|576|540|480|360)p?(?:[^0-9]|$)/i);
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
