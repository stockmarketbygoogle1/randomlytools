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

// The Recipe Finder hero image is managed by recipe-image-enhancement.mjs.
// Keep SEO enhancement focused on metadata/content so it cannot add a duplicate hero image.

fs.writeFileSync(page, html, 'utf8');
console.log('Recipe Finder SEO enhancements applied.');