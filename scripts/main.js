// Función para cargar contenido dinámico
function loadContent(url, containerId) {
  const container = document.getElementById(containerId);
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar ${url}: ${response.statusText}`);
      }
      return response.text();
    })
    .then(data => {
      container.innerHTML = data;
    })
    .catch(error => {
      console.error(error);
      container.innerHTML = `<p>Error al cargar el contenido.</p>`;
    });
}

// Cargar el header dinámicamente
loadContent('header.html', 'header-container');

// Cargar el footer dinámicamente (si tienes uno)
loadContent('footer.html', 'footer-container');
