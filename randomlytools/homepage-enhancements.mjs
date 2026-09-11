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
  <span class="tool-card-badge">Website & Creator Tools</span>
</div>
<div class="tool-card" data-category="calculators" data-keywords="fence post depth calculator fence post depth post hole depth calculator how deep should a fence post be fence installation concrete">
  <div class="tool-card-icon">📏</div>
  <h2 class="tool-card-title"><a href="/fence-post-depth-calculator/">Fence Post Depth Calculator</a></h2>
  <p class="tool-card-desc">Estimate fence post burial depth, hole depth, post length, hole diameter and concrete for common fence projects.</p>
  <span class="tool-card-badge">Calculators</span>
</div>`;

if (!html.includes('href="/fence-post-depth-calculator/"')) {
  const gridEndMarker = /(<div id="tools-grid-wrapper" class="tools-grid">[\s\S]*?)(<\/div>\s*<div id="no-tools-found")/i;
  if (!gridEndMarker.test(html)) throw new Error('Homepage tools grid end marker not found.');
  html = html.replace(gridEndMarker, `$1${homepageCards}\n$2`);
}
html = html.replace(/All Tools \(22\)/, 'All Tools (28)');
html = html.replace(/All Tools \(27\)/, 'All Tools (28)');

if (!html.includes('data-category="cricket">Cricket Tools</button>')) {
  const youtubeButton = /(<button[^>]+class="preset-chip category-filter-btn"[^>]+data-category="youtube"[^>]*>YouTube Tools<\/button>)/i;
  if (youtubeButton.test(html)) html = html.replace(youtubeButton, '$1<button type="button" class="preset-chip category-filter-btn" data-category="cricket">Cricket Tools</button>');
}
if (!html.includes('data-category="websites">Website & Creator</button>')) {
  const cricketButton = /(<button[^>]+class="preset-chip category-filter-btn"[^>]+data-category="cricket"[^>]*>Cricket Tools<\/button>)/i;
  if (cricketButton.test(html)) html = html.replace(cricketButton, '$1<button type="button" class="preset-chip category-filter-btn" data-category="websites">Website & Creator</button>');
}

const jsonTools = [
  ['23', 'Cricket Qualification Calculator', 'https://randomlytools.in/cricket-qualification-calculator/'],
  ['24', 'Cricket NRR Calculator', 'https://randomlytools.in/cricket-nrr-calculator/'],
  ['25', 'Cricket Required Run Rate Calculator', 'https://randomlytools.in/cricket-required-run-rate-calculator/'],
  ['26', 'Cricket Chase Calculator', 'https://randomlytools.in/cricket-chase-calculator/'],
  ['27', 'Website Mockup Generator', 'https://randomlytools.in/website-mockup-generator/'],
  ['28', 'Fence Post Depth Calculator', 'https://randomlytools.in/fence-post-depth-calculator/']
];
for (const [position, name, url] of jsonTools) {
  if (!html.includes(`"url":"${url}"`)) {
    const item = `,{"@type":"ListItem","position":${position},"name":"${name}","url":"${url}"}`;
    const marker = /("url":"https:\/\/randomlytools\.in\/youtube-shorts-earnings-calculator\/"})/;
    if (!marker.test(html)) throw new Error('Homepage JSON-LD insertion marker not found.');
    html = html.replace(marker, `$1${item}`);
  }
}

fs.writeFileSync(homepage, html);
console.log('Homepage tool cards, filters and JSON-LD updated.');
