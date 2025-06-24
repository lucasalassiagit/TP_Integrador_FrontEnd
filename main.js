//    PAGINA ESTADISTICAS
async function paisesMasPoblados() {
  try {
    // 1. Obtener referencias a los elementos del DOM
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    if (!cuerpoTabla) return; // Si no existe la tabla, salir

    // 2. Crear contenedor para cards si no existe (versión móvil)
    let contenedorCards = document.getElementById("contenedorCards");
    if (!contenedorCards) {
      contenedorCards = document.createElement("div");
      contenedorCards.id = "contenedorCards";
      contenedorCards.className = "row d-md-none";
      document.body.appendChild(contenedorCards);
    }

    let contador = 1;

    // 3. Hacer petición a la API de países
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=translations,capital,continents,population"
    );

    if (!response.ok) {
      throw new Error("Error al cargar los paises");
    }

    // 4. Procesar la respuesta
    const data = await response.json();

    // 5. Ordenar países por población (de mayor a menor)
    const ordenPoblacion = data.sort((a, b) => b.population - a.population);

    // 6. Tomar solo los 10 primeros
    const ArrayPaises = ordenPoblacion.slice(0, 10);

    // 7. Crear filas de tabla y cards para cada país
    ArrayPaises.forEach((pais) => {
      // Crear fila para la tabla (versión desktop)
      const fila = document.createElement("tr");
      fila.innerHTML = `
      <th scope="row">${contador}</th>
      <td>${pais.translations.spa.common}</td>  
      <td>${pais.capital}</td>
      <td>${pais.continents}</td>
      <td>${pais.population.toLocaleString()}</td>
      `;
      contador++;
      cuerpoTabla.appendChild(fila);

      // Crear card para versión móvil
      const card = document.createElement("div");
      card.innerHTML = `
    <div class="card text-bg-secondary mb-2">
      <div class="card-body">
        <h5 class="card-title">${pais.translations.spa.common}</h5>
        <p class="card-text"><b>Capital: </b> ${pais.capital}</p>
        <p class="card-text"><b>Continente: </b> ${pais.continents}</p>
        <p class="card-text"><b>Poblacion:</b> ${pais.population.toLocaleString()}</p>
      </div>
    </div>`;
      contenedorCards.appendChild(card);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

function paginaPaises() {
  // Solo ejecutar si estamos en la página de estadísticas
  if (document.getElementById("cuerpoTabla")) {
    document.addEventListener("DOMContentLoaded", paisesMasPoblados);
  }
}

paginaPaises();

//        PAGINA REGISTRO

// Funciones para mostrar/ocultar errores
function showError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}Error`);
  const inputElement = document.getElementById(fieldId);

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    errorElement.style.color = "#dc3545";
    errorElement.style.fontSize = "0.875rem";
    errorElement.style.marginTop = "0.25rem";
  }

  if (inputElement) {
    inputElement.style.borderColor = "#dc3545";
  }
}

function borrarErrores() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((error) => {
    error.textContent = "";
    error.style.display = "none";
  });

  // Restaura bordes de los inputs
  const inputs = document.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.style.borderColor = "";
  });
}

// Funciones de validación para cada campo

function validarNombre() {
  const nombre = document.getElementById("nombre").value.trim();
  const errorElement = document.getElementById("nombreError");

  if (nombre === "") {
    showError("nombre", "El nombre es obligatorio");
    return false;
  }

  if (nombre.length < 3) {
    showError("nombre", "Mínimo 3 caracteres");
    return false;
  }

  return true;
}

function validarEmail() {
  const email = document.getElementById("email").value.trim();
  const errorElement = document.getElementById("emailError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // (regex) no lleva paréntesis porque no es una función, sino un literal de expresión regular en JavaScript.

  if (email === "") {
    showError("email", "El email es obligatorio");
    return false;
  }

  if (!emailRegex.test(email)) {
    showError("email", "Email no válido");
    return false;
  }

  return true;
}

function validarTelefono() {
  const telefono = document.getElementById("telefono").value.trim();
  const errorElement = document.getElementById("telefonoError");
  const telefonoRegex = /^\d{8,15}$/;

  if (telefono === "") {
    showError("telefono", "El teléfono es obligatorio");
    return false;
  }

  if (!telefonoRegex.test(telefono)) {
    showError("telefono", "8-15 dígitos numéricos");
    return false;
  }

  return true;
}

function validarFecha() {
  const fechaInput = document.getElementById("fecha");
  const fecha = fechaInput.value;
  const errorElement = document.getElementById("fechaError");
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fecha === "") {
    showError("fecha", "La fecha es obligatoria");
    return false;
  }

  const fechaNac = new Date(fecha);

  if (fechaNac > hoy) {
    showError("fecha", "Fecha no puede ser futura");
    return false;
  }

  if (hoy.getFullYear() - fechaNac.getFullYear() < 17) {
    showError("fecha", "Debe ser mayor de 18 años");
    return false;
  }

  return true;
}

function validarTerminos() {
  const terminos = document.getElementById("terminos");
  const errorElement = document.getElementById("terminosError");

  if (!terminos.checked) {
    showError("terminos", "Debes aceptar los términos");
    return false;
  }

  return true;
}

function formularioRegistro() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    borrarErrores();

    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const telefonoValido = validarTelefono();
    const fechaValida = validarFecha();
    const terminosValido = validarTerminos();

    const toastEl = document.getElementById("myToast");
    const toastMessage = document.getElementById("toastMessage");
    const toast = new bootstrap.Toast(toastEl);

    // Si todo es válido, muestra toast de éxito
    if (
      nombreValido &&
      emailValido &&
      telefonoValido &&
      fechaValida &&
      terminosValido
    ) {
      const toastEl = document.getElementById("Toast");
      const toast = new bootstrap.Toast(toastEl);

      toastEl.classList.add("bg-success");

      toast.show();

      setTimeout(() => {
        toast.hide();
      }, 4000);

      form.reset();
    }
  });
}

// Inicializacion
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("contactForm")) {
    formularioRegistro();
  }
});
