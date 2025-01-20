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
      container.innerHTML = data; // Insertar contenido dinámico
    })
    .catch(error => {
      console.error(error);
      container.innerHTML = `<p>Error al cargar el contenido.</p>`;
    });
}

// Escuchar eventos cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  // Cargar encabezado, pie de página y contenido inicial
  loadContent('header.html', 'header-container');
  loadContent('footer.html', 'footer-container');
  loadContent('inicio.html', 'main-content');

  // Interceptar clics en enlaces con atributo data-load
  document.addEventListener('click', (event) => {
    const target = event.target;

    // Verificar si el elemento es un enlace y tiene el atributo data-load
    if (target.tagName === 'A' && target.hasAttribute('data-load')) {
      event.preventDefault(); // Prevenir la navegación por defecto
      const url = target.getAttribute('href'); // Obtener la URL del enlace
      loadContent(url, 'main-content'); // Cargar contenido dinámicamente
    }
  });
});
