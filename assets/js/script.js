/* Tecqmate site behaviour + small compatibility helpers for the web tools. */
(function () {
  'use strict';

  var STORAGE_KEY = 'tecqmate-theme';

  function systemPrefersDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(choice) {
    var dark = choice === 'dark' || (choice !== 'light' && systemPrefersDark());
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      button.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
      var sun = button.querySelector('[data-theme-icon="sun"]');
      var moon = button.querySelector('[data-theme-icon="moon"]');
      if (sun) sun.classList.toggle('hidden', dark);
      if (moon) moon.classList.toggle('hidden', !dark);
    });

    document.querySelectorAll('[data-theme-choice]').forEach(function (button) {
      var active = button.getAttribute('data-theme-choice') === choice;
      button.classList.toggle('bg-brand-600', active);
      button.classList.toggle('text-white', active);
      button.classList.toggle('dark:text-white', active);
      button.classList.toggle('shadow-sm', active);
      button.classList.toggle('text-slate-500', !active);
      button.classList.toggle('dark:text-slate-400', !active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function currentChoice() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'system';
    } catch (e) {
      return 'system';
    }
  }

  function setTheme(choice) {
    try {
      if (choice === 'system') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, choice);
    } catch (e) {}
    applyTheme(choice);
  }

  applyTheme(currentChoice());

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (currentChoice() === 'system') applyTheme('system');
  });

  document.addEventListener('click', function (event) {
    var copyLink = event.target.closest('[data-copy-link]');
    if (copyLink) {
      var url = copyLink.getAttribute('data-url') || window.location.href;
      navigator.clipboard.writeText(url).then(function () {
        window.siteAlert('Link copied to clipboard!');
      }).catch(function () {
        window.siteAlert('Could not copy the link.');
      });
      return;
    }

    var toggle = event.target.closest('[data-theme-toggle]');
    if (toggle) {
      setTheme(currentChoice() === 'dark' ? 'light' : 'dark');
      return;
    }

    var choice = event.target.closest('[data-theme-choice]');
    if (choice) {
      setTheme(choice.getAttribute('data-theme-choice'));
      return;
    }

    var navToggle = event.target.closest('[data-nav-toggle]');
    if (navToggle) {
      var menu = document.getElementById(navToggle.getAttribute('data-nav-toggle'));
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (menu) {
        menu.classList.toggle('hidden', expanded);
        navToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      }
      return;
    }

    var tab = event.target.closest('[data-tab-target]');
    if (tab) {
      var target = document.querySelector(tab.getAttribute('data-tab-target'));
      if (!target) return;
      var wrapper = tab.closest('[data-tabs]');
      if (wrapper) {
        wrapper.querySelectorAll('[data-tab-target]').forEach(function (button) {
          var selected = button === tab;
          button.classList.toggle('bg-brand-600', selected);
          button.classList.toggle('text-white', selected);
          button.classList.toggle('shadow-sm', selected);
          button.classList.toggle('text-slate-500', !selected);
          button.setAttribute('aria-selected', selected ? 'true' : 'false');
        });
      }
      var panelGroup = target.closest('[data-tab-panels]');
      if (panelGroup) {
        panelGroup.querySelectorAll('[data-tab-panel]').forEach(function (panel) {
          panel.classList.toggle('hidden', panel !== target);
        });
      }
      target.classList.remove('hidden');
    }
  });

  function updateScrollUI() {
    var progress = document.getElementById('reading-progress');
    if (progress) {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      var value = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
      progress.style.width = value + '%';
    }

    var backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      backToTop.classList.toggle('hidden', window.scrollY < 400);
      backToTop.classList.toggle('grid', window.scrollY >= 400);
    }
  }

  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();

  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Give markdown tables a horizontal scroll area on small screens. */
  document.querySelectorAll('.prose-content table').forEach(function (table) {
    if (table.parentElement && table.parentElement.classList.contains('table-scroll')) return;
    var wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  /* Accessible replacement for the old bootbox $.alert() calls. */
  window.siteAlert = function (message) {
    var root = document.getElementById('site-alert-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'site-alert-root';
      document.body.appendChild(root);
    }

    root.innerHTML =
      '<div class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" data-alert-backdrop>' +
        '<div role="alertdialog" aria-modal="true" class="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">' +
          '<p class="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-200"></p>' +
          '<div class="mt-6 flex justify-end">' +
            '<button type="button" class="btn-primary" data-alert-close>Okay</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    root.querySelector('[role="alertdialog"] p').textContent = String(message || 'Something went wrong!');

    function close() {
      root.innerHTML = '';
      document.removeEventListener('keydown', onKey);
    }
    function onKey(event) {
      if (event.key === 'Escape') close();
    }

    root.querySelector('[data-alert-close]').addEventListener('click', close);
    root.querySelector('[data-alert-backdrop]').addEventListener('click', function (event) {
      if (event.target.hasAttribute('data-alert-backdrop')) close();
    });
    document.addEventListener('keydown', onKey);
    root.querySelector('[data-alert-close]').focus();
  };
})();

/* jQuery helpers used by the utility pages. */
$(function () {
  $.extend({
    alert: function (message) {
      window.siteAlert(message);
    },
    esc_url: function (str) {
      var rep = { '!': '%21', '\'': '%27', '(': '%28', ')': '%29', '*': '%2A', '+': '%20' };
      str = encodeURIComponent(str);
      for (var c in rep) {
        if (!Object.prototype.hasOwnProperty.call(rep, c)) continue;
        str = str.split(c).join(rep[c]);
      }
      return str;
    },
    unesc_url: function (inp) {
      var rep = { '!': '%21', '\'': '%27', '(': '%28', ')': '%29', '*': '%2A', '+': '%20' };
      inp = decodeURIComponent(inp);
      for (var c in rep) {
        if (!Object.prototype.hasOwnProperty.call(rep, c)) continue;
        inp = inp.split(rep[c]).join(c);
      }
      return inp;
    }
  });

  $.ajaxSetup({
    cache: false,
    error: function (xhr, status, error) {
      if (window.console) console.warn('Request failed:', status, error);
      $.alert(error || 'Something went wrong!');
    }
  });
});
