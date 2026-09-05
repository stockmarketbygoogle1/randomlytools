/**
 * Core UI Handlers: Mobile Menu, Quick Filter, Active States
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Quick Filter on Homepage
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
      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  }

  // Related Guides on article pages
  const article = document.querySelector('.article-content');
  const footer = document.querySelector('.site-footer');
  const path = window.location.pathname.replace(/\/$/, '');

  const relatedGuides = {
    '/articles/how-to-calculate-attendance-percentage': [
      ['/articles/how-to-use-a-random-number-picker/', 'How to Use a Random Number Picker'],
      ['/articles/how-to-randomly-split-people-into-teams/', 'How to Randomly Split People Into Teams']
    ],
    '/articles/how-to-randomly-split-people-into-teams': [
      ['/articles/how-to-use-a-random-number-picker/', 'How to Use a Random Number Picker'],
      ['/articles/creative-ways-to-use-a-random-country-generator/', 'Creative Ways to Use a Random Country Generator']
    ],
    '/articles/creative-ways-to-use-a-random-country-generator': [
      ['/articles/how-to-randomly-split-people-into-teams/', 'How to Randomly Split People Into Teams'],
      ['/articles/how-to-use-a-random-number-picker/', 'How to Use a Random Number Picker']
    ],
    '/articles/how-to-use-a-random-number-picker': [
      ['/articles/how-to-randomly-split-people-into-teams/', 'How to Randomly Split People Into Teams'],
      ['/articles/how-to-calculate-attendance-percentage/', 'How to Calculate Attendance Percentage']
    ],
    '/articles/random-username-ideas-for-gaming': [
      ['/articles/how-to-choose-a-business-name/', 'How to Choose a Business Name']
    ],
    '/articles/how-to-choose-a-business-name': [
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
