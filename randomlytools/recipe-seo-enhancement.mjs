import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const page = path.join(root, 'dist', 'recipe-finder-by-ingredients', 'index.html');

if (!fs.existsSync(page)) throw new Error(`Recipe Finder page not found: ${page}`);

let html = fs.readFileSync(page, 'utf8');

const title = 'Recipe Finder by Ingredients – What Can I Make With What I Have? | RandomlyTools';
const description = 'Use this free recipe finder by ingredients to discover what you can make with what you have. Find easy breakfast, lunch, dinner and snack ideas and see missing ingredients.';

html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
html = html.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${description}">`);
html = html.replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${title}">`);
html = html.replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${description}">`);

if (!html.includes('name="keywords"')) {
  html = html.replace('</head>', '<meta name="keywords" content="recipe finder by ingredients, what can I make with what I have, recipes from ingredients, recipe generator from ingredients, what to cook with ingredients, easy recipes with ingredients, leftover ingredients recipes, dinner ideas from ingredients">\n</head>');
}

const faqSchema = `<script type="application/ld+json" id="recipe-finder-faq-schema">${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What can I make with the ingredients I have?', acceptedAnswer: { '@type': 'Answer', text: 'Add the ingredients you have to the recipe finder and select Find Recipes. The tool compares your ingredients with its recipe collection and shows matching ideas plus missing ingredients.' } },
    { '@type': 'Question', name: 'How does a recipe finder by ingredients work?', acceptedAnswer: { '@type': 'Answer', text: 'A recipe finder by ingredients compares the foods you have with recipe ingredient lists, then ranks recipes by how closely they match.' } },
    { '@type': 'Question', name: 'Can I find dinner recipes from ingredients I have?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Select Dinner in the meal filter to focus the results on dinner recipe ideas that match your selected ingredients.' } },
    { '@type': 'Question', name: 'Can I find vegetarian or vegan recipes from ingredients?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use the diet filter to choose Vegetarian or Vegan before finding recipe ideas.' } },
    { '@type': 'Question', name: 'Does the recipe finder show missing ingredients?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Matching recipe cards show the ingredients that are not included in your selected list, helping you see what you may still need.' } }
  ]
})}</script>`;

if (!html.includes('id="recipe-finder-faq-schema"')) {
  html = html.replace('</head>', `${faqSchema}\n</head>`);
}

const seoSection = `<section class="content-section recipe-seo-content" aria-labelledby="recipe-search-intent-heading">
<article class="article-content">
<h2 id="recipe-search-intent-heading">What to Cook With Ingredients You Already Have</h2>
<p>Not sure what to cook with ingredients in your kitchen? A recipe finder by ingredients is useful when you want meal ideas without starting with a recipe name. Enter the foods you already have, then compare breakfast, lunch, dinner and snack recipes that use those ingredients.</p>
<h2>Find Recipes From Ingredients You Have</h2>
<p>This tool is designed for searches such as <strong>what can I make with what I have</strong>, <strong>recipes from ingredients</strong> and <strong>what to cook with ingredients</strong>. Results show an ingredient-match percentage and the ingredients that are still missing, so you can decide whether to cook now or make a small shopping list.</p>
<h2>Easy Dinner Ideas From Ingredients</h2>
<p>Choose Dinner when you need a quick dinner idea from your available ingredients. You can also select Vegetarian or Vegan to narrow the recipe results. For the best matches, add the main ingredients first, such as rice, pasta, chicken, eggs, potatoes, tomatoes, onions, chickpeas or vegetables.</p>
<h2>Why Ingredient-Based Recipe Search Is Useful</h2>
<ul><li>Start with your pantry and refrigerator instead of a recipe name.</li><li>Find meals that use more of the ingredients you already own.</li><li>See missing ingredients before deciding what to cook.</li><li>Filter ideas by meal type and dietary preference.</li><li>Reduce unnecessary ingredient shopping and make better use of leftovers.</li></ul>
<h2>More Free Tools</h2>
<p>Explore the <a href="/">RandomlyTools home page</a> to discover other free online generators and calculators. Return to this recipe finder whenever you want to turn ingredients you already have into meal ideas.</p>
</article>
</section>`;

if (!html.includes('id="recipe-search-intent-heading"')) {
  const marker = '<section class="content-section"><article class="article-content">';
  if (html.includes(marker)) {
    html = html.replace(marker, `${seoSection}\n${marker}`);
  } else {
    throw new Error('Recipe content section marker not found.');
  }
}

// Create a lightweight, self-hosted hero visual so the page has a meaningful image without adding a large raster dependency.
const assetDir = path.join(root, 'dist', 'assets', 'images');
fs.mkdirSync(assetDir, { recursive: true });
const heroPath = path.join(assetDir, 'recipe-finder-ingredients.svg');
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" role="img" aria-labelledby="title desc"><title id="title">Recipe Finder by Ingredients</title><desc id="desc">A colorful bowl of vegetables, rice and chicken representing recipe ideas made from ingredients you already have.</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f5fbf7"/><stop offset="1" stop-color="#e7f6ee"/></linearGradient><linearGradient id="bowl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#233b53"/><stop offset="1" stop-color="#0e1d2d"/></linearGradient></defs><rect width="1200" height="700" rx="32" fill="url(#bg)"/><circle cx="1020" cy="110" r="100" fill="#d9f2e3"/><circle cx="150" cy="580" r="130" fill="#dff4e7"/><g transform="translate(650 90)"><ellipse cx="250" cy="450" rx="320" ry="65" fill="#b7d7c4" opacity=".45"/><path d="M-20 170h540c-20 230-95 330-270 330S0 400-20 170Z" fill="url(#bowl)"/><ellipse cx="250" cy="175" rx="285" ry="115" fill="#172b40"/><ellipse cx="250" cy="160" rx="250" ry="88" fill="#5a3b24"/><g stroke="#fff" stroke-width="4" opacity=".15"><path d="M40 150h420"/><path d="M70 180h360"/></g><g><ellipse cx="100" cy="125" rx="58" ry="28" fill="#f0c75e" transform="rotate(-18 100 125)"/><ellipse cx="180" cy="105" rx="55" ry="30" fill="#eaa83d" transform="rotate(20 180 105)"/><ellipse cx="265" cy="130" rx="58" ry="30" fill="#efc65d" transform="rotate(-12 265 130)"/><ellipse cx="355" cy="108" rx="60" ry="31" fill="#dca63b" transform="rotate(17 355 108)"/><circle cx="120" cy="175" r="38" fill="#65b96b"/><circle cx="210" cy="170" r="34" fill="#3b9d57"/><circle cx="300" cy="185" r="40" fill="#e95743"/><circle cx="390" cy="170" r="35" fill="#efb33f"/><path d="M75 90c25-30 65-32 88-5-34 18-60 20-88 5Z" fill="#2f9b55"/><path d="M330 75c30-25 67-18 80 10-31 8-55 3-80-10Z" fill="#48a85b"/><path d="M230 75c18-35 58-40 82-15-25 20-48 24-82 15Z" fill="#59b768"/></g></g><g transform="translate(80 125)"><rect width="450" height="360" rx="28" fill="#fff" stroke="#cfe7d8" stroke-width="3"/><text x="35" y="62" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#16324a">What can I make?</text><text x="35" y="102" font-family="Arial,sans-serif" font-size="19" fill="#5d7282">Use the ingredients you already have.</text><g transform="translate(35 140)"><rect width="380" height="58" rx="14" fill="#f7faf8" stroke="#b9ddc7" stroke-width="2"/><text x="20" y="37" font-family="Arial,sans-serif" font-size="18" fill="#71808a">chicken, rice, tomato...</text></g><g transform="translate(35 225)"><rect width="110" height="42" rx="21" fill="#e0f4e7"/><text x="22" y="27" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#16834c">Chicken</text><rect x="125" width="85" height="42" rx="21" fill="#e8f4fb"/><text x="146" y="27" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#1769aa">Rice</text><rect x="225" width="100" height="42" rx="21" fill="#fff0df"/><text x="246" y="27" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#b56816">Tomato</text></g><rect x="35" y="295" width="170" height="45" rx="12" fill="#159b58"/><text x="63" y="324" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="#fff">Find Recipes</text></g></svg>`;
fs.writeFileSync(heroPath, heroSvg, 'utf8');

const heroImage = '<figure class="recipe-hero-visual" style="margin:1.5rem 0 2rem"><img src="/assets/images/recipe-finder-ingredients.svg" width="1200" height="700" loading="eager" fetchpriority="high" decoding="async" alt="Recipe finder by ingredients showing chicken, rice and vegetables you can use to find meal ideas"><figcaption>Find recipe ideas using ingredients you already have.</figcaption></figure>';
if (!html.includes('recipe-finder-ingredients.svg')) {
  const heroMarker = '<section class="tool-workspace" aria-labelledby="recipe-tool-heading">';
  if (html.includes(heroMarker)) html = html.replace(heroMarker, `${heroImage}\n${heroMarker}`);
}

fs.writeFileSync(page, html, 'utf8');
console.log('Recipe Finder SEO and visual enhancements applied.');
