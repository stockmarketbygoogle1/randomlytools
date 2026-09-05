import path from 'path';
import { defineConfig } from 'vite';

const googleAnalyticsId = 'G-8GT6V10ENG';

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
    plugins: [{
      name: 'inject-google-analytics',
      transformIndexHtml() {
        return { tags: [
          { tag: 'script', attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}` }, injectTo: 'head' },
          { tag: 'script', children: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${googleAnalyticsId}');`, injectTo: 'head' },
        ] };
      },
    }],
    resolve: { alias: { '@': path.resolve(__dirname, '.') } },
    server: { port: 3000, host: '0.0.0.0', hmr: process.env.DISABLE_HMR !== 'true', watch: process.env.DISABLE_HMR === 'true' ? null : {} },
  };
});
