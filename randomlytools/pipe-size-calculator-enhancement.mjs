import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const homepage = path.join(root, 'dist', 'index.html');
const page = path.join(root, 'dist', 'pipe-size-calculator', 'index.html');

if (!fs.existsSync(homepage)) throw new Error(`Homepage not found: ${homepage}`);
let html = fs.readFileSync(homepage, 'utf8');

const card = `
<div class="tool-card" data-category="calculators" data-keywords="pipe size calculator pipe sizing calculator pipe diameter calculator pipe velocity flow rate pipe sizing chart water pipe engineering calculator">
  <div class="tool-card-icon">🔧</div>
  <h2 class="tool-card-title"><a href="/pipe-size-calculator/">Pipe Size Calculator</a></h2>
  <p class="tool-card-desc">Calculate required pipe diameter, flow velocity and flow rate using common metric and imperial units.</p>
  <span class="tool-card-badge">Calculators</span>
</div>`;

// Check for the actual homepage card, not merely any link to the tool (the footer
// also contains this URL). This keeps the card idempotent and prevents it from
// disappearing when another homepage enhancement adds the footer link first.
const hasHomepageCard = /<div class="tool-card"[^>]*data-category="calculators"[^>]*>[\s\S]*?<h2 class="tool-card-title"><a href="\/pipe-size-calculator\/">Pipe Size Calculator<\/a><\/h2>/i.test(html);
if (!hasHomepageCard) {
  const marker = /(<div id="tools-grid-wrapper" class="tools-grid">[\s\S]*?)(<\/div>\s*<div id="no-tools-found")/i;
  if (!marker.test(html)) throw new Error('Homepage tools grid end marker not found.');
  html = html.replace(marker, `$1${card}\n$2`);
}

html = html.replace(/All Tools \(29\)/g, 'All Tools (30)');

if (!html.includes('data-category="calculators">Calculators</button>')) {
  const categoryButton = /(<button[^>]+class="preset-chip category-filter-btn"[^>]+data-category="home-diy"[^>]*>Home &amp; DIY<\/button>)/i;
  if (categoryButton.test(html)) {
    html = html.replace(categoryButton, '$1<button type="button" class="preset-chip category-filter-btn" data-category="calculators">Calculators</button>');
  }
}

if (!html.includes('"url":"https://randomlytools.in/pipe-size-calculator/"')) {
  const marker = /("url":"https:\/\/randomlytools\.in\/fence-post-depth-calculator\/"})/;
  if (!marker.test(html)) throw new Error('Homepage JSON-LD insertion marker not found.');
  html = html.replace(marker, `$1,{"@type":"ListItem","position":30,"name":"Pipe Size Calculator","url":"https://randomlytools.in/pipe-size-calculator/"}`);
}

if (fs.existsSync(page)) {
  let pageHtml = fs.readFileSync(page, 'utf8');

  const title = 'Pipe Size Calculator - Pipe Sizing, Diameter, Flow Rate & Velocity | RandomlyTools';
  const description = 'Free pipe size calculator for pipe sizing from flow rate and velocity. Calculate required pipe diameter, flow velocity, or flow rate in GPM, L/min, m³/h, m³/s, and ft³/min.';
  pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  pageHtml = pageHtml.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${description}">`);
  pageHtml = pageHtml.replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${title}">`);
  pageHtml = pageHtml.replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${description}">`);

  const faqItems = [
    ['What size pipe do I need for my flow rate?', 'Enter the required flow rate and a suitable target velocity in Pipe Size mode. The calculator uses the continuity equation to estimate the required internal pipe diameter. Final nominal pipe selection should be checked against the applicable pipe standard, material, pressure loss and project requirements.'],
    ['How do you calculate pipe size from flow rate?', 'For a circular pipe, use Q = A × V and A = πD²/4. Solving for diameter gives D = √(4Q/(πV)). Flow rate and velocity must be expressed in compatible units.'],
    ['How do you calculate pipe diameter?', 'Pipe diameter can be calculated from volumetric flow rate and average velocity using D = √(4Q/(πV)) for a circular pipe. The result is the required internal diameter for the selected flow and velocity.'],
    ['How do I calculate flow velocity in a pipe?', 'Flow velocity is volumetric flow rate divided by the pipe cross-sectional area. For a circular pipe, v = 4Q/(πD²) when compatible units are used.'],
    ['Does pipe diameter affect flow velocity?', 'Yes. At a fixed flow rate, a smaller internal diameter gives a higher average velocity, while a larger internal diameter gives a lower average velocity.'],
    ['What is the difference between pipe size and pipe diameter?', 'Pipe diameter used in a flow calculation refers to the actual internal bore. Pipe size can refer to a nominal standardized designation, which is not always equal to the measured internal diameter.'],
    ['What is the difference between nominal pipe size and internal diameter?', 'Nominal pipe size is a standardized designation. The actual internal diameter depends on the pipe standard, material and wall thickness or schedule, so nominal size should not be substituted directly for bore diameter in calculations.'],
    ['What velocity should I use for pipe sizing?', 'The appropriate design velocity depends on the fluid, service, pipe material, noise limits, erosion concerns and project standards. This calculator lets you enter the target velocity rather than assuming one universal value.'],
    ['Does this pipe size calculator calculate pressure drop?', 'No. This page calculates pipe diameter, velocity or flow rate from the continuity relationship. Pressure-drop analysis requires additional information such as pipe length, roughness, fittings, fluid properties and the selected hydraulic method.'],
    ['Can I use this calculator for water pipe sizing?', 'Yes, the velocity-based calculation can be used as a first-pass sizing method for water and other incompressible liquids. The appropriate velocity depends on the application, and final selection should consider pressure loss, pipe material, temperature, fittings, available pressure and applicable codes.'],
    ['Can I use this calculator for gas pipe sizing?', 'The basic diameter-and-velocity relationship is not enough for final gas pipe sizing. Gas calculations can depend on pressure, temperature, gas properties, pipe length, fittings, allowable pressure drop and applicable standards. Use a gas-specific engineering method for final design.'],
    ['What units does the pipe size calculator support?', 'Flow rate supports GPM, L/min, m³/h, m³/s and ft³/min. Internal diameter supports inches, millimetres, centimetres and feet. Velocity supports ft/s and m/s.'],
    ['Should I use inside diameter or outside diameter?', 'Use the internal diameter or bore for the flow calculation. Outside diameter does not represent the available flow area and can give a different result, especially when wall thickness is significant.'],
    ['Is the calculated pipe diameter the final pipe size?', 'No. The result is a calculated internal diameter based on flow and velocity. A final pipe size should be selected using the applicable nominal-size table and then checked for pressure drop and other project requirements.']
  ];

  const faqHtml = faqItems.map(([q, a]) => `<h3>${q}</h3><p>${a}</p>`).join('\n      ');
  const faqSection = `<h2>Frequently Asked Questions About Pipe Sizing</h2>\n      ${faqHtml}`;

  const oldFaqBlock = `<h2>Frequently Asked Questions</h2>
      <h3>How do you calculate pipe size from flow rate?</h3><p>Use Q = A × V and A = πD²/4. After converting flow rate and velocity to compatible units, solve for the required internal diameter.</p>
      <h3>How do you calculate flow velocity in a pipe?</h3><p>Divide volumetric flow rate by the pipe's cross-sectional area. For a circular pipe, the relationship is v = 4Q/(πD²) with compatible units.</p>
      <h3>Does pipe diameter affect flow velocity?</h3><p>Yes. At a fixed flow rate, a smaller internal diameter produces a higher average velocity and a larger internal diameter produces a lower average velocity.</p>
      <h3>What is the difference between pipe diameter and nominal pipe size?</h3><p>Internal diameter is the actual inside opening used for flow calculations. Nominal pipe size is a standardized designation and is not necessarily equal to the measured internal diameter.</p>
      <h3>Can this calculator select a final engineering pipe size?</h3><p>It provides a flow-and-velocity diameter estimate. Final selection can require pressure-loss calculations, pipe material, temperature, fittings, applicable codes and project-specific engineering review.</p>`;

  if (pageHtml.includes(oldFaqBlock)) {
    pageHtml = pageHtml.replace(oldFaqBlock, faqSection);
  } else if (!pageHtml.includes('Frequently Asked Questions About Pipe Sizing')) {
    const articleEnd = /\n\s*<\/article>/i;
    if (!articleEnd.test(pageHtml)) throw new Error('Pipe Size Calculator article end marker not found.');
    pageHtml = pageHtml.replace(articleEnd, `\n      ${faqSection}\n    </article>`);
  }

  const keywordExpansion = `
      <h2>Pipe Sizing Calculator: What This Tool Calculates</h2>
      <p>This free pipe sizing calculator is designed for common flow-and-velocity calculations. You can use it as a <strong>pipe size calculator</strong>, <strong>pipe sizing calculator</strong>, <strong>pipe diameter calculator</strong>, <strong>pipe velocity calculator</strong> or <strong>pipe flow rate calculator</strong>, depending on the information you already know.</p>
      <p>Use <strong>Pipe Size</strong> when you know the required flow rate and desired velocity and want the required internal diameter. Use <strong>Flow Velocity</strong> when you know flow rate and internal diameter and want the average velocity. Use <strong>Flow Rate</strong> when you know the internal diameter and velocity and want the volumetric flow rate.</p>

      <h2>Pipe Sizing Calculation Formula</h2>
      <p>The core relationship is the continuity equation:</p>
      <p><strong>Q = A × V</strong></p>
      <p>For a circular pipe, the flow area is <strong>A = πD² / 4</strong>. Rearranging gives the required diameter:</p>
      <p><strong>D = √(4Q / (πV))</strong></p>
      <p>Here, Q is volumetric flow rate, A is internal cross-sectional area, V is average flow velocity, and D is internal pipe diameter. The calculator converts the selected units before performing the calculation.</p>

      <h2>Pipe Size, Pipe Diameter and Pipe Sizing Chart</h2>
      <p>A calculated diameter is not automatically the same thing as a nominal pipe size. A <strong>pipe sizing chart</strong> or pipe-dimension table is normally needed to map the required internal bore to an available nominal size for a particular material and standard. Because actual bore dimensions vary by pipe standard and wall thickness, a generic nominal-size list should not be used as a substitute for the applicable standard.</p>
      <p>For a fixed flow rate, a larger internal diameter reduces average velocity. A smaller diameter increases velocity. The final selection is therefore a design decision that may also require pressure-loss, material, temperature, fittings, operating pressure and code checks.</p>

      <h2>Water Pipe Sizing</h2>
      <p>For water systems, this calculator can provide a useful first-pass internal diameter from flow rate and a chosen velocity. The appropriate velocity depends on the application. Domestic water, pump suction, pump discharge, HVAC and industrial services can have different design constraints, so there is no single velocity that is correct for every installation.</p>
      <p>After calculating the required bore, compare it with the dimensions of the actual pipe material and standard you intend to use. Then check pressure drop and the rest of the system requirements before treating the result as a final design size.</p>

      <h2>Pipe Velocity and Flow Rate Calculations</h2>
      <p>If the pipe diameter is already known, the same continuity equation can be used in reverse. Flow velocity is calculated from flow rate and area, while flow rate is calculated from area and velocity. This makes the calculator useful for checking an existing pipe as well as estimating a required diameter.</p>
      <p>For a circular pipe, the velocity relationship is <strong>V = 4Q / (πD²)</strong>, and the flow relationship is <strong>Q = VπD² / 4</strong>. Always keep the units compatible when applying these equations manually.</p>

      <h2>Pipe Sizing for Gas and Compressed Air</h2>
      <p>Gas and compressed-air piping needs more than a simple liquid-style velocity calculation for final sizing. Compressibility, inlet and outlet pressure, temperature, gas properties, pipe length, fittings and allowable pressure drop can materially affect the design. The calculator can explain the basic diameter relationship, but it should not be treated as a universal gas pipe sizing method.</p>

      <h2>How to Choose a Pipe Size After Calculating the Diameter</h2>
      <ol>
        <li>Calculate the required internal diameter from flow rate and target velocity.</li>
        <li>Identify the pipe material and applicable dimensional standard.</li>
        <li>Compare the calculated bore with the actual internal dimensions of available pipe sizes.</li>
        <li>Check velocity at the selected actual bore.</li>
        <li>Check pressure drop, fittings, length, operating conditions and project requirements.</li>
        <li>Confirm the final selection against the applicable engineering standard or qualified review.</li>
      </ol>

      <h2>Common Pipe Sizing Questions</h2>
      <p>People searching for pipe sizing help may use different wording, including <strong>pipe sizing calculations</strong>, <strong>pipe sizing calculation</strong>, <strong>calculation of pipe size</strong>, <strong>calculate pipe size from flow rate</strong>, <strong>pipe diameter from flow rate</strong>, <strong>pipe velocity from flow rate</strong>, <strong>flow rate through pipe</strong> and <strong>pipe sizing chart</strong>. This page covers these closely related calculation intents without treating every phrase as a separate page.</p>
`;

  const insertBeforeFaq = /\n\s*<h2>Frequently Asked Questions About Pipe Sizing<\/h2>/i;
  if (insertBeforeFaq.test(pageHtml) && !pageHtml.includes('Pipe Sizing Calculator: What This Tool Calculates')) {
    pageHtml = pageHtml.replace(insertBeforeFaq, `\n${keywordExpansion}\n      <h2>Frequently Asked Questions About Pipe Sizing</h2>`);
  }

  const faqSchema = faqItems.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a }
  }));

  const scripts = [...pageHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (scripts.length) {
    try {
      const data = JSON.parse(scripts[0][1]);
      if (Array.isArray(data['@graph'])) {
        const faqNode = data['@graph'].find(node => node && node['@type'] === 'FAQPage');
        if (faqNode) faqNode.mainEntity = faqSchema;
      }
      const replacement = `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n  </script>`;
      pageHtml = pageHtml.slice(0, scripts[0].index) + replacement + pageHtml.slice(scripts[0].index + scripts[0][0].length);
    } catch (error) {
      throw new Error(`Pipe Size Calculator JSON-LD could not be parsed: ${error.message}`);
    }
  }

  fs.writeFileSync(page, pageHtml);
  console.log('Pipe Size Calculator page SEO and FAQ enhancement complete.');
}

fs.writeFileSync(homepage, html);
console.log('Pipe Size Calculator homepage integration complete.');
