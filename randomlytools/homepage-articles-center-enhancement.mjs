import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const homepage = path.join(root, 'dist', 'index.html');

if (!fs.existsSync(homepage)) throw new Error(`Homepage not found: ${homepage}`);
let html = fs.readFileSync(homepage, 'utf8');

const css = `
<style id="randomlytools-homepage-articles-center">
/* Strongly center the complete Latest Articles intro block. */
.rt-latest-articles{text-align:center}
.rt-latest-articles .rt-section-heading{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;width:100%;max-width:920px;margin:0 auto 1.8rem;gap:.65rem}
.rt-latest-articles .rt-section-heading>div{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;width:100%;margin:0 auto}
.rt-latest-articles .rt-section-heading .rt-kicker{display:block;text-align:center;margin:0 auto}
.rt-latest-articles .rt-section-heading h2{text-align:center;margin:.15rem auto .45rem}
.rt-latest-articles .rt-section-heading p{display:block;text-align:center;margin:0 auto;max-width:760px}
.rt-latest-articles .rt-section-heading .rt-view-all{display:inline-flex;text-align:center;margin:.35rem auto 0}
</style>`;

const marker = 'id="randomlytools-homepage-articles-center"';
if (html.includes(marker)) {
  html = html.replace(/<style id="randomlytools-homepage-articles-center">[\s\S]*?<\/style>/, css.trim());
} else {
  html = html.replace('</head>', `${css}\n</head>`);
}

fs.writeFileSync(homepage, html);
console.log('Latest Articles intro block strongly centered on homepage.');
