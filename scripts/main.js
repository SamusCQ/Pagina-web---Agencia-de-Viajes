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
      if (url === 'contacto.html') { 
        assignFormValidation(); // Asignar validación si el formulario está cargado
      }
    })
    .catch(error => {
      console.error(error);
      container.innerHTML = `<p>Error al cargar el contenido.</p>`;
    });
}

// Función para asignar la validación del formulario
function assignFormValidation() {
  const form = document.getElementById("formContacto");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensajeError = document.getElementById("mensajeError");

      if (!nombre) {
        mensajeError.textContent = "El campo Nombre no puede estar vacío.";
        mensajeError.style.display = "block";
        return;
      }

      if (!email) {
        mensajeError.textContent = "El campo Correo Electrónico no puede estar vacío.";
        mensajeError.style.display = "block";
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mensajeError.textContent = "El Correo Electrónico no tiene un formato válido.";
        mensajeError.style.display = "block";
        return;
      }

      mensajeError.style.display = "none";
      alert("Formulario enviado con éxito.");
    });
  }
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

    if (target.tagName === 'A' && target.hasAttribute('data-load')) {
      event.preventDefault();
      const url = target.getAttribute('href');
      loadContent(url, 'main-content');
    }
  });
});
