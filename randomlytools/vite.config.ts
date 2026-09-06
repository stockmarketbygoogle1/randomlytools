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
    return `
<section class="content youtube-seo-extra">
  <h2>YouTube Earnings Calculator India: How to Get a More Realistic Estimate</h2>
  <p>If your viewers are mainly in India, the most useful way to estimate YouTube income is to start with your own YouTube Studio RPM and then test different monthly-view scenarios. A generic India RPM is useful for planning a new channel, but it cannot predict the exact income of an individual creator.</p>
  <p>For example, at ₹67 RPM, 100,000 monthly views mathematically produce about ₹6,700. At ₹100 RPM, the same number of views produces ₹10,000. This shows why RPM is often more important than views alone when you build a revenue target.</p>
  <div class="youtube-tip"><strong>Planning tip:</strong> If your audience is not 100% Indian, do not assume an India-only RPM. A channel with viewers from the US, UK, Canada, Australia or other markets can have a blended RPM that is different from an India-only estimate.</div>
  <h2>What Can Increase or Decrease YouTube RPM in India?</h2>
  <ul><li><strong>Audience location:</strong> advertiser demand differs between viewer markets.</li><li><strong>Niche:</strong> finance, business, software and professional topics can monetize differently from entertainment or music.</li><li><strong>Video format:</strong> long-form and Shorts have different monetization mechanics.</li><li><strong>Seasonality:</strong> advertising demand can change during holidays, shopping periods and other parts of the year.</li><li><strong>Monetized viewing:</strong> not every view produces the same advertising opportunity.</li></ul>
  <h2>How to Use This India YouTube Calculator</h2>
  <ol><li>Enter the monthly views you expect or already receive.</li><li>Select the niche closest to your content.</li><li>Read the estimated RPM and monthly income.</li><li>Repeat the calculation for 100K, 500K and 1M views to create a realistic range.</li><li>Once your channel has enough data, replace the planning assumption with your actual Studio RPM.</li></ol>
  <h2>India YouTube Income Goals</h2>
  <p>Instead of asking only how much YouTube pays, creators can work backwards from an income target. The formula is <strong>required views = income goal ÷ RPM × 1,000</strong>. At ₹100 RPM, ₹10,000 requires about 100,000 views, while ₹50,000 requires about 500,000 views. These are mathematical examples, not promises of earnings.</p>
  <h2>More Questions About YouTube Earnings in India</h2>
  <h3>Does 1,000 views always earn ₹67?</h3><p>No. ₹67 is only an example RPM used by this page. Your actual RPM can be lower or higher.</p>
  <h3>Can an Indian YouTuber earn from international viewers?</h3><p>Yes. A creator can have viewers from many countries. Audience geography can change the blended RPM of the channel.</p>
  <h3>Should I calculate Shorts and long-form together?</h3><p>For planning, it is better to estimate them separately because Shorts and long-form use different monetization systems and can have very different revenue per 1,000 views.</p>
</section>`;
  }

  if (pagePath.includes('/youtube-money-calculator-iceland/')) {
    return `
<section class="content youtube-seo-extra">
  <h2>YouTube Earnings Calculator Iceland: What the Estimate Means</h2>
  <p>This Iceland-focused calculator is designed for creators who want to see YouTube revenue estimates in Icelandic króna (ISK). The calculation is based on RPM, so changing the RPM can have a much larger effect on estimated income than simply changing a small number of views.</p>
  <p>For example, at kr6 RPM, 100,000 views gives a mathematical estimate of kr600. At kr10 RPM, the same 100,000 views gives kr1,000. These figures demonstrate the formula rather than claiming that Iceland has one fixed YouTube rate.</p>
  <div class="youtube-tip"><strong>Important:</strong> Your viewers' countries matter. An Iceland-based channel can have an international audience, so its actual RPM may be a blended result of Icelandic and overseas viewers.</div>
  <h2>Factors That Affect YouTube RPM in Iceland</h2>
  <ul><li><strong>Viewer geography:</strong> the advertising market of your audience influences monetization.</li><li><strong>Content niche:</strong> business, finance and technology can have different advertiser demand from gaming, music or entertainment.</li><li><strong>Format:</strong> long-form videos and Shorts should be planned separately.</li><li><strong>Seasonality:</strong> advertiser budgets can change throughout the year.</li><li><strong>Channel audience:</strong> a small Icelandic audience and a global audience can produce very different blended results.</li></ul>
  <h2>How to Use the Iceland YouTube Money Calculator</h2>
  <ol><li>Enter your expected monthly views.</li><li>Choose the niche closest to your channel.</li><li>Review the estimated RPM and revenue.</li><li>Compare several view levels rather than relying on one forecast.</li><li>Use your actual YouTube Studio RPM once your channel has enough historical data.</li></ol>
  <h2>Iceland YouTube Revenue Planning Examples</h2>
  <p>At kr6 RPM, 10,000 views equals about kr60, 100,000 views equals about kr600, and 1 million views equals about kr6,000. If your RPM doubles, the mathematical revenue estimate also doubles. This is why tracking RPM over time is useful for channel planning.</p>
  <h2>More Questions About YouTube Earnings in Iceland</h2>
  <h3>Is kr6 a guaranteed Iceland YouTube RPM?</h3><p>No. It is a planning midpoint used by this calculator and should not be treated as an official YouTube rate.</p>
  <h3>Can an Icelandic creator have a high RPM?</h3><p>Yes, but the result depends on the actual audience, niche, format, monetization and advertiser demand. Creator location alone does not guarantee an RPM.</p>
  <h3>Should I use ISK or another currency?</h3><p>Use the currency that makes your planning easiest. For an Iceland-focused estimate, ISK is useful because it keeps the calculation in local terms.</p>
</section>`;
  }

  if (pagePath.includes('/youtube-rpm-calculator/')) {
    return `
<section class="content youtube-seo-extra">
  <h2>How to Read Your YouTube RPM Result</h2>
  <p>The RPM result tells you how much revenue corresponds to every 1,000 views based on the revenue and view numbers you entered. It is useful for comparing periods, videos and audience mixes without being distracted by total view count alone.</p>
  <p>For example, ₹1,000 from 100,000 views gives an RPM of ₹10. If another month produces ₹1,500 from the same 100,000 views, the RPM is ₹15. The second month generated more revenue from the same number of views because the effective RPM was higher.</p>
  <div class="youtube-tip"><strong>Best practice:</strong> When available, use your own YouTube Studio revenue and views rather than copying an RPM benchmark from another website. Benchmarks are planning tools, not guarantees.</div>
  <h2>Why YouTube RPM Goes Up and Down</h2>
  <ul><li>Audience country and the mix of viewers can change.</li><li>Different videos can attract different advertiser demand.</li><li>Long-form and Shorts have different monetization models.</li><li>Seasonal advertising budgets can affect revenue.</li><li>Monetization coverage and viewer behaviour can vary.</li></ul>
  <h2>RPM Examples at Different View Counts</h2>
  <p>At ₹5 RPM, 10,000 views is about ₹50, 100,000 views is about ₹500, and 1 million views is about ₹5,000. At ₹10 RPM, those same view counts become ₹100, ₹1,000 and ₹10,000. The formula stays the same; only the RPM changes.</p>
  <h2>RPM vs Revenue vs Views</h2>
  <p>Views tell you how much traffic a channel received. Revenue tells you how much money was generated. RPM connects the two by normalizing revenue to 1,000 views. This makes RPM especially useful when comparing months with different traffic levels.</p>
  <h2>How to Improve Your RPM Analysis</h2>
  <ol><li>Track RPM over several weeks instead of judging one day.</li><li>Compare similar content rather than unrelated niches.</li><li>Look at audience geography and format.</li><li>Separate Shorts from long-form when planning revenue.</li><li>Use your historical Studio RPM for future forecasts.</li></ol>
  <h2>More Questions About YouTube RPM</h2>
  <h3>Can RPM be zero or very low?</h3><p>Yes. RPM can be very low depending on monetization and the type of views a channel receives.</p>
  <h3>Is a higher RPM always better?</h3><p>A higher RPM means more revenue per 1,000 views, but total channel revenue also depends on how many views you receive.</p>
  <h3>Should I compare my RPM with another creator?</h3><p>Only as a broad reference. Differences in audience, niche, geography and format make direct comparisons imperfect.</p>
</section>`;
  }

  if (pagePath.includes('/youtube-shorts-earnings-calculator/')) {
    return `
<section class="content youtube-seo-extra">
  <h2>YouTube Shorts Earnings Calculator: A Better Way to Plan Shorts Income</h2>
  <p>Shorts can generate very large view counts, but revenue per 1,000 views can be much smaller than many long-form videos. That means a useful Shorts forecast should focus on views, Shorts RPM, audience geography and the actual revenue data available in YouTube Studio.</p>
  <p>For example, at a $0.10 Shorts RPM, 1 million views produces a mathematical estimate of $100. At $0.20 RPM, the same 1 million views produces $200. The example shows why even a small change in Shorts RPM can matter when view counts reach millions.</p>
  <div class="youtube-tip"><strong>Planning tip:</strong> If you have historical Shorts revenue, calculate your own effective RPM and use it instead of relying only on a generic country assumption.</div>
  <h2>What Affects Shorts Earnings?</h2>
  <ul><li><strong>Eligible views and monetization:</strong> not every view produces identical revenue.</li><li><strong>Audience geography:</strong> viewer markets can affect advertising value.</li><li><strong>Content and audience:</strong> different audiences can produce different revenue results.</li><li><strong>Seasonality:</strong> advertising demand changes during the year.</li><li><strong>Volume:</strong> Shorts often require large view counts to reach meaningful revenue targets.</li></ul>
  <h2>How to Use the Shorts Calculator</h2>
  <ol><li>Enter your monthly Shorts views.</li><li>Select the country that best represents your audience.</li><li>Enter your actual Shorts RPM if you know it.</li><li>Compare monthly and yearly results.</li><li>Test multiple view targets such as 100K, 1M and 10M.</li></ol>
  <h2>How Many Shorts Views Do You Need?</h2>
  <p>The formula is <strong>required views = income goal ÷ Shorts RPM × 1,000</strong>. At a $0.10 RPM, $100 requires about 1 million views and $1,000 requires about 10 million views. At a $0.20 RPM, those view requirements are roughly half.</p>
  <h2>Shorts Revenue vs Long-form Revenue</h2>
  <p>Do not assume that a long-form RPM can be copied directly into a Shorts forecast. Shorts have a different monetization system, so creators should use a dedicated Shorts estimate and their own historical Shorts data when possible.</p>
  <h2>More Questions About Shorts Earnings</h2>
  <h3>Can Shorts make money with fewer than 1 million views?</h3><p>Yes. There is no single minimum view count for earning revenue, but the amount can be small when Shorts RPM is low.</p>
  <h3>Why can two Shorts channels earn different amounts from the same views?</h3><p>Audience geography, eligible views, content, monetization and other factors can produce different effective RPMs.</p>
  <h3>Should I use my long-form RPM for Shorts?</h3><p>No. Use Shorts-specific historical data or a dedicated Shorts planning assumption because the monetization models differ.</p>
</section>`;
  }

  return `
<section class="content youtube-seo-extra">
  <h2>YouTube Money Calculator: How to Make a Better Earnings Forecast</h2>
  <p>A YouTube earnings estimate becomes more useful when you test several variables instead of looking at views alone. Audience country, niche, content format and RPM can all change the result. This calculator gives you a planning estimate and also lets you think about what your own Studio RPM could mean for future traffic.</p>
  <div class="youtube-tip"><strong>Best practice:</strong> If you already have a monetized channel, your actual YouTube Studio RPM is usually a better starting point than a generic online benchmark.</div>
  <h2>Step-by-Step YouTube Earnings Planning</h2>
  <ol><li>Start with a realistic monthly-view target.</li><li>Select the audience country that best represents your viewers.</li><li>Choose the closest niche.</li><li>Keep long-form and Shorts forecasts separate.</li><li>Compare low, typical and high scenarios.</li><li>Replace generic assumptions with your own historical RPM when enough data is available.</li></ol>
  <h2>What Can Change Your Estimated YouTube Income?</h2>
  <ul><li><strong>Audience geography:</strong> advertiser demand varies between markets.</li><li><strong>Niche:</strong> finance, business, software and other commercial topics can monetize differently from music or entertainment.</li><li><strong>Format:</strong> Shorts and long-form should not be treated as the same revenue model.</li><li><strong>Seasonality:</strong> advertising demand can change throughout the year.</li><li><strong>Actual RPM:</strong> your own Studio history is the strongest input for channel-specific forecasting.</li></ul>
  <h2>YouTube Income Goal Examples</h2>
  <p>The basic formula is <strong>required views = income goal ÷ RPM × 1,000</strong>. At a $5 RPM, $100 requires about 20,000 views, $1,000 requires about 200,000 views and $10,000 requires about 2 million views. These examples are mathematical scenarios, not guaranteed earnings.</p>
  <h2>Why Your YouTube Revenue May Differ From an Online Calculator</h2>
  <p>Online calculators use assumptions because they cannot know your exact audience, monetization history or future advertiser demand. Your channel may have a different RPM from the calculator's benchmark. For that reason, use online estimates for planning and YouTube Studio for historical performance.</p>
  <h2>More Questions About YouTube Earnings</h2>
  <h3>Are YouTube earnings predictable?</h3><p>They can be estimated, but not predicted perfectly. RPM and monthly views can change over time.</p>
  <h3>Does the creator's country determine RPM?</h3><p>Not by itself. Viewer geography, niche, format and monetization factors are important parts of the revenue picture.</p>
  <h3>Should I use CPM or RPM for an earnings forecast?</h3><p>RPM is the simpler creator-side input when you want to estimate revenue from views. CPM is an advertiser-side metric and should not simply be substituted for RPM.</p>
</section>`;
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
              { tag: 'script', children: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${googleAnalyticsId}');`, injectTo: 'head' },
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