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
});
