const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=UTF-8", "cache-control": "no-store", "access-control-allow-origin": "*" } });

const isPinterestUrl = (value) => {
  try {
    const host = new URL(value).hostname.toLowerCase();
    return host === "pin.it" || host === "pinterest.com" || host.endsWith(".pinterest.com") || host.endsWith(".pinterest.ca") || host.endsWith(".pinterest.co.uk") || host.endsWith(".pinterest.jp") || host.endsWith(".pinterest.de") || host.endsWith(".pinterest.fr") || host.endsWith(".pinterest.es") || host.endsWith(".pinterest.it") || host.endsWith(".pinterest.com.au");
  } catch { return false; }
};

const cleanUrl = (value) => {
  if (!value) return null;
  let cleaned = String(value)
    .replace(/\\u002F/gi, "/")
    .replace(/\\u003A/gi, ":")
    .replace(/\\u003D/gi, "=")
    .replace(/\\u0026/gi, "&")
    .replace(/\\\//g, "/")
    .replace(/&amp;/gi, "&")
    .replace(/[\\"'<>\s]+$/g, "");
  try {
    const u = new URL(cleaned);
    if (!/^https?:$/.test(u.protocol)) return null;
    if (["localhost", "127.0.0.1", "0.0.0.0"].includes(u.hostname) || u.hostname.endsWith(".local")) return null;
    return u.href;
  } catch { return null; }
};

const extractCandidates = (html) => {
  const found = new Set();
  const add = (value) => {
    const u = cleanUrl(value);
    if (!u) return;
    const host = new URL(u).hostname.toLowerCase();
    if (!host.endsWith("pinimg.com")) return;
    if (/\.mp4(?:[?#]|$)/i.test(u)) found.add(u);
  };

  // Pinterest can serialize media URLs in several different escaped JSON forms.
  // First collect every pinimg MP4 URL, then also check URL-valued JSON fields.
  const patterns = [
    /https?:\\?\/\\?(?:v\d+\.)?pinimg\.com\/[^"'\\s<>\\]+?\.mp4(?:\?[^"'\\s<>\\]+)?/gi,
    /https?:\/\/(?:v\d+\.)?pinimg\.com\/[^"'\s<>]+?\.mp4(?:\?[^"'\s<>]*)?/gi,
    /["']url["']\s*:\s*["']([^"']+?\.mp4(?:\?[^"']*)?)["']/gi,
    /["']src["']\s*:\s*["']([^"']+?\.mp4(?:\?[^"']*)?)["']/gi
  ];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) add(match[1] || match[0]);
  }

  return [...found]
    .sort((a, b) => {
      const score = (u) => {
        if (/1080|2160|4k/i.test(u)) return 5;
        if (/720p|_720w|720/i.test(u)) return 4;
        if (/540|576/i.test(u)) return 3;
        if (/480/i.test(u)) return 2;
        return 1;
      };
      return score(b) - score(a);
    })
    .slice(0, 8);
};

async function pinterestApi(request) {
  const input = new URL(request.url).searchParams.get("url");
  if (!input || !isPinterestUrl(input)) return json({ error: "Please enter a valid Pinterest URL." }, 400);

  try {
    const response = await fetch(input, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.pinterest.com/"
      }
    });

    if (!response.ok) return json({ error: `Pinterest returned HTTP ${response.status}.` }, 502);

    const html = await response.text();
    const videos = extractCandidates(html.slice(0, 20 * 1024 * 1024));

    if (!videos.length) return json({ error: "No downloadable public video source was found for this Pin." }, 404);

    return json({
      success: true,
      sources: videos.map((url, index) => ({
        url,
        quality: /1080/i.test(url) ? "1080p" : /720/i.test(url) ? "720p" : `Video ${index + 1}`
      }))
    });
  } catch {
    return json({ error: "Unable to fetch the Pinterest page right now." }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/pinterest-video") {
      if (request.method === "OPTIONS") return new Response(null, { headers: { "access-control-allow-origin": "*", "access-control-allow-methods": "GET, OPTIONS", "access-control-allow-headers": "Content-Type" } });
      if (request.method !== "GET") return json({ error: "Method not allowed." }, 405);
      return pinterestApi(request);
    }
    return env.ASSETS.fetch(request);
  }
};
