const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=UTF-8", "cache-control": "no-store", "access-control-allow-origin": "*" } });

const isPinterestUrl = (value) => {
  try { return ["pinterest.com", "www.pinterest.com", "pin.it"].includes(new URL(value).hostname.toLowerCase()); } catch { return false; }
};

const cleanUrl = (value) => {
  if (!value) return null;
  const cleaned = value.replace(/\\u002F/gi, "/").replace(/\\u003A/gi, ":").replace(/\\u003D/gi, "=").replace(/\\u0026/gi, "&").replace(/\\\//g, "/").replace(/&amp;/gi, "&").replace(/[\"'<>\s]+$/g, "");
  try {
    const u = new URL(cleaned);
    if (!/^https?:$/.test(u.protocol)) return null;
    if (["localhost", "127.0.0.1", "0.0.0.0"].includes(u.hostname) || u.hostname.endsWith(".local")) return null;
    return u.href;
  } catch { return null; }
};

const extractCandidates = (html) => {
  const found = new Set();
  const add = (value) => { const u = cleanUrl(value); if (u && /\.(mp4|m3u8)(?:[?#]|$)/i.test(u)) found.add(u); };
  const patterns = [
    /<meta[^>]+(?:property|name)=["'](?:og:video(?::url|:secure_url)?|twitter:player:stream)["'][^>]+content=["']([^"']+)["']/gi,
    /(?:video_url|videoUrl|progressive_url|progressiveUrl|playable_url|playableUrl|contentUrl|content_url|sourceUrl|source_url)["']?\s*[:=]\s*["']([^"']+)["']/gi,
    /["'](?:url|src)["']\s*:\s*["']([^"']+\.(?:mp4|m3u8)(?:[^"']*)?)["']/gi,
    /https?:\\?\/\\?\/[^"'\\\s<>]+\.(?:mp4|m3u8)(?:\?[^"'\\\s<>]*)?/gi
  ];
  for (const pattern of patterns) for (const match of html.matchAll(pattern)) add(match[1] || match[0]);
  return [...found].sort((a, b) => ((/720|1080|2160|4k/i.test(b) ? 3 : /480|540/i.test(b) ? 2 : 1) - (/720|1080|2160|4k/i.test(a) ? 3 : /480|540/i.test(a) ? 2 : 1))).slice(0, 8);
};

async function pinterestApi(request) {
  const input = new URL(request.url).searchParams.get("url");
  if (!input || !isPinterestUrl(input)) return json({ error: "Please enter a valid Pinterest URL." }, 400);
  try {
    const response = await fetch(input, { redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.9" } });
    if (!response.ok) return json({ error: `Pinterest returned HTTP ${response.status}.` }, 502);
    const videos = extractCandidates((await response.text()).slice(0, 8 * 1024 * 1024));
    if (!videos.length) return json({ error: "No downloadable public video source was found for this Pin." }, 404);
    return json({ success: true, sources: videos.map((url, index) => ({ url, quality: /1080/i.test(url) ? "1080p" : /720/i.test(url) ? "720p" : `Video ${index + 1}` })) });
  } catch { return json({ error: "Unable to fetch the Pinterest page right now." }, 502); }
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
