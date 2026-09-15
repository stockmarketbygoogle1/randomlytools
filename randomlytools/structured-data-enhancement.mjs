import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const pagePath = path.join(root, 'dist', 'gta-6-download-time-calculator', 'index.html');

if (!fs.existsSync(pagePath)) {
  throw new Error(`GTA 6 page missing from build output: ${pagePath}`);
}

let html = fs.readFileSync(pagePath, 'utf8');
const pattern = /<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i;

if (!pattern.test(html)) {
  throw new Error('No JSON-LD block found on the GTA 6 page.');
}

// Replace the generated GTA 6 graph with three independent, explicitly valid
// JSON-LD blocks. The previous graph was rejected by the build-time JSON parser
// even though the source HTML looked correct, so do not parse or mutate the
// existing graph. This change is limited to structured data; calculator HTML,
// JavaScript, styling and visible content remain untouched.
const webApplication = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'GTA 6 Download Time Calculator',
  url: 'https://randomlytools.in/gta-6-download-time-calculator/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description: 'Free GTA 6 download time calculator for estimating download duration from game size and internet speed.'
};

const breadcrumbList = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://randomlytools.in/'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'GTA 6 Download Time Calculator',
      item: 'https://randomlytools.in/gta-6-download-time-calculator/'
    }
  ]
};

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long will GTA 6 take to download?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GTA 6 download time depends on the final file size and your effective download speed. Use the calculator with an editable size assumption and your internet speed.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the GTA 6 download size?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rockstar Games has not officially published the final GTA 6 download size. Online figures are estimates until an official figure is provided.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long does 150 GB take to download at 100 Mbps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Using decimal 150 GB, 100 Mbps and 80 percent connection efficiency, the estimated download time is about 4 hours 10 minutes.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long does GTA 6 take to download at 1 Gbps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a 150 GB decimal example at 1 Gbps and 80 percent efficiency, the estimated download time is about 25 minutes.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I calculate GTA 6 download time for 200 GB?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Enter 200 GB or use the 200 GB preset, then enter your actual internet speed and choose a realistic connection efficiency.'
      }
    }
  ]
};

const replacement = [webApplication, breadcrumbList, faqPage]
  .map(schema => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
  .join('\n');

html = html.replace(pattern, replacement);

// Final parser check: validate every JSON-LD block emitted by this enhancement.
const outputPattern = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
const blocks = [...html.matchAll(outputPattern)];
if (blocks.length !== 3) {
  throw new Error(`Expected 3 GTA 6 JSON-LD blocks after normalization, found ${blocks.length}.`);
}

for (const match of blocks) {
  try {
    JSON.parse(match[1].trim());
  } catch (error) {
    throw new Error(`Generated GTA 6 JSON-LD is invalid: ${error.message}`);
  }
}

fs.writeFileSync(pagePath, html, 'utf8');
console.log('GTA 6 structured data replaced with three independently validated JSON-LD blocks.');
