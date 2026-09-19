import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const homepage = path.join(root, 'dist', 'index.html');

if (!fs.existsSync(homepage)) throw new Error(`Homepage not found: ${homepage}`);
let html = fs.readFileSync(homepage, 'utf8');

const homepageCards = `
<div class="tool-card" data-category="cricket" data-keywords="cricket qualification calculator playoff qualification scenarios points table simulator IPL cricket playoff qualification NRR qualify">
  <div class="tool-card-icon">🏏</div>
  <h2 class="tool-card-title"><a href="/cricket-qualification-calculator/">Cricket Qualification Calculator</a></h2>
  <p class="tool-card-desc">Explore cricket playoff qualification scenarios using points, remaining fixtures, rival results and tie-break situations.</p>
  <span class="tool-card-badge">Cricket Tools</span>
</div>
<div class="tool-card" data-category="cricket" data-keywords="cricket NRR calculator net run rate calculator IPL NRR tournament NRR run rate">
  <div class="tool-card-icon">📈</div>
  <h2 class="tool-card-title"><a href="/cricket-nrr-calculator/">Cricket NRR Calculator</a></h2>
  <p class="tool-card-desc">Calculate Net Run Rate from runs scored, runs conceded and cricket overs with correct ball notation.</p>
  <span class="tool-card-badge">Cricket Tools</span>
</div>
<div class="tool-card" data-category="cricket" data-keywords="cricket required run rate calculator RRR calculator cricket chase required rate runs per over runs per ball">
  <div class="tool-card-icon">🎯</div>
  <h2 class="tool-card-title"><a href="/cricket-required-run-rate-calculator/">Cricket Required Run Rate Calculator</a></h2>
  <p class="tool-card-desc">Find the required run rate, runs per ball and balls remaining for a cricket chase.</p>
  <span class="tool-card-badge">Cricket Tools</span>
</div>
<div class="tool-card" data-category="cricket" data-keywords="cricket chase calculator target calculator runs required cricket target score RRR chase IPL T20 ODI">
  <div class="tool-card-icon">🏆</div>
  <h2 class="tool-card-title"><a href="/cricket-chase-calculator/">Cricket Chase Calculator</a></h2>
  <p class="tool-card-desc">Calculate runs required, required run rate and scoring-rate scenarios for a cricket chase.</p>
  <span class="tool-card-badge">Cricket Tools</span>
</div>
<div class="tool-card" data-category="websites" data-keywords="website mockup generator url to mockup website mockup maker link mockup generator website screenshot mockup">
  <div class="tool-card-icon">🖥️</div>
  <h2 class="tool-card-title"><a href="/website-mockup-generator/">Website Mockup Generator</a></h2>
  <p class="tool-card-desc">Turn a website URL or screenshot into a professional multi-device mockup for presentations, portfolios and product showcases.</p>
  <span class="tool-card-badge">Website &amp; Creator Tools</span>
</div>
<div class="tool-card" data-category="home-diy" data-keywords="fence post depth calculator fence post depth post hole depth calculator how deep should a fence post be fence installation concrete home improvement DIY">
  <div class="tool-card-icon">📏</div>
  <h2 class="tool-card-title"><a href="/fence-post-depth-calculator/">Fence Post Depth Calculator</a></h2>
  <p class="tool-card-desc">Estimate fence post burial depth, hole depth, post length, hole diameter and concrete for common fence projects.</p>
  <span class="tool-card-badge">Home &amp; DIY</span>
</div>
<div class="tool-card" data-category="internet" data-keywords="internet speed test speed test internet services broadband speed test wifi speed test broadband checker fibre broadband checker check internet speed test my internet speed internet test check my internet speed wifi speed broadband speed in my area wifi test check broadband speed network speed test wifi checker internet speed test free internet connection test download speed test upload speed test mbps test bandwidth test check wifi signal strength internet speed test online test my broadband speed check internet speed in my area 5g speed test fiber speed test">
  <div class="tool-card-icon">🌐</div>
  <h2 class="tool-card-title"><a href="/internet-speed-test/">Internet Speed Test</a></h2>
  <p class="tool-card-desc">Check download speed, upload speed and latency with a free browser-based internet speed test.</p>
  <span class="tool-card-badge">Internet &amp; Network</span>
</div>;

if (!html.includes('href="/fence-post-depth-calculator/"')) {
  const gridEndMarker = /(<div id="tools-grid-wrapper" class="tools-grid">[\s\S]*?)(<\/div>\s*<div id="no-tools-found")/i;
  if (!gridEndMarker.test(html)) throw new Error('Homepage tools grid end marker not found.');
  html = html.replace(gridEndMarker, `$1${homepageCards}\n$2`);
}
html = html.replace(/All Tools \(22\)/g, 'All Tools (30)');
html = html.replace(/All Tools \(23\)/g, 'All Tools (30)');
html = html.replace(/All Tools \(27\)/g, 'All Tools (30)');
html = html.replace(/All Tools \(28\)/g, 'All Tools (30)');

if (!html.includes('data-category="cricket">Cricket Tools</button>')) {
  const youtubeButton = /(<button[^>]+class="preset-chip category-filter-btn"[^>]+data-category="youtube"[^>]*>YouTube Tools<\/button>)/i;
  if (youtubeButton.test(html)) html = html.replace(youtubeButton, '$1<button type="button" class="preset-chip category-filter-btn" data-category="cricket">Cricket Tools</button>');
}
if (!html.includes('data-category="websites">Website &amp; Creator</button>')) {
  const cricketButton = /(<button[^>]+class="preset-chip category-filter-btn"[^>]+data-category="cricket"[^>]*>Cricket Tools<\/button>)/i;
  if (cricketButton.test(html)) html = html.replace(cricketButton, '$1<button type="button" class="preset-chip category-filter-btn" data-category="websites">Website &amp; Creator</button>');
}
if (!html.includes('data-category="home-diy">Home &amp; DIY</button>')) {
  const websiteButton = /(<button[^>]+class="preset-chip category-filter-btn"[^>]+data-category="websites"[^>]*>Website &amp; Creator<\/button>)/i;
  if (websiteButton.test(html)) html = html.replace(websiteButton, '$1<button type="button" class="preset-chip category-filter-btn" data-category="home-diy">Home &amp; DIY</button>');
}

const jsonTools = [
  ['24', 'Cricket Qualification Calculator', 'https://randomlytools.in/cricket-qualification-calculator/'],
  ['25', 'Cricket NRR Calculator', 'https://randomlytools.in/cricket-nrr-calculator/'],
  ['26', 'Cricket Required Run Rate Calculator', 'https://randomlytools.in/cricket-required-run-rate-calculator/'],
  ['27', 'Cricket Chase Calculator', 'https://randomlytools.in/cricket-chase-calculator/'],
  ['28', 'Website Mockup Generator', 'https://randomlytools.in/website-mockup-generator/'],
  ['29', 'Fence Post Depth Calculator', 'https://randomlytools.in/fence-post-depth-calculator/'],
  ['30', 'Internet Speed Test', 'https://randomlytools.in/internet-speed-test/']
];
for (const [position, name, url] of jsonTools) {
  if (!html.includes(`"url":"${url}"`)) {
    const item = `,{"@type":"ListItem","position":${position},"name":"${name}","url":"${url}"}`;
    const marker = /("url":"https:\/\/randomlytools\.in\/youtube-shorts-earnings-calculator\/"})/;
    if (!marker.test(html)) throw new Error('Homepage JSON-LD insertion marker not found.');
    html = html.replace(marker, `$1${item}`);
  }
}

/*
 * Blog-inspired homepage presentation for RandomlyTools.
 * This is intentionally additive: existing tool markup, links and functionality
 * remain in place. The new layout only adds navigation, discovery and article
 * presentation around the existing directory.
 */
const topBar = `
<div class="rt-topbar">
  <div class="container rt-topbar-inner">
    <span>RandomlyTools — Free Online Tools &amp; Useful Calculators</span>
    <nav aria-label="Utility navigation">
      <a href="/about/">About Us</a>
      <a href="/contact/">Contact</a>
      <a href="/privacy-policy/">Privacy</a>
      <a href="/terms/">Terms</a>
      <a href="/sitemap.xml">Sitemap</a>
    </nav>
  </div>
</div>`;

if (!html.includes('class="rt-topbar"')) {
  html = html.replace('<header class="site-header">', `${topBar}\n<header class="site-header">`);
}

const whatsNew = `
<section class="rt-whats-new" aria-labelledby="rt-whats-new-title">
  <div class="rt-section-heading">
    <div>
      <span class="rt-kicker">WHAT'S NEW</span>
      <h2 id="rt-whats-new-title">Recently Added Tools</h2>
      <p>Explore some of the latest RandomlyTools additions for cricket, websites and home projects.</p>
    </div>
    <a class="rt-view-all" href="/#tools-grid-wrapper">View all tools →</a>
  </div>
  <div class="rt-feature-grid">
    <a class="rt-feature-card" href="/cricket-qualification-calculator/"><span class="rt-feature-icon">🏏</span><strong>Cricket Qualification Calculator</strong><span>Explore playoff qualification scenarios.</span></a>
    <a class="rt-feature-card" href="/website-mockup-generator/"><span class="rt-feature-icon">🖥️</span><strong>Website Mockup Generator</strong><span>Create multi-device website presentations.</span></a>
    <a class="rt-feature-card" href="/fence-post-depth-calculator/"><span class="rt-feature-icon">📏</span><strong>Fence Post Depth Calculator</strong><span>Estimate post depth and related measurements.</span></a>
  </div>
</section>`;

if (!html.includes('class="rt-whats-new"')) {
  const adMarker = /<div class="ad-slot-container">/i;
  if (!adMarker.test(html)) throw new Error('Homepage ad marker not found for new-tools section.');
  html = html.replace(adMarker, `${whatsNew}\n<div class="ad-slot-container">`);
}

const sidebar = `
<aside class="rt-home-sidebar" aria-label="RandomlyTools sidebar">
  <div class="rt-sidebar-widget">
    <h2>Popular Tools</h2>
    <ul class="rt-link-list">
      <li><a href="/random-name-generator/">Random Name Generator</a></li>
      <li><a href="/random-number-picker/">Random Number Picker</a></li>
      <li><a href="/random-instagram-username-generator/">Instagram Username Generator</a></li>
      <li><a href="/random-company-brand-name-generator/">Company &amp; Brand Name Generator</a></li>
      <li><a href="/youtube-money-calculator/">YouTube Money Calculator</a></li>
    </ul>
  </div>
  <div class="rt-sidebar-widget">
    <h2>Tool Categories</h2>
    <ul class="rt-link-list rt-category-list">
      <li><a href="/?category=names">Names &amp; People</a></li>
      <li><a href="/?category=numbers">Numbers &amp; Math</a></li>
      <li><a href="/?category=social">Gaming &amp; Social</a></li>
      <li><a href="/?category=business">Business &amp; Food</a></li>
      <li><a href="/?category=youtube">YouTube Tools</a></li>
      <li><a href="/?category=cricket">Cricket Tools</a></li>
    </ul>
  </div>
  <div class="rt-sidebar-widget">
    <h2>Latest Articles</h2>
    <ul class="rt-link-list">
      <li><a href="/articles/how-to-calculate-attendance-percentage/">How to Calculate Attendance Percentage</a></li>
      <li><a href="/articles/how-to-randomly-split-people-into-teams/">How to Randomly Split People Into Teams</a></li>
      <li><a href="/articles/creative-ways-to-use-a-random-country-generator/">Creative Ways to Use a Random Country Generator</a></li>
      <li><a href="/articles/how-to-use-a-random-number-picker/">How to Use a Random Number Picker</a></li>
      <li><a href="/articles/instagram-username-ideas/">Instagram Username Ideas</a></li>
    </ul>
    <a class="rt-widget-more" href="/articles/">View all articles →</a>
  </div>
  <div class="rt-sidebar-widget">
    <h2>Useful Links</h2>
    <ul class="rt-link-list">
      <li><a href="/articles/">Guides &amp; Articles</a></li>
      <li><a href="/about/">About RandomlyTools</a></li>
      <li><a href="/contact/">Contact Us</a></li>
    </ul>
  </div>
</aside>`;

if (!html.includes('class="rt-home-sidebar"')) {
  const toolsSection = /(<section aria-label="Tools Directory">[\s\S]*?<\/section>)/i;
  if (!toolsSection.test(html)) throw new Error('Tools directory section not found for sidebar insertion.');
  html = html.replace(toolsSection, `$1\n${sidebar}`);
}

const articleStrip = `
<section class="rt-latest-articles" aria-labelledby="rt-latest-articles-title">
  <div class="rt-section-heading">
    <div>
      <span class="rt-kicker">FROM THE GUIDES</span>
      <h2 id="rt-latest-articles-title">Latest Articles</h2>
      <p>Practical guides that explain how to use RandomlyTools and make better everyday choices.</p>
    </div>
    <a class="rt-view-all" href="/articles/">View all articles →</a>
  </div>
  <div class="rt-article-grid">
    <article class="rt-article-card"><span class="rt-article-icon">🎓</span><div><span class="rt-article-label">Student Guide</span><h3><a href="/articles/how-to-calculate-attendance-percentage/">How to Calculate Attendance Percentage</a></h3><p>Understand the attendance formula and see practical 75% attendance examples.</p></div></article>
    <article class="rt-article-card"><span class="rt-article-icon">👥</span><div><span class="rt-article-label">Groups &amp; Teams</span><h3><a href="/articles/how-to-randomly-split-people-into-teams/">How to Randomly Split People Into Teams</a></h3><p>Learn practical ways to create fair random teams for activities and events.</p></div></article>
    <article class="rt-article-card"><span class="rt-article-icon">🌍</span><div><span class="rt-article-label">Geography Guide</span><h3><a href="/articles/creative-ways-to-use-a-random-country-generator/">Creative Ways to Use a Random Country Generator</a></h3><p>Discover geography games, quizzes, writing prompts and classroom ideas.</p></div></article>
    <article class="rt-article-card"><span class="rt-article-icon">🎲</span><div><span class="rt-article-label">Numbers Guide</span><h3><a href="/articles/how-to-use-a-random-number-picker/">How to Use a Random Number Picker</a></h3><p>Learn about ranges, no-repeat selection and practical number-picking use cases.</p></div></article>
    <article class="rt-article-card"><span class="rt-article-icon">📸</span><div><span class="rt-article-label">Social Guide</span><h3><a href="/articles/instagram-username-ideas/">Instagram Username Ideas</a></h3><p>Explore simple formulas for cool, aesthetic and memorable username ideas.</p></div></article>
    <article class="rt-article-card"><span class="rt-article-icon">🏢</span><div><span class="rt-article-label">Business Guide</span><h3><a href="/articles/how-to-choose-a-business-name/">How to Choose a Business Name</a></h3><p>Practical naming considerations for startups, shops, agencies and brands.</p></div></article>
  </div>
</section>`;

if (!html.includes('class="rt-latest-articles"')) {
  const articleInsertionMarkers = [
    /<h2>What You Can Do With RandomlyTools<\/h2>/i,
    /<h2[^>]*>What You Can Do With RandomlyTools<\/h2>/i,
    /<section[^>]*>\s*<h2>What You Can Do With RandomlyTools<\/h2>/i
  ];
  const marker = articleInsertionMarkers.find((candidate) => candidate.test(html));
  if (marker) {
    html = html.replace(marker, `${articleStrip}\n$&`);
  } else {
    const mainEndMarker = /<\/main>/i;
    if (!mainEndMarker.test(html)) throw new Error('Homepage main closing marker not found for article section.');
    html = html.replace(mainEndMarker, `${articleStrip}\n</main>`);
  }
}

const themeCss = `
<style id="randomlytools-home-theme">
.rt-topbar{background:#0f172a;color:#cbd5e1;font-size:.78rem;border-bottom:1px solid #1e293b}
.rt-topbar-inner{min-height:34px;display:flex;align-items:center;justify-content:space-between;gap:1rem}
.rt-topbar nav{display:flex;align-items:center;gap:.85rem;flex-wrap:wrap}
.rt-topbar a{color:#e2e8f0;text-decoration:none}.rt-topbar a:hover{color:#fff}
.rt-whats-new,.rt-latest-articles{margin:1.5rem 0 2rem}
.rt-section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:1rem;margin-bottom:1rem}
.rt-section-heading h2{margin:.2rem 0 .3rem;font-size:1.55rem}.rt-section-heading p{margin:0;color:var(--text-muted);font-size:.92rem;max-width:720px}
.rt-kicker{font-size:.7rem;font-weight:800;letter-spacing:.08em;color:var(--primary-text)}
.rt-view-all,.rt-widget-more{font-size:.86rem;font-weight:700;white-space:nowrap}
.rt-feature-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
.rt-feature-card{display:flex;flex-direction:column;gap:.35rem;padding:1.1rem;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:var(--radius-md);box-shadow:var(--shadow-sm);color:var(--text-primary);text-decoration:none;transition:transform .15s ease,box-shadow .15s ease}
.rt-feature-card:hover{transform:translateY(-2px);box-shadow:var(--shadow-md);color:var(--text-primary)}
.rt-feature-icon{font-size:1.5rem}.rt-feature-card strong{font-size:1rem}.rt-feature-card span:last-child{font-size:.84rem;color:var(--text-muted)}
.rt-home-sidebar{align-self:start;display:flex;flex-direction:column;gap:1rem}
.rt-sidebar-widget{background:var(--bg-surface);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1.15rem;box-shadow:var(--shadow-sm)}
.rt-sidebar-widget h2{font-size:1.05rem;margin:0 0 .75rem;padding-bottom:.65rem;border-bottom:1px solid var(--border-color)}
.rt-link-list{list-style:none;display:flex;flex-direction:column;gap:.55rem;margin:0;padding:0}.rt-link-list a{font-size:.88rem;color:var(--text-secondary)}.rt-link-list a:hover{color:var(--primary)}
.rt-widget-more{display:inline-block;margin-top:.8rem}.rt-category-list a{display:block;padding:.25rem 0}
.rt-latest-articles{padding-top:1rem;border-top:1px solid var(--border-color)}
.rt-article-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
.rt-article-card{display:flex;gap:.8rem;padding:1rem;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:var(--radius-md);box-shadow:var(--shadow-sm)}
.rt-article-card h3{font-size:1rem;margin:.2rem 0 .35rem}.rt-article-card h3 a{color:var(--text-primary)}.rt-article-card p{font-size:.82rem;color:var(--text-muted);margin:0}.rt-article-icon{font-size:1.35rem;line-height:1}.rt-article-label{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--primary-text)}
@media (min-width:900px){main.page-intro{display:grid;grid-template-columns:minmax(0,1fr) 300px;column-gap:1.5rem;align-items:start}main.page-intro>.tool-header,main.page-intro>div[style*="max-width:720px"],main.page-intro>.rt-whats-new,main.page-intro>.ad-slot-container,main.page-intro>.rt-latest-articles,main.page-intro>h2,main.page-intro>p,main.page-intro>ul,main.page-intro>section:not([aria-label="Tools Directory"]),main.page-intro>div:not(.rt-home-sidebar):not(.rt-whats-new):not(.ad-slot-container){grid-column:1/-1}main.page-intro>section[aria-label="Tools Directory"]{grid-column:1}main.page-intro>.rt-home-sidebar{grid-column:2;grid-row:span 1}}
@media (max-width:899px){.rt-topbar-inner{padding-top:.35rem;padding-bottom:.35rem;align-items:flex-start}.rt-topbar-inner>span{display:none}.rt-feature-grid,.rt-article-grid{grid-template-columns:1fr}.rt-section-heading{align-items:flex-start;flex-direction:column}.rt-view-all{white-space:normal}main.page-intro{display:block}.rt-home-sidebar{margin:0 0 2rem}}
@media (min-width:900px) and (max-width:1100px){.rt-home-sidebar{width:100%}.rt-article-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
</style>`;

if (!html.includes('id="randomlytools-home-theme"')) {
  html = html.replace('</head>', `${themeCss}\n</head>`);
}

fs.writeFileSync(homepage, html);
console.log('Homepage tool cards, filters, JSON-LD and blog-inspired discovery layout updated.');
