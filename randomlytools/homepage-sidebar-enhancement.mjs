import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const homepage = path.join(root, 'dist', 'index.html');

if (!fs.existsSync(homepage)) throw new Error(`Homepage not found: ${homepage}`);
let html = fs.readFileSync(homepage, 'utf8');

/*
 * Additive sidebar enhancement.
 * Fills the long empty area below Useful Links with compact, useful discovery
 * sections. Existing sidebar widgets, tools and functionality remain intact.
 */
if (!html.includes('class="rt-home-sidebar"') || html.includes('id="rt-sidebar-quick-tools"')) {
  process.exit(0);
}

const extraSidebar = `
  <div class="rt-sidebar-widget rt-sidebar-highlight">
    <span class="rt-sidebar-kicker">QUICK FIND</span>
    <h2>What do you need?</h2>
    <div class="rt-sidebar-actions">
      <a href="/?category=names">A name or username →</a>
      <a href="/?category=numbers">A number or calculation →</a>
      <a href="/?category=youtube">A YouTube estimate →</a>
      <a href="/?category=cricket">A cricket calculation →</a>
    </div>
  </div>

  <div class="rt-sidebar-widget" id="rt-sidebar-quick-tools">
    <span class="rt-sidebar-kicker">QUICK TOOLS</span>
    <h2>Try These Tools</h2>
    <ul class="rt-link-list rt-compact-tools">
      <li><a href="/random-country-generator/">🌍 Random Country Generator</a></li>
      <li><a href="/random-team-generator/">👥 Random Team Generator</a></li>
      <li><a href="/random-dice-roller/">🎲 Random Dice Roller</a></li>
      <li><a href="/random-letter-generator/">🔤 Random Letter Generator</a></li>
      <li><a href="/random-number-picker/">🔢 Random Number Picker</a></li>
    </ul>
  </div>

  <div class="rt-sidebar-widget rt-sidebar-about">
    <span class="rt-sidebar-kicker">ABOUT</span>
    <h2>About RandomlyTools</h2>
    <p>RandomlyTools brings together focused random generators, calculators and practical online utilities for everyday tasks.</p>
    <a class="rt-widget-more" href="/about/">Learn more about RandomlyTools →</a>
  </div>`;

const closeAside = /(<aside class="rt-home-sidebar"[\s\S]*?)(<\/aside>)/i;
if (!closeAside.test(html)) throw new Error('Homepage sidebar closing marker not found.');
html = html.replace(closeAside, `$1${extraSidebar}\n$2`);

const css = `
<style id="rt-homepage-sidebar-enhancement-css">
.rt-sidebar-kicker{display:block;margin-bottom:5px;font-size:10px;font-weight:800;letter-spacing:.12em;color:#64748b}.rt-sidebar-widget h2{margin:0 0 10px}.rt-sidebar-highlight{background:#f8fafc}.rt-sidebar-highlight h2{font-size:19px}.rt-sidebar-actions{display:grid;gap:8px}.rt-sidebar-actions a{display:block;padding:9px 10px;border:1px solid #e2e8f0;border-radius:10px;background:#fff;color:inherit;text-decoration:none;font-size:13px;line-height:1.35}.rt-sidebar-actions a:hover{border-color:#94a3b8}.rt-compact-tools{margin:0}.rt-compact-tools li{padding:7px 0}.rt-compact-tools a{font-size:13px}.rt-sidebar-about p{margin:0 0 10px;color:#64748b;font-size:13px;line-height:1.6}.rt-widget-more{font-size:13px;font-weight:700;text-decoration:none}
@media (max-width:900px){.rt-sidebar-actions{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:560px){.rt-sidebar-actions{grid-template-columns:1fr}}
</style>`;

if (!html.includes('id="rt-homepage-sidebar-enhancement-css"')) {
  html = html.replace('</head>', `${css}\n</head>`);
}

fs.writeFileSync(homepage, html, 'utf8');
console.log('Homepage sidebar enhancement applied.');
