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

//ocultar contenido de cada seccion
function toggleContent(id, button) {
  var element = document.getElementById(id);
  if (element.style.display === "none") {
      element.style.display = "block";
      button.textContent = "Ocultar";
  } else {
      element.style.display = "none";
      button.textContent = "Mostrar";
  }
}

//cambia el color de fondo de las secciones
function changeBackgroundColor(element, color) {
  element.style.backgroundColor = color;
}
// mensaje emergente doble clic
function showAlert(section) {
  alert("Has hecho doble clic en la sección: " + section);
}



// Clic cambia el texto del párrafo
function changeText(element) {
  element.textContent = "¡Gracias por visitarnos! Esperamos que encuentres el destino perfecto para tu próxima aventura.";
}

// Navegación de imágenes
var images = ["Img/viaje.jpeg", "Img/viaje3.jpeg", "Img/viaje4.jpeg","Img/viaje2.jpeg"];
var currentIndex = 0;

// Añadir clases al cambiar de imagen
function showImage(index) {
  const imageElement = document.getElementById("slider-image");
  imageElement.classList.remove("active");
  setTimeout(() => {
    imageElement.src = images[index];
    imageElement.classList.add("active");
  }, 100);
}

function prevImage() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    showImage(currentIndex);
}

function nextImage() {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    showImage(currentIndex);
}

// Cambio automático de imágenes
setInterval(nextImage, 5000); // Cambia la imagen cada 5 segundos


// Cambio de tonos de color
function highlightService(element) {
  const colors = ['#e0f7fa', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  element.style.backgroundColor = randomColor;
}

function unhighlightService(element) {
  element.style.backgroundColor = '';
}

//mostrar diferentes testimonios
const testimonios = [
  "La mejor agencia de viajes con la que he trabajado. ¡Altamente recomendada! - Miguel Nuñez",
  "Viajar con esta agencia fue una experiencia increíble. Todo estuvo perfectamente organizado y superó nuestras expectativas. - Cristian Zambrano",
  "¡Simplemente espectacular! Desde el primer contacto hasta el final del viaje, todo fue manejado de manera profesional y amigable. ¡Altamente recomendados!- Edu Peralta",
  "El servicio al cliente fue excepcional. Nos ayudaron a encontrar el destino perfecto y se aseguraron de que todo estuviera organizado a la perfección. ¡Muy recomendados! - Kleber Vega "
];

// Testimonios con efecto de escritura
function escribirTestimonio(texto, elemento, velocidad = 50) {
  let i = 0;
  elemento.textContent = "";
  const escribir = setInterval(() => {
    if (i < texto.length) {
      elemento.textContent += texto.charAt(i);
      i++;
    } else {
      clearInterval(escribir);
    }
  }, velocidad);
}

let currentTestimonioIndex = 0;

function mostrarTestimonio() {
  const testimonioTexto = document.getElementById("testimonio-texto");
  escribirTestimonio(testimonios[currentTestimonioIndex], testimonioTexto);
  currentTestimonioIndex = (currentTestimonioIndex + 1) % testimonios.length;
}

setInterval(mostrarTestimonio, 2000);

mostrarTestimonio();