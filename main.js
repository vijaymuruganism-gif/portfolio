(function() {
  'use strict';

  // Mode Toggle & Theme Controller
  const storageKey = 'user-color-scheme';
  const html = document.documentElement;
  const toggleBtn = document.querySelector('.js-mode-toggle');
  const toggleText = document.querySelector('.js-mode-toggle-text');

  function getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (!theme) {
      theme = localStorage.getItem(storageKey) || getSystemPreference();
    }
    html.setAttribute('data-user-color-scheme', theme);
    if (toggleText) {
      toggleText.textContent = theme === 'dark' ? 'switch to light mode' : 'switch to dark mode';
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const current = html.getAttribute('data-user-color-scheme') || getSystemPreference();
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }

  // Initial theme check
  applyTheme();

  // Listen for system theme changes if user hasn't set explicit preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem(storageKey)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Scale responsiveness
  const app = document.querySelector('.app');
  if (app && window.ResizeObserver) {
    let baseWidth = app.offsetWidth;
    const ro = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (window.innerWidth < 520) {
          app.style.transform = 'scale(1, 1)';
        }
      }
    });
    ro.observe(document.body);
  }
})();