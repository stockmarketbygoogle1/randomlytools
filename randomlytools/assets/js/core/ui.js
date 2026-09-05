/**
 * Core UI Handlers: Mobile Menu, Quick Filter, Active States
 */

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  const filterInput = document.getElementById('tool-search');
  if (filterInput) {
    const toolCards = document.querySelectorAll('.tool-card');
    filterInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      let visibleCount = 0;
      toolCards.forEach(card => {
        const title = card.querySelector('.tool-card-title')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('.tool-card-desc')?.textContent.toLowerCase() || '';
        const badge = card.querySelector('.tool-card-badge')?.textContent.toLowerCase() || '';
        const matches = title.includes(query) || desc.includes(query) || badge.includes(query);
        card.style.display = matches ? 'flex' : 'none';
        if (matches) visibleCount++;
      });
      const noResults = document.getElementById('no-tools-found');
      if (noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  }

  // Related Guides on article pages. These links point only to existing article routes.
  const article = document.querySelector('.article-content');
  const footer = document.querySelector('.site-footer');
  const path = window.location.pathname.replace(/\/$/, '');

  const relatedGuides = {
    '/articles/how-to-calculate-attendance-percentage': [
      ['/articles/how-to-use-a-random-number-picker/', 'How to Use a Random Number Picker'],
      ['/articles/how-to-randomly-split-people-into-teams/', 'How to Randomly Split People Into Teams']
    ],
    '/articles/how-to-randomly-split-people-into-teams': [
      ['/articles/how-to-randomly-assign-people-to-groups/', 'How to Randomly Assign People to Groups'],
      ['/articles/random-team-generator-for-sports/', 'Random Team Generator for Sports']
    ],
    '/articles/creative-ways-to-use-a-random-country-generator': [
      ['/articles/how-to-randomly-split-people-into-teams/', 'How to Randomly Split People Into Teams'],
      ['/articles/how-to-use-a-random-number-picker/', 'How to Use a Random Number Picker']
    ],
    '/articles/how-to-use-a-random-number-picker': [
      ['/articles/random-number-generator-vs-random-number-picker/', 'Random Number Generator vs Random Number Picker'],
      ['/articles/how-to-generate-random-numbers-without-repeats/', 'How to Generate Random Numbers Without Repeats']
    ],
    '/articles/random-username-ideas-for-gaming': [
      ['/articles/instagram-username-ideas/', 'Instagram Username Ideas'],
      ['/articles/how-to-choose-a-business-name/', 'How to Choose a Business Name']
    ],
    '/articles/how-to-choose-a-business-name': [
      ['/articles/how-to-choose-a-shop-name/', 'How to Choose a Shop Name'],
      ['/articles/coffee-shop-name-ideas/', 'Coffee Shop Name Ideas']
    ],
    '/articles/how-to-pick-a-random-name-from-a-list': [
      ['/articles/random-name-generator-for-classroom-activities/', 'Random Name Generator for Classroom Activities'],
      ['/articles/how-to-randomly-assign-people-to-groups/', 'How to Randomly Assign People to Groups']
    ],
    '/articles/random-name-generator-for-classroom-activities': [
      ['/articles/how-to-pick-a-random-name-from-a-list/', 'How to Pick a Random Name From a List'],
      ['/articles/how-to-randomly-assign-people-to-groups/', 'How to Randomly Assign People to Groups']
    ],
    '/articles/how-to-randomly-assign-people-to-groups': [
      ['/articles/how-to-randomly-split-people-into-teams/', 'How to Randomly Split People Into Teams'],
      ['/articles/random-team-generator-for-sports/', 'Random Team Generator for Sports']
    ],
    '/articles/random-number-generator-vs-random-number-picker': [
      ['/articles/how-to-use-a-random-number-picker/', 'How to Use a Random Number Picker'],
      ['/articles/how-to-generate-random-numbers-without-repeats/', 'How to Generate Random Numbers Without Repeats']
    ],
    '/articles/how-to-generate-random-numbers-without-repeats': [
      ['/articles/random-number-generator-vs-random-number-picker/', 'Random Number Generator vs Random Number Picker'],
      ['/articles/how-to-use-a-random-number-picker/', 'How to Use a Random Number Picker']
    ],
    '/articles/random-team-generator-for-sports': [
      ['/articles/how-to-randomly-split-people-into-teams/', 'How to Randomly Split People Into Teams'],
      ['/articles/how-to-randomly-assign-people-to-groups/', 'How to Randomly Assign People to Groups']
    ],
    '/articles/how-to-choose-a-shop-name': [
      ['/articles/how-to-choose-a-business-name/', 'How to Choose a Business Name'],
      ['/articles/coffee-shop-name-ideas/', 'Coffee Shop Name Ideas']
    ],
    '/articles/coffee-shop-name-ideas': [
      ['/random-coffee-shop-name-generator/', 'Random Coffee Shop Name Generator'],
      ['/articles/how-to-choose-a-shop-name/', 'How to Choose a Shop Name']
    ],
    '/articles/restaurant-name-ideas': [
      ['/random-restaurant-name-generator/', 'Random Restaurant Name Generator'],
      ['/articles/how-to-choose-a-shop-name/', 'How to Choose a Shop Name']
    ],
    '/articles/instagram-username-ideas': [
      ['/random-instagram-username-generator/', 'Random Instagram Username Generator'],
      ['/articles/random-username-ideas-for-gaming/', 'Gaming Username Ideas']
    ]
  };

  const guides = relatedGuides[path];
  if (article && footer && guides && !article.querySelector('.related-guides')) {
    const section = document.createElement('section');
    section.className = 'related-guides';
    section.innerHTML = '<h2>Related Guides</h2><p>Continue exploring related RandomlyTools guides:</p>' +
      '<ul>' + guides.map(([href, title]) => `<li><a href="${href}">${title}</a></li>`).join('') + '</ul>';
    article.appendChild(section);
  }
});
