import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const homepage = path.join(root, 'dist', 'index.html');

if (!fs.existsSync(homepage)) throw new Error(`Homepage not found: ${homepage}`);
let html = fs.readFileSync(homepage, 'utf8');

const css = `
<style id="randomlytools-homepage-articles-center">
/* The article strip must occupy the full homepage content row, not the tool/sidebar column. */
.rt-latest-articles{
  width:100% !important;
  max-width:none !important;
  grid-column:1 / -1 !important;
  flex:0 0 100% !important;
  align-self:stretch !important;
  justify-self:stretch !important;
  box-sizing:border-box !important;
  text-align:center !important;
  margin-left:auto !important;
  margin-right:auto !important;
}

.rt-latest-articles .rt-section-heading{
  display:flex !important;
  flex-direction:column !important;
  align-items:center !important;
  justify-content:center !important;
  text-align:center !important;
  width:100% !important;
  max-width:900px !important;
  margin:0 auto 2rem !important;
  padding:0 !important;
  gap:.7rem !important;
}

.rt-latest-articles .rt-section-heading>div{
  display:flex !important;
  flex-direction:column !important;
  align-items:center !important;
  justify-content:center !important;
  text-align:center !important;
  width:100% !important;
  max-width:100% !important;
  margin:0 auto !important;
  padding:0 !important;
}

.rt-latest-articles .rt-section-heading .rt-kicker{
  display:block !important;
  width:100% !important;
  text-align:center !important;
  margin:0 auto !important;
}

.rt-latest-articles .rt-section-heading h2{
  display:block !important;
  width:100% !important;
  text-align:center !important;
  margin:.15rem auto .45rem !important;
  padding:0 !important;
}

.rt-latest-articles .rt-section-heading p{
  display:block !important;
  width:100% !important;
  max-width:760px !important;
  text-align:center !important;
  margin:0 auto !important;
  padding:0 !important;
}

.rt-latest-articles .rt-section-heading .rt-view-all{
  display:inline-flex !important;
  align-self:center !important;
  text-align:center !important;
  margin:.4rem auto 0 !important;
}

.rt-latest-articles .rt-article-grid{
  width:100% !important;
  max-width:none !important;
  margin-left:auto !important;
  margin-right:auto !important;
}

@media (max-width:700px){
  .rt-latest-articles .rt-section-heading{
    max-width:100% !important;
    margin-bottom:1.5rem !important;
    padding-inline:1rem !important;
  }
}
</style>`;

const marker = 'id="randomlytools-homepage-articles-center"';
if (html.includes(marker)) {
  html = html.replace(/<style id="randomlytools-homepage-articles-center">[\s\S]*?<\/style>/, css.trim());
} else {
  html = html.replace('</head>', `${css}\n</head>`);
}

fs.writeFileSync(homepage, html);
console.log('Latest Articles full-width and exact-center alignment applied.');
