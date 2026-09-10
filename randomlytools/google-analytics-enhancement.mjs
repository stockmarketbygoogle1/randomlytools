import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');

const measurementId = 'G-8GT6V10ENG';
const analyticsTag = `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', '${measurementId}');\n</script>`;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) files.push(fullPath);
  }
  return files;
}

if (!fs.existsSync(dist)) {
  throw new Error(`Generated dist directory not found: ${dist}`);
}

const htmlFiles = walk(dist);
let updated = 0;

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');

  // Keep the enhancement idempotent so repeated builds never duplicate the tag.
  if (html.includes(`googletagmanager.com/gtag/js?id=${measurementId}`) || html.includes(`gtag('config', '${measurementId}')`)) {
    continue;
  }

  if (!/<\/head>/i.test(html)) {
    console.warn(`Google Analytics tag skipped (no </head>): ${path.relative(dist, file)}`);
    continue;
  }

  html = html.replace(/<\/head>/i, `${analyticsTag}\n</head>`);
  fs.writeFileSync(file, html, 'utf8');
  updated += 1;
}

console.log(`Google Analytics tag added to ${updated} HTML page(s). Measurement ID: ${measurementId}`);
