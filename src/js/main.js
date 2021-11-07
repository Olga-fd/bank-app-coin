const cssPromises = {};
const body = document.querySelector('body');
const pageParams = new URLSearchParams(window.location.search);

function loadResource(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }

  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  return fetch(src).then((res) => res.json());
}

export function renderPage(moduleName, apiURL, css, cssPrivate) {
  Promise.all(
    [moduleName, apiURL, css, cssPrivate].map((src) => loadResource(src))
  ).then(([pageModule, data]) => {
    body.innerHTML = '';
    pageModule.render(data);
    // body.append(pageModule.render(data));
  });
}

if (pageParams.get('episode_id')) {
  renderPage(
    './article.js',
    'https://swapi.dev/api/films/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css',
    'styles.css'
  );
} else {
  renderPage(
    './catalog.js',
    'https://swapi.dev/api/films/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css',
    'styles.css'
  );
}
