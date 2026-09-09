import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const homepage = path.join(dist, 'index.html');
const sourceFavicon = path.join(root, 'favicon.png');
const targetFavicon = path.join(dist, 'favicon.png');

if (!fs.existsSync(homepage)) {
  throw new Error(`Homepage not found: ${homepage}`);
}
if (!fs.existsSync(sourceFavicon)) {
  throw new Error(`Favicon source not found: ${sourceFavicon}`);
}

fs.copyFileSync(sourceFavicon, targetFavicon);

let html = fs.readFileSync(homepage, 'utf8');
const faviconLink = '<link rel="icon" type="image/png" href="/favicon.png">';

if (!html.includes('rel="icon"')) {
  html = html.replace('</head>', `  ${faviconLink}\n</head>`);
}

fs.writeFileSync(homepage, html);
console.log('Favicon copied to dist and homepage favicon link ensured.');
