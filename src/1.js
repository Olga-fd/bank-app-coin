window.addEventListener('popstate', async function (event) {
  // console.log("location: " + location.href + ", state: " + JSON.stringify(event.state));
  //history.pushState({page: 1}, "title 1", `${window.location.search}`);
  if (new URLSearchParams(window.location.search).get('episode_id')) {
    document.querySelector('body').innerHTML = '';
    render();
  } else {
    document.querySelector('body').innerHTML = '';
    let { renderPage } = await import('./main.js');
    renderPage(
      './catalog.js',
      'https://swapi.dev/api/films/',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css',
      'styles.css'
    );
  }
});
