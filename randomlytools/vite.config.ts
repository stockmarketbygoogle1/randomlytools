import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

const googleAnalyticsId = 'G-8GT6V10ENG';

const youtubeEnhancement = `
<!-- youtube-seo-enhancement-v2 -->
<style>
  .youtube-seo-extra{max-width:850px;margin:0 auto}
  .youtube-seo-extra h2{margin-top:2rem}
  .youtube-seo-extra h3{margin-top:1.2rem}
  .youtube-seo-extra p{line-height:1.7}
  .youtube-seo-extra li{margin:.45rem 0}
  .youtube-tip{padding:1rem;background:var(--bg-surface-subtle);border-left:3px solid var(--primary);border-radius:8px;margin:1rem 0}
  .youtube-footer-grid{grid-template-columns:1.6fr 1fr 1fr 1.2fr}
  .youtube-footer-grid .more-tools-list{columns:1;list-style:none;padding:0;margin:0}
  .youtube-footer-grid .more-tools-list li{margin:.4rem 0}
  @media(max-width:850px){.youtube-footer-grid{grid-template-columns:1fr 1fr}}
  @media(max-width:650px){.youtube-footer-grid{grid-template-columns:1fr}}
</style>`;

function getYoutubeEnhancement(pagePath: string) {
  if (pagePath.includes('/youtube-money-calculator-india/')) {
    return `<section class="content youtube-seo-extra"><h2>YouTube Earnings Calculator India: How to Get a More Realistic Estimate</h2><p>If your viewers are mainly in India, the most useful way to estimate YouTube income is to start with your own YouTube Studio RPM and then test different monthly-view scenarios.</p><h2>What Can Increase or Decrease YouTube RPM in India?</h2><ul><li><strong>Audience location:</strong> advertiser demand differs between viewer markets.</li><li><strong>Niche:</strong> different topics can monetize differently.</li><li><strong>Video format:</strong> long-form and Shorts have different monetization mechanics.</li><li><strong>Seasonality:</strong> advertising demand changes throughout the year.</li></ul><h2>How to Use This India YouTube Calculator</h2><ol><li>Enter monthly views.</li><li>Select your niche.</li><li>Review estimated RPM and income.</li><li>Compare several view scenarios.</li><li>Replace assumptions with your actual Studio RPM when available.</li></ol></section>`;
  }
  if (pagePath.includes('/youtube-money-calculator-iceland/')) {
    return `<section class="content youtube-seo-extra"><h2>YouTube Earnings Calculator Iceland: What the Estimate Means</h2><p>This Iceland-focused calculator estimates YouTube revenue in Icelandic króna (ISK) using RPM and monthly views.</p><h2>Factors That Affect YouTube RPM in Iceland</h2><ul><li>Viewer geography</li><li>Content niche</li><li>Video format</li><li>Seasonality</li><li>Audience mix</li></ul><h2>How to Use the Iceland YouTube Money Calculator</h2><ol><li>Enter expected monthly views.</li><li>Choose the closest niche.</li><li>Review RPM and revenue.</li><li>Compare several scenarios.</li><li>Use your actual Studio RPM when available.</li></ol></section>`;
  }
  if (pagePath.includes('/youtube-rpm-calculator/')) {
    return `<section class="content youtube-seo-extra"><h2>How to Read Your YouTube RPM Result</h2><p>RPM shows the revenue corresponding to every 1,000 views based on the revenue and views entered.</p><h2>Why YouTube RPM Goes Up and Down</h2><ul><li>Audience country</li><li>Content and advertiser demand</li><li>Video format</li><li>Seasonality</li><li>Monetization coverage</li></ul><h2>RPM vs Revenue vs Views</h2><p>Views show traffic, revenue shows money generated, and RPM normalizes revenue to 1,000 views.</p></section>`;
  }
  if (pagePath.includes('/youtube-shorts-earnings-calculator/')) {
    return `<section class="content youtube-seo-extra"><h2>YouTube Shorts Earnings Calculator: A Better Way to Plan Shorts Income</h2><p>Shorts can generate large view counts, but Shorts revenue per 1,000 views can differ substantially from long-form video revenue.</p><h2>What Affects Shorts Earnings?</h2><ul><li>Eligible views and monetization</li><li>Audience geography</li><li>Content and audience</li><li>Seasonality</li><li>View volume</li></ul><h2>How to Use the Shorts Calculator</h2><ol><li>Enter monthly Shorts views.</li><li>Select the audience country.</li><li>Use your actual Shorts RPM if known.</li><li>Compare monthly and yearly scenarios.</li></ol></section>`;
  }
  return `<section class="content youtube-seo-extra"><h2>YouTube Money Calculator: How to Make a Better Earnings Forecast</h2><p>A useful YouTube earnings estimate tests views, audience country, niche, format and RPM instead of relying on views alone.</p><h2>Step-by-Step YouTube Earnings Planning</h2><ol><li>Set a realistic monthly-view target.</li><li>Select the audience country.</li><li>Choose the closest niche.</li><li>Keep Shorts and long-form forecasts separate.</li><li>Compare multiple scenarios.</li></ol></section>`;
}

function enhanceYoutubeHtml(html: string, pagePath: string) {
  if (!pagePath.includes('/youtube-') || html.includes('youtube-seo-enhancement-v2')) return html;
  const extra = getYoutubeEnhancement(pagePath);
  const footerMoreTools = `<div><h2>More Tools</h2><ul class="more-tools-list"><li><a href="/youtube-money-calculator/">YouTube Money Calculator</a></li><li><a href="/youtube-rpm-calculator/">YouTube RPM Calculator</a></li><li><a href="/youtube-shorts-earnings-calculator/">YouTube Shorts Earnings Calculator</a></li><li><a href="/youtube-money-calculator-india/">YouTube Money Calculator India</a></li><li><a href="/youtube-money-calculator-iceland/">YouTube Money Calculator Iceland</a></li><li><a href="/adsense-revenue-calculator/">AdSense Revenue Calculator</a></li><li><a href="/iceland-salary-calculator/">Iceland Salary Calculator</a></li><li><a href="/cyprus-salary-calculator/">Cyprus Salary Calculator</a></li><li><a href="/attendance-calculator/">Attendance Calculator</a></li><li><a href="/random-number-picker/">Random Number Picker</a></li></ul></div>`;
  html = html.replace('</head>', `${youtubeEnhancement}</head>`);
  html = html.replace('</main>', `${extra}</main>`);
  html = html.replace('<div class="container footer-grid">', '<div class="container footer-grid youtube-footer-grid">');
  html = html.replace('</div><div class="container footer-bottom">', `${footerMoreTools}</div><div class="container footer-bottom">`);
  return html;
}

const cricketHomepageEnhancement = `
<style id="cricket-homepage-tools-style">
  .cricket-tools-note{max-width:800px;margin:1rem auto 2rem;text-align:center;color:var(--text-muted)}
</style>
`;

const cricketCards = `
<div class="tool-card" data-category="cricket" data-keywords="cricket qualification calculator playoff qualification scenarios points table simulator IPL cricket playoff NRR qualify"><div class="tool-card-icon">🏏</div><h2 class="tool-card-title"><a href="/cricket-qualification-calculator/">Cricket Qualification Calculator</a></h2><p class="tool-card-desc">Explore cricket playoff qualification scenarios using points, remaining fixtures, rival results and tie-break situations.</p><span class="tool-card-badge">Cricket Tools</span></div>
<div class="tool-card" data-category="cricket" data-keywords="cricket NRR calculator net run rate calculator IPL NRR tournament NRR run rate"><div class="tool-card-icon">📈</div><h2 class="tool-card-title"><a href="/cricket-nrr-calculator/">Cricket NRR Calculator</a></h2><p class="tool-card-desc">Calculate Net Run Rate from runs scored, runs conceded and cricket overs with correct ball notation.</p><span class="tool-card-badge">Cricket Tools</span></div>
<div class="tool-card" data-category="cricket" data-keywords="cricket required run rate calculator RRR calculator cricket chase required rate runs per over runs per ball"><div class="tool-card-icon">🎯</div><h2 class="tool-card-title"><a href="/cricket-required-run-rate-calculator/">Cricket Required Run Rate Calculator</a></h2><p class="tool-card-desc">Find the required run rate, runs per ball and balls remaining for a cricket chase.</p><span class="tool-card-badge">Cricket Tools</span></div>
<div class="tool-card" data-category="cricket" data-keywords="cricket chase calculator target calculator runs required cricket target score RRR chase IPL T20 ODI"><div class="tool-card-icon">🏆</div><h2 class="tool-card-title"><a href="/cricket-chase-calculator/">Cricket Chase Calculator</a></h2><p class="tool-card-desc">Calculate runs required, required run rate and scoring-rate scenarios for a cricket chase.</p><span class="tool-card-badge">Cricket Tools</span></div>`;

function enhanceCricketHomepage(html: string, pagePath: string) {
  if (pagePath !== '/' && !pagePath.endsWith('/index.html')) return html;
  if (!html.includes('id="tools-grid-wrapper"')) return html;
  if (html.includes('data-category="cricket"')) return html;

  html = html.replace('</head>', `${cricketHomepageEnhancement}</head>`);
  html = html.replace(/(<section aria-label="Tools Directory"><div id="tools-grid-wrapper" class="tools-grid">[\s\S]*?)(<\/div>\s*<\/section>)/i, `$1${cricketCards}\n$2`);
  html = html.replace(/All Tools \(22\)/, 'All Tools (26)');
  html = html.replace(/(<button[^>]+class="preset-chip category-filter-btn"[^>]+data-category="youtube"[^>]*>YouTube Tools<\/button>)/i, '$1<button type="button" class="preset-chip category-filter-btn" data-category="cricket">Cricket Tools</button>');

  const jsonTools = [
    ['23', 'Cricket Qualification Calculator', 'https://randomlytools.in/cricket-qualification-calculator/'],
    ['24', 'Cricket NRR Calculator', 'https://randomlytools.in/cricket-nrr-calculator/'],
    ['25', 'Cricket Required Run Rate Calculator', 'https://randomlytools.in/cricket-required-run-rate-calculator/'],
    ['26', 'Cricket Chase Calculator', 'https://randomlytools.in/cricket-chase-calculator/'],
  ];
  for (const [position, name, url] of jsonTools) {
    if (!html.includes(`"url":"${url}"`)) {
      html = html.replace(/("url":"https:\/\/randomlytools\.in\/youtube-shorts-earnings-calculator\/"})/, `$1,{"@type":"ListItem","position":${position},"name":"${name}","url":"${url}"}`);
    }
  }
  return html;
}

export default defineConfig(() => {
  return {
    publicDir: path.resolve(__dirname, 'public'),
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          randomNameGenerator: path.resolve(__dirname, 'random-name-generator/index.html'),
          randomNumberPicker: path.resolve(__dirname, 'random-number-picker/index.html'),
          randomTeamGenerator: path.resolve(__dirname, 'random-team-generator/index.html'),
          randomCountryGenerator: path.resolve(__dirname, 'random-country-generator/index.html'),
          attendanceCalculator: path.resolve(__dirname, 'attendance-calculator/index.html'),
          randomDogNameGenerator: path.resolve(__dirname, 'random-dog-name-generator/index.html'),
          randomDiscordNameGenerator: path.resolve(__dirname, 'random-discord-name-generator/index.html'),
          randomShopNameGenerator: path.resolve(__dirname, 'random-shop-name-generator/index.html'),
          randomRestaurantNameGenerator: path.resolve(__dirname, 'random-restaurant-name-generator/index.html'),
          randomJapaneseNameGenerator: path.resolve(__dirname, 'random-japanese-name-generator/index.html'),
          randomInstagramUsernameGenerator: path.resolve(__dirname, 'random-instagram-username-generator/index.html'),
          randomCoffeeShopNameGenerator: path.resolve(__dirname, 'random-coffee-shop-name-generator/index.html'),
          randomCompanyBrandNameGenerator: path.resolve(__dirname, 'random-company-brand-name-generator/index.html'),
          recipeFinderByIngredients: path.resolve(__dirname, 'recipe-finder-by-ingredients/index.html'),
          adsenseRevenueCalculator: path.resolve(__dirname, 'adsense-revenue-calculator/index.html'),
          icelandSalaryCalculator: path.resolve(__dirname, 'iceland-salary-calculator/index.html'),
          cyprusSalaryCalculator: path.resolve(__dirname, 'cyprus-salary-calculator/index.html'),
          youtubeMoneyCalculator: path.resolve(__dirname, 'youtube-money-calculator/index.html'),
          youtubeMoneyCalculatorIndia: path.resolve(__dirname, 'youtube-money-calculator-india/index.html'),
          youtubeMoneyCalculatorIceland: path.resolve(__dirname, 'youtube-money-calculator-iceland/index.html'),
          youtubeRpmCalculator: path.resolve(__dirname, 'youtube-rpm-calculator/index.html'),
          youtubeShortsEarningsCalculator: path.resolve(__dirname, 'youtube-shorts-earnings-calculator/index.html'),
          about: path.resolve(__dirname, 'about/index.html'),
          contact: path.resolve(__dirname, 'contact/index.html'),
          privacyPolicy: path.resolve(__dirname, 'privacy-policy/index.html'),
          terms: path.resolve(__dirname, 'terms/index.html'),
          disclaimer: path.resolve(__dirname, 'disclaimer/index.html'),
          articles: path.resolve(__dirname, 'articles/index.html'),
          attendanceArticle: path.resolve(__dirname, 'articles/how-to-calculate-attendance-percentage/index.html'),
          randomTeamsArticle: path.resolve(__dirname, 'articles/how-to-randomly-split-people-into-teams/index.html'),
          countryArticle: path.resolve(__dirname, 'articles/creative-ways-to-use-a-random-country-generator/index.html'),
          randomNumberArticle: path.resolve(__dirname, 'articles/how-to-use-a-random-number-picker/index.html'),
          gamingUsernameArticle: path.resolve(__dirname, 'articles/random-username-ideas-for-gaming/index.html'),
          businessNameArticle: path.resolve(__dirname, 'articles/how-to-choose-a-business-name/index.html'),
          randomNameListArticle: path.resolve(__dirname, 'articles/how-to-pick-a-random-name-from-a-list/index.html'),
          classroomNameArticle: path.resolve(__dirname, 'articles/random-name-generator-for-classroom-activities/index.html'),
          randomGroupsArticle: path.resolve(__dirname, 'articles/how-to-randomly-assign-people-to-groups/index.html'),
          numberVsPickerArticle: path.resolve(__dirname, 'articles/random-number-generator-vs-random-number-picker/index.html'),
          noRepeatNumbersArticle: path.resolve(__dirname, 'articles/how-to-generate-random-numbers-without-repeats/index.html'),
          sportsTeamsArticle: path.resolve(__dirname, 'articles/random-team-generator-for-sports/index.html'),
          shopNameArticle: path.resolve(__dirname, 'articles/how-to-choose-a-shop-name/index.html'),
          coffeeShopNamesArticle: path.resolve(__dirname, 'articles/coffee-shop-name-ideas/index.html'),
          restaurantNamesArticle: path.resolve(__dirname, 'articles/restaurant-name-ideas/index.html'),
          instagramUsernameArticle: path.resolve(__dirname, 'articles/instagram-username-ideas/index.html'),
        },
      },
    },
    plugins: [
      {
        name: 'enhance-cricket-homepage',
        transformIndexHtml(html, ctx) {
          return enhanceCricketHomepage(html, ctx.path);
        },
      },
      {
        name: 'enhance-youtube-pages',
        transformIndexHtml(html, ctx) {
          return enhanceYoutubeHtml(html, ctx.path);
        },
      },
      {
        name: 'inject-google-analytics',
        transformIndexHtml() {
          return {
            tags: [
              { tag: 'script', attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}` }, injectTo: 'head' },
              { tag: 'script', children: `window.dataLayer = window.dataLayer || [];\
function gtag(){dataLayer.push(arguments);}\
gtag('js', new Date());\
gtag('config', '${googleAnalyticsId}');`, injectTo: 'head' },
            ],
          };
        },
      },
      {
        name: 'copy-legacy-assets',
        closeBundle() {
          const source = path.resolve(__dirname, 'assets');
          const target = path.resolve(__dirname, 'dist/assets');
          fs.cpSync(source, target, { recursive: true, force: true });
        },
      },
    ],
    resolve: { alias: { '@': path.resolve(__dirname, '.') } },
    server: { port: 3000, host: '0.0.0.0', hmr: process.env.DISABLE_HMR !== 'true', watch: process.env.DISABLE_HMR === 'true' ? null : {} },
  };
});
