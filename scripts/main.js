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
      container.innerHTML = data; // Cargar el contenido en el contenedor
    })
    .catch(error => {
      console.error(error);
      container.innerHTML = `<p>Error al cargar el contenido.</p>`;
    });
}

// Cargar encabezado, pie de página y contenido inicial al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  loadContent('header.html', 'header-container'); // Cargar header
  loadContent('footer.html', 'footer-container'); // Cargar footer
  loadContent('inicio.html', 'main-content'); // Cargar contenido inicial

  // Capturar clics en enlaces con data-load
  document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.tagName === 'A' && target.dataset.load) {
      event.preventDefault(); // Evitar que el navegador cargue la página completa
      const url = target.getAttribute('href'); // Obtener la URL
      loadContent(url, 'main-content'); // Cargar el contenido en el contenedor principal
    }
  });
});
