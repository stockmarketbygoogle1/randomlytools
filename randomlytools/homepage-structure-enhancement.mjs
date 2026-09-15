import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const homepage = path.join(root, 'dist', 'index.html');

if (!fs.existsSync(homepage)) throw new Error(`Homepage not found: ${homepage}`);
let html = fs.readFileSync(homepage, 'utf8');

/*
 * Additive homepage structure layer.
 * Existing tool cards, URLs, filters and functionality are deliberately left intact.
 * The script only adds discovery sections around the existing directory.
 */
const hero = `
<section class="rt-home-hero" aria-labelledby="rt-home-hero-title">
  <div class="rt-hero-copy">
    <span class="rt-kicker">RANDOMLYTOOLS</span>
    <h1 id="rt-home-hero-title">Free Random Generators &amp; Useful Online Tools</h1>
    <p>Make quick random choices, calculate useful numbers, explore ideas and solve everyday tasks with simple browser-based tools.</p>
    <form class="rt-hero-search" role="search" onsubmit="return false;">
      <label class="sr-only" for="rt-tool-search">Search RandomlyTools</label>
      <input id="rt-tool-search" type="search" placeholder="Search for a tool…" autocomplete="off" />
      <button type="button" id="rt-tool-search-btn">Search</button>
    </form>
    <div class="rt-quick-links" aria-label="Popular tools">
      <a href="/random-name-generator/">Random Name</a>
      <a href="/random-number-picker/">Random Number</a>
      <a href="/random-instagram-username-generator/">Username</a>
      <a href="/youtube-money-calculator/">YouTube Money</a>
      <a href="/attendance-calculator/">Attendance</a>
    </div>
  </div>
  <div class="rt-hero-panel" aria-label="RandomlyTools highlights">
    <div class="rt-hero-stat"><strong>29+</strong><span>Useful tools</span></div>
    <div class="rt-hero-stat"><strong>Free</strong><span>No sign-up needed</span></div>
    <div class="rt-hero-stat"><strong>Simple</strong><span>Easy-to-use interfaces</span></div>
  </div>
</section>`;

if (!html.includes('class="rt-home-hero"')) {
  const marker = /<section class="rt-whats-new"/i;
  if (!marker.test(html)) throw new Error('Existing homepage presentation marker not found for hero section.');
  html = html.replace(marker, `${hero}\n<section class="rt-whats-new"`);
}

const popular = `
<section class="rt-home-discovery" aria-labelledby="rt-popular-tools-title">
  <div class="rt-section-heading">
    <div>
      <span class="rt-kicker">START HERE</span>
      <h2 id="rt-popular-tools-title">Popular Tools</h2>
      <p>Jump straight to tools people can use for names, numbers, social ideas, business planning and everyday calculations.</p>
    </div>
    <a class="rt-view-all" href="/#tools-grid-wrapper">Explore all tools →</a>
  </div>
  <div class="rt-popular-grid">
    <a class="rt-popular-card" href="/random-name-generator/"><span>👤</span><div><strong>Random Name Generator</strong><small>Generate names for people, characters and projects.</small></div></a>
    <a class="rt-popular-card" href="/random-number-picker/"><span>🎲</span><div><strong>Random Number Picker</strong><small>Pick a number from a custom range, with optional no-repeat selection.</small></div></a>
    <a class="rt-popular-card" href="/random-instagram-username-generator/"><span>📸</span><div><strong>Instagram Username Generator</strong><small>Get fresh username ideas for social profiles.</small></div></a>
    <a class="rt-popular-card" href="/random-company-brand-name-generator/"><span>🏢</span><div><strong>Company &amp; Brand Name Generator</strong><small>Explore original naming directions for businesses and brands.</small></div></a>
    <a class="rt-popular-card" href="/youtube-money-calculator/"><span>▶️</span><div><strong>YouTube Money Calculator</strong><small>Estimate possible earnings using planning scenarios.</small></div></a>
    <a class="rt-popular-card" href="/attendance-calculator/"><span>🎓</span><div><strong>Attendance Calculator</strong><small>Calculate attendance percentage and plan toward a target.</small></div></a>
    <a class="rt-popular-card" href="/random-country-generator/"><span>🌍</span><div><strong>Random Country Generator</strong><small>Choose a country for games, learning, writing or exploration.</small></div></a>
    <a class="rt-popular-card" href="/random-team-generator/"><span>👥</span><div><strong>Random Team Generator</strong><small>Create quick random groups for activities and events.</small></div></a>
  </div>
</section>`;

if (!html.includes('id="rt-popular-tools-title"')) {
  const marker = /<section aria-label="Tools Directory">/i;
  if (!marker.test(html)) throw new Error('Tools directory marker not found for popular tools section.');
  html = html.replace(marker, `${popular}\n<section aria-label="Tools Directory">`);
}

const categories = `
<section class="rt-browse-section" aria-labelledby="rt-browse-title">
  <div class="rt-section-heading">
    <div>
      <span class="rt-kicker">BROWSE BY CATEGORY</span>
      <h2 id="rt-browse-title">Find a Tool by What You Need</h2>
      <p>Browse focused groups instead of scanning the entire directory.</p>
    </div>
  </div>
  <div class="rt-category-grid">
    <a class="rt-category-card" href="/?category=names"><span>👤</span><strong>Names &amp; People</strong><small>Name generators, people choices and identity ideas.</small></a>
    <a class="rt-category-card" href="/?category=numbers"><span>🔢</span><strong>Numbers &amp; Math</strong><small>Random numbers, calculations and practical formulas.</small></a>
    <a class="rt-category-card" href="/?category=youtube"><span>▶️</span><strong>YouTube Tools</strong><small>Revenue and creator-focused planning calculators.</small></a>
    <a class="rt-category-card" href="/?category=cricket"><span>🏏</span><strong>Cricket Tools</strong><small>NRR, chase, required-rate and qualification scenarios.</small></a>
    <a class="rt-category-card" href="/?category=business"><span>💼</span><strong>Business &amp; Naming</strong><small>Brand, company, shop and business idea helpers.</small></a>
    <a class="rt-category-card" href="/?category=social"><span>✨</span><strong>Gaming &amp; Social</strong><small>Usernames, gaming choices and social-content helpers.</small></a>
    <a class="rt-category-card" href="/?category=websites"><span>🖥️</span><strong>Website &amp; Creator</strong><small>Website mockups and creator-oriented utilities.</small></a>
    <a class="rt-category-card" href="/?category=home-diy"><span>🏠</span><strong>Home &amp; DIY</strong><small>Practical measurement and project calculators.</small></a>
  </div>
</section>`;

if (!html.includes('id="rt-browse-title"')) {
  const marker = /<section aria-label="Tools Directory">/i;
  if (!marker.test(html)) throw new Error('Tools directory marker not found for category section.');
  html = html.replace(marker, `${categories}\n<section aria-label="Tools Directory">`);
}

const intent = `
<section class="rt-intent-section" aria-labelledby="rt-intent-title">
  <div class="rt-section-heading">
    <div>
      <span class="rt-kicker">NOT SURE WHERE TO START?</span>
      <h2 id="rt-intent-title">Find the Right Tool</h2>
      <p>Choose the outcome you want and we will take you to the most relevant part of the directory.</p>
    </div>
  </div>
  <div class="rt-intent-grid">
    <a href="/?category=names" class="rt-intent-card"><strong>I need a name</strong><span>Go to name and identity generators →</span></a>
    <a href="/?category=numbers" class="rt-intent-card"><strong>I need to calculate something</strong><span>Browse numbers and calculation tools →</span></a>
    <a href="/?category=youtube" class="rt-intent-card"><strong>I need YouTube estimates</strong><span>Explore creator and earnings tools →</span></a>
    <a href="/?category=cricket" class="rt-intent-card"><strong>I need a cricket calculation</strong><span>Open cricket calculators and scenarios →</span></a>
  </div>
</section>`;

if (!html.includes('id="rt-intent-title"')) {
  const marker = /<section aria-label="Tools Directory">/i;
  if (!marker.test(html)) throw new Error('Tools directory marker not found for intent section.');
  html = html.replace(marker, `${intent}\n<section aria-label="Tools Directory">`);
}

const howItWorks = `
<section class="rt-how-section" aria-labelledby="rt-how-title">
  <div class="rt-section-heading">
    <div>
      <span class="rt-kicker">HOW IT WORKS</span>
      <h2 id="rt-how-title">Use a Tool in Three Simple Steps</h2>
    </div>
  </div>
  <div class="rt-how-grid">
    <div class="rt-how-step"><span>1</span><strong>Choose a tool</strong><p>Pick a generator or calculator that matches the task you want to solve.</p></div>
    <div class="rt-how-step"><span>2</span><strong>Enter your inputs</strong><p>Provide the range, details or values needed by that specific tool.</p></div>
    <div class="rt-how-step"><span>3</span><strong>Get your result</strong><p>Run the tool and use the result for your decision, idea, project or calculation.</p></div>
  </div>
</section>`;

if (!html.includes('id="rt-how-title"')) {
  const marker = /<section class="rt-latest-articles"/i;
  if (!marker.test(html)) throw new Error('Latest articles marker not found for how-it-works section.');
  html = html.replace(marker, `${howItWorks}\n<section class="rt-latest-articles"`);
}

const why = `
<section class="rt-why-section" aria-labelledby="rt-why-title">
  <div class="rt-section-heading">
    <div>
      <span class="rt-kicker">WHY RANDOMLYTOOLS?</span>
      <h2 id="rt-why-title">Built for Quick, Practical Tasks</h2>
      <p>RandomlyTools brings small, focused utilities together so you can finish common tasks without complicated workflows.</p>
    </div>
  </div>
  <div class="rt-why-grid">
    <div><strong>Focused tools</strong><p>Each page is designed around one clear job, from picking a number to working through a calculation.</p></div>
    <div><strong>Useful explanations</strong><p>Tool pages include instructions, formulas, examples or practical guidance where it helps you understand the result.</p></div>
    <div><strong>Easy discovery</strong><p>Categories, search, popular tools and guides make it easier to find the right utility instead of guessing which page to open.</p></div>
    <div><strong>Browser-first experience</strong><p>Many tools are designed to work directly in the browser, keeping the experience simple and convenient.</p></div>
  </div>
</section>`;

if (!html.includes('id="rt-why-title"')) {
  const marker = /<section class="rt-latest-articles"/i;
  if (!marker.test(html)) throw new Error('Latest articles marker not found for why section.');
  html = html.replace(marker, `${why}\n<section class="rt-latest-articles"`);
}

const css = `
<style id="rt-homepage-structure-css">
.rt-home-hero{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(240px,.8fr);gap:28px;align-items:stretch;margin:0 auto 34px;padding:34px;border:1px solid var(--border-color,#e5e7eb);border-radius:22px;background:linear-gradient(135deg,#f8fafc,#fff);box-shadow:0 10px 30px rgba(15,23,42,.06)}
.rt-hero-copy h1{margin:7px 0 12px;font-size:clamp(30px,4vw,48px);line-height:1.08;letter-spacing:-.025em}.rt-hero-copy>p{max-width:760px;margin:0 0 20px;font-size:17px;line-height:1.7;color:#475569}.rt-kicker{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.12em;color:#64748b}.rt-hero-search{display:flex;max-width:700px;margin:0 0 14px}.rt-hero-search input{flex:1;min-width:0;padding:14px 16px;border:1px solid #cbd5e1;border-right:0;border-radius:12px 0 0 12px;background:#fff;font:inherit;outline:none}.rt-hero-search input:focus{border-color:#64748b;box-shadow:0 0 0 3px rgba(100,116,139,.12)}.rt-hero-search button{border:1px solid #0f172a;border-radius:0 12px 12px 0;padding:0 22px;background:#0f172a;color:#fff;font-weight:700;cursor:pointer}.rt-quick-links{display:flex;flex-wrap:wrap;gap:8px}.rt-quick-links a{padding:7px 11px;border:1px solid #e2e8f0;border-radius:999px;background:#fff;color:#334155;text-decoration:none;font-size:13px}.rt-hero-panel{display:grid;grid-template-columns:1fr;gap:12px;padding:8px}.rt-hero-stat{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:17px 18px;border-radius:15px;background:#fff;border:1px solid #e2e8f0}.rt-hero-stat strong{font-size:22px}.rt-hero-stat span{color:#64748b;font-size:14px;text-align:right}
.rt-home-discovery,.rt-browse-section,.rt-intent-section,.rt-how-section,.rt-why-section{margin:0 auto 38px}.rt-section-heading{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:18px}.rt-section-heading h2{margin:5px 0 6px;font-size:28px;line-height:1.2}.rt-section-heading p{margin:0;color:#64748b;line-height:1.6}.rt-view-all{white-space:nowrap;font-weight:700;text-decoration:none}.rt-popular-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.rt-popular-card{display:flex;gap:13px;align-items:flex-start;padding:17px;border:1px solid #e2e8f0;border-radius:16px;background:#fff;text-decoration:none;color:inherit;transition:transform .18s ease,box-shadow .18s ease}.rt-popular-card:hover,.rt-category-card:hover,.rt-intent-card:hover{transform:translateY(-2px);box-shadow:0 9px 22px rgba(15,23,42,.08)}.rt-popular-card>span,.rt-category-card>span{font-size:25px;line-height:1}.rt-popular-card strong,.rt-category-card strong{display:block;margin-bottom:5px;font-size:15px}.rt-popular-card small,.rt-category-card small{display:block;color:#64748b;line-height:1.45;font-size:12px}
.rt-category-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.rt-category-card{padding:20px;border:1px solid #e2e8f0;border-radius:16px;background:#f8fafc;text-decoration:none;color:inherit;transition:transform .18s ease,box-shadow .18s ease}.rt-category-card>span{display:block;margin-bottom:12px}.rt-category-card strong{font-size:16px}.rt-category-card small{font-size:13px}.rt-intent-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.rt-intent-card{display:block;padding:19px;border:1px solid #e2e8f0;border-radius:16px;background:#fff;text-decoration:none;color:inherit;transition:transform .18s ease,box-shadow .18s ease}.rt-intent-card strong{display:block;margin-bottom:8px}.rt-intent-card span{color:#64748b;font-size:13px}.rt-how-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.rt-how-step{padding:22px;border:1px solid #e2e8f0;border-radius:16px;background:#fff}.rt-how-step>span{display:inline-grid;place-items:center;width:34px;height:34px;margin-bottom:13px;border-radius:50%;background:#0f172a;color:#fff;font-weight:800}.rt-how-step strong{display:block;font-size:17px;margin-bottom:7px}.rt-how-step p,.rt-why-grid p{margin:0;color:#64748b;line-height:1.6;font-size:14px}.rt-why-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.rt-why-grid>div{padding:20px;border-top:3px solid #cbd5e1;background:#f8fafc;border-radius:12px}.rt-why-grid strong{display:block;margin-bottom:7px}.rt-tool-search-empty{display:none;padding:18px;text-align:center;color:#64748b}.rt-tool-searching .tool-card{transition:opacity .15s ease}
@media(max-width:980px){.rt-home-hero{grid-template-columns:1fr}.rt-popular-grid,.rt-category-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.rt-intent-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.rt-why-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:640px){.rt-home-hero{padding:22px;border-radius:16px}.rt-hero-copy h1{font-size:32px}.rt-hero-search button{padding:0 15px}.rt-section-heading{align-items:flex-start;flex-direction:column}.rt-popular-grid,.rt-category-grid,.rt-intent-grid,.rt-how-grid,.rt-why-grid{grid-template-columns:1fr}.rt-hero-panel{padding:0}.rt-hero-stat{padding:13px 14px}}
</style>`;

if (!html.includes('id="rt-homepage-structure-css"')) html = html.replace('</head>', `${css}\n</head>`);

const script = `
<script id="rt-homepage-search-script">
(function(){
  const input=document.getElementById('rt-tool-search');
  const button=document.getElementById('rt-tool-search-btn');
  const grid=document.getElementById('tools-grid-wrapper');
  if(!input||!button||!grid)return;
  const run=()=>{
    const query=input.value.trim().toLowerCase();
    const cards=[...grid.querySelectorAll('.tool-card')];
    if(!query){cards.forEach(card=>card.style.removeProperty('display'));return;}
    let matches=0;
    cards.forEach(card=>{
      const text=(card.textContent+' '+(card.getAttribute('data-keywords')||'')).toLowerCase();
      const match=text.includes(query);
      card.style.display=match?'':'none';
      if(match)matches++;
    });
    grid.closest('section')?.classList.add('rt-tool-searching');
    grid.scrollIntoView({behavior:'smooth',block:'start'});
    if(!matches) window.setTimeout(()=>window.alert('No matching tool found. Try a simpler search term.'),50);
  };
  button.addEventListener('click',run);
  input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();run();}});
})();
</script>`;

if (!html.includes('id="rt-homepage-search-script"')) html = html.replace('</body>', `${script}\n</body>`);

fs.writeFileSync(homepage, html);
console.log('Homepage structure enhancement applied.');
