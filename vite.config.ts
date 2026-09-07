import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const cricketCards = `
<div class="tool-card" data-category="cricket" data-keywords="cricket qualification calculator playoff qualification scenarios points table simulator IPL cricket playoff NRR qualify">
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
</div>`;

function homepageCricketPlugin() {
  return {
    name: 'homepage-cricket-tools',
    transformIndexHtml(html: string, ctx: { filename?: string }) {
      if (!ctx.filename?.endsWith('/index.html') || !html.includes('Tools Directory')) {
        return html;
      }

      if (!html.includes('data-category="cricket"')) {
        const gridEnd = /(<section aria-label="Tools Directory"><div id="tools-grid-wrapper" class="tools-grid">[\s\S]*?)(<\/div>\s*<\/section>)/i;
        if (gridEnd.test(html)) {
          html = html.replace(gridEnd, `$1${cricketCards}\n$2`);
        }
      }

      html = html.replace(/All Tools \(22\)/, 'All Tools (26)');

      if (!html.includes('data-category="cricket">Cricket Tools')) {
        const youtubeButton = /(<button[^>]+class="preset-chip category-filter-btn"[^>]+data-category="youtube"[^>]*>YouTube Tools<\/button>)/i;
        if (youtubeButton.test(html)) {
          html = html.replace(youtubeButton, '$1<button type="button" class="preset-chip category-filter-btn" data-category="cricket">Cricket Tools</button>');
        }
      }

      const jsonTools = [
        ['23', 'Cricket Qualification Calculator', 'https://randomlytools.in/cricket-qualification-calculator/'],
        ['24', 'Cricket NRR Calculator', 'https://randomlytools.in/cricket-nrr-calculator/'],
        ['25', 'Cricket Required Run Rate Calculator', 'https://randomlytools.in/cricket-required-run-rate-calculator/'],
        ['26', 'Cricket Chase Calculator', 'https://randomlytools.in/cricket-chase-calculator/']
      ];

      for (const [position, name, url] of jsonTools) {
        if (!html.includes(`\"url\":\"${url}\"`)) {
          const item = `,{\"@type\":\"ListItem\",\"position\":${position},\"name\":\"${name}\",\"url\":\"${url}\"}`;
          const marker = /(\"url\":\"https:\\/\\/randomlytools\\.in\\/youtube-shorts-earnings-calculator\\/\"})/;
          html = html.replace(marker, `$1${item}`);
        }
      }

      return html;
    }
  };
}

export default defineConfig({
  plugins: [react(), homepageCricketPlugin()],

  // The production website lives in ./randomlytools and is a static
  // multi-page site. Keep Vite compatible with that layout if it is
  // invoked directly, while the Cloudflare build uses build-static.mjs.
  root: path.resolve(__dirname, 'randomlytools'),

  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'randomlytools'),
    },
  },

  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
