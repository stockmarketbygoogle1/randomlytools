import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const homepage = path.join(root, 'dist', 'index.html');

if (!fs.existsSync(homepage)) throw new Error(`Homepage not found: ${homepage}`);
let html = fs.readFileSync(homepage, 'utf8');

const css = `
<style id="randomlytools-homepage-articles-center">
/* Center the complete Latest Articles heading content without changing article cards. */
.rt-latest-articles .rt-section-heading{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:.55rem}
.rt-latest-articles .rt-section-heading>div{display:flex;flex-direction:column;align-items:center;text-align:center;width:100%}
.rt-latest-articles .rt-section-heading p{margin:0 auto;max-width:720px}
.rt-latest-articles .rt-section-heading .rt-view-all{margin:0 auto}
</style>`;

if (!html.includes('id="randomlytools-homepage-articles-center"')) {
  html = html.replace('</head>', `${css}\n</head>`);
}

fs.writeFileSync(homepage, html);
console.log('Latest Articles heading content centered on homepage.');
