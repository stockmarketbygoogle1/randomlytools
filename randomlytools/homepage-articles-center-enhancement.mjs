import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const homepage = path.join(root, 'dist', 'index.html');

if (!fs.existsSync(homepage)) throw new Error(`Homepage not found: ${homepage}`);
let html = fs.readFileSync(homepage, 'utf8');

/*
 * The Latest Articles strip was being rendered inside the main tool/sidebar
 * layout, which limits it to the left content column. Move the complete strip
 * outside that two-column layout and give it the same centered page container
 * width as the rest of the homepage.
 */
const articlePattern = /<section class="rt-latest-articles"[\s\S]*?<\/section>/i;
const articleMatch = html.match(articlePattern);

if (articleMatch) {
  const articleSection = articleMatch[0];
  const outer = `<div class="rt-home-fullwidth-articles">\n${articleSection}\n</div>`;

  /* Remove the existing in-column copy before reinserting it. */
  html = html.replace(articlePattern, '');

  /* Avoid creating a duplicate if a previous build already moved it. */
  if (!html.includes('class="rt-home-fullwidth-articles"')) {
    const mainClose = /<\/main>/i;
    if (!mainClose.test(html)) throw new Error('Homepage main closing marker not found for full-width article relocation.');
    html = html.replace(mainClose, `</main>\n${outer}`);
  }
} else if (!html.includes('class="rt-home-fullwidth-articles"')) {
  throw new Error('Latest Articles section not found on homepage.');
}

const css = `
<style id="randomlytools-homepage-articles-center">
/* Full-width article area: no longer constrained by the tools/sidebar grid. */
.rt-home-fullwidth-articles{
  width:min(1120px, calc(100% - 2rem)) !important;
  max-width:1120px !important;
  margin:0 auto !important;
  padding:0 !important;
  box-sizing:border-box !important;
}

.rt-home-fullwidth-articles .rt-latest-articles{
  width:100% !important;
  max-width:none !important;
  margin:1.5rem 0 2rem !important;
  padding-top:1rem !important;
  box-sizing:border-box !important;
  text-align:center !important;
}

.rt-home-fullwidth-articles .rt-latest-articles .rt-section-heading{
  display:flex !important;
  flex-direction:column !important;
  align-items:center !important;
  justify-content:center !important;
  width:100% !important;
  max-width:920px !important;
  margin:0 auto 2rem !important;
  padding:0 !important;
  gap:.7rem !important;
  text-align:center !important;
}

.rt-home-fullwidth-articles .rt-section-heading>div{
  display:flex !important;
  flex-direction:column !important;
  align-items:center !important;
  justify-content:center !important;
  width:100% !important;
  max-width:100% !important;
  margin:0 auto !important;
  padding:0 !important;
  text-align:center !important;
}

.rt-home-fullwidth-articles .rt-section-heading .rt-kicker,
.rt-home-fullwidth-articles .rt-section-heading h2,
.rt-home-fullwidth-articles .rt-section-heading p{
  display:block !important;
  width:100% !important;
  margin-left:auto !important;
  margin-right:auto !important;
  text-align:center !important;
}

.rt-home-fullwidth-articles .rt-section-heading h2{
  margin-top:.15rem !important;
  margin-bottom:.45rem !important;
}

.rt-home-fullwidth-articles .rt-section-heading p{
  max-width:760px !important;
  margin-top:0 !important;
  margin-bottom:0 !important;
}

.rt-home-fullwidth-articles .rt-section-heading .rt-view-all{
  display:inline-flex !important;
  align-self:center !important;
  margin:.4rem auto 0 !important;
  text-align:center !important;
}

.rt-home-fullwidth-articles .rt-article-grid{
  width:100% !important;
  max-width:none !important;
  margin:0 !important;
  display:grid !important;
  grid-template-columns:repeat(3,minmax(0,1fr)) !important;
  gap:1rem !important;
}

@media (max-width:899px){
  .rt-home-fullwidth-articles{
    width:calc(100% - 2rem) !important;
    max-width:none !important;
  }
  .rt-home-fullwidth-articles .rt-article-grid{
    grid-template-columns:1fr !important;
  }
}

@media (min-width:900px) and (max-width:1100px){
  .rt-home-fullwidth-articles .rt-article-grid{
    grid-template-columns:repeat(2,minmax(0,1fr)) !important;
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
console.log('Latest Articles moved outside the sidebar grid and centered in the full homepage container.');
