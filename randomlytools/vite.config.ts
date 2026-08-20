import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          randomNameGenerator: path.resolve(__dirname, 'random-name-generator/index.html'),
          randomNumberPicker: path.resolve(__dirname, 'random-number-picker/index.html'),
          randomDogNameGenerator: path.resolve(__dirname, 'random-dog-name-generator/index.html'),
          randomDiscordNameGenerator: path.resolve(__dirname, 'random-discord-name-generator/index.html'),
          randomShopNameGenerator: path.resolve(__dirname, 'random-shop-name-generator/index.html'),
          randomRestaurantNameGenerator: path.resolve(__dirname, 'random-restaurant-name-generator/index.html'),
          randomJapaneseNameGenerator: path.resolve(__dirname, 'random-japanese-name-generator/index.html'),
          randomInstagramUsernameGenerator: path.resolve(__dirname, 'random-instagram-username-generator/index.html'),
          randomCoffeeShopNameGenerator: path.resolve(__dirname, 'random-coffee-shop-name-generator/index.html'),
          randomCompanyBrandNameGenerator: path.resolve(__dirname, 'random-company-brand-name-generator/index.html'),
          about: path.resolve(__dirname, 'about/index.html'),
          contact: path.resolve(__dirname, 'contact/index.html'),
          privacyPolicy: path.resolve(__dirname, 'privacy-policy/index.html'),
          terms: path.resolve(__dirname, 'terms/index.html'),
          disclaimer: path.resolve(__dirname, 'disclaimer/index.html'),
        },
      },
    },

    plugins: [
      {
        name: 'copy-seo-files',
        closeBundle() {
          fs.copyFileSync(
            path.resolve(__dirname, 'robots.txt'),
            path.resolve(__dirname, 'dist/robots.txt')
          );

          fs.copyFileSync(
            path.resolve(__dirname, 'sitemap.xml'),
            path.resolve(__dirname, 'dist/sitemap.xml')
          );
        },
      },
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
