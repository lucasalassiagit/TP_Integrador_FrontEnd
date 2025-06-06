//Index
async function paisesMasPoblados() {
  try {
    // 1. Verificar si estamos en la página correcta
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    if (!cuerpoTabla) return; // Salir si no estamos en la página de países

    // 2. Configurar contenedores
    let cardsContainer = document.getElementById("cardsContainer");
    if (!cardsContainer) {
      cardsContainer = document.createElement("div");
      cardsContainer.id = "cardsContainer";
      cardsContainer.className = "row d-md-none"; // Solo visible en móviles
      document.body.appendChild(cardsContainer);
    }

    // Hacemos la solicitud HTTP (GET)
    let contador = 1;
    const response = await fetch("https://restcountries.com/v3.1/all");

    // Verificamos si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error("Error al cargar los paises");
    }

    // Convertimos la respuesta en JSON
    const data = await response.json(); //En JavaScript, los datos JSON se manejan directamente como objetos. Data es el objeto completo.

    // Ordenar por población (de mayor a menor)
    const ordenPoblacion = data.sort((a, b) => b.population - a.population);

    // Tomar los 20 primeros
    const ArrayPaises = ordenPoblacion.slice(0, 10);

    ArrayPaises.forEach((pais) => {
      //Tabla solo para desktop
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

      // En moviles desaparece la tabla y se convierte en tablas
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
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Verificar si debemos ejecutar esta función en la página actual
function initPaisesPage() {
  // Solo ejecutar si estamos en la página que tiene la tabla
  if (document.getElementById("cuerpoTabla")) {
    document.addEventListener("DOMContentLoaded", paisesMasPoblados);
  }
}

// Llamar a la función de inicialización
initPaisesPage();

//Pagina formulario

/*async function obtenerBanderas(cont) {
  try {
    // Hacemos la solicitud HTTP (GET)

    const response = await fetch("https://restcountries.com/v3.1/all");

    // Verificamos si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error("Error al cargar los paises");
    }

    // Convertimos la respuesta en JSON
    const data = await response.json(); //En JavaScript, los datos JSON se manejan directamente como objetos. Data es el objeto completo.
    const ArrayPaises = data.slice(3, 15); //Elijo la cantidad de elementos a mostrar

    ArrayPaises.forEach((pais) => {
      

      cont.appendChild(div);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}*/

//Pagina buscar pais

/*const campoBuscar = document.getElementById("Buscador");
const botonBuscar = document.getElementById("botonBuscar");

botonBuscar.addEventListener("click", (e) => {
  e.preventDefault(); // Evita que la página se recargue
  //Llamamos a funcion buscar pais
  buscarPais(campoBuscar.value);
});

async function buscarPais(paisIngresado) {
  try {
    // Hacemos la solicitud HTTP (GET)

    const response = await fetch(
      `https://restcountries.com/v3.1/name/${paisIngresado}`
    );

    // Verificamos si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error al buscar el pais ${paisIngresado}`);
    }

    // Convertimos la respuesta en JSON
    const data = await response.json(); //En JavaScript, los datos JSON se manejan directamente como objetos. Data es el objeto completo.

    //Mandamos los datos del pais a la funcion informacionPais()

    informacionPais(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function informacionPais(datosPais) {
  const contenedorTexto = document.getElementById("cont-texto-sobre-pais");
  contenedorTexto.innerHTML = `
      <h2>${datosPais[0].name.common}</h2>
      <img src="${datosPais[0].flags.png}" alt="Bandera de ${
    datosPais[0].name.common
  }" width="100">
      
      <p class="mt-3"> 
        El nombre oficial del país es: <strong>${
          datosPais[0].translations.spa?.official || pais.name.official
        }</strong>.
        Su capital es <strong>${
          datosPais[0].capital?.[0] || "No disponible"
        }</strong>, 
        está ubicado en <strong>${datosPais[0].region}</strong> 
        y su población es de <strong>${datosPais[0].population.toLocaleString()} habitantes</strong>.
        ${
          datosPais[0].independent
            ? "Es un país independiente."
            : "No es un país independiente."
        }
      </p>

      <p>
        Idioma(s): ${
          Object.values(datosPais[0].languages || {}).join(", ") ||
          "No disponible"
        }<br>
        Moneda: ${
          Object.values(datosPais[0].currencies || {})
            .map((c) => c.name)
            .join(", ") || "No disponible"
        } (${
    Object.values(datosPais[0].currencies || {})
      .map((c) => c.symbol)
      .join(", ") || "—"
  })
      </p>
    `;
}*/

//Registro

// Funciones de validación (helper functions)
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

function clearErrors() {
  // Limpiar mensajes de error
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((error) => {
    error.textContent = "";
    error.style.display = "none";
  });

  // Restaurar estilos de los inputs
  const inputs = document.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.style.borderColor = "";
  });
}

// Funciones de validación de campos
function validateNombre() {
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

function validateEmail() {
  const email = document.getElementById("email").value.trim();
  const errorElement = document.getElementById("emailError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function validateTelefono() {
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

function validateFecha() {
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

  if (hoy - fechaNac < 17) {
    showError("fecha", "Debe ser mayor de 18 años");
    return false;
  }

  return true;
}

function validateTerminos() {
  const terminos = document.getElementById("terminos");
  const errorElement = document.getElementById("terminosError");

  if (!terminos.checked) {
    showError("terminos", "Debes aceptar los términos");
    return false;
  }

  return true;
}

// Función principal de registro
function initRegistro() {
  const form = document.getElementById("contactForm");
  if (!form) return; // Si no existe el formulario, salir

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Limpiar errores previos
    clearErrors();

    // Validar campos
    const isNombreValid = validateNombre();
    const isEmailValid = validateEmail();
    const isTelefonoValid = validateTelefono();
    const isFechaValid = validateFecha();
    const isTerminosValid = validateTerminos();

    //Creo instancia de toast (notificacion)
    const toastEl = document.getElementById("myToast");
    const toastMessage = document.getElementById("toastMessage");
    const toast = new bootstrap.Toast(toastEl);

    // Si todo es válido, enviar formulario
    if (
      isNombreValid &&
      isEmailValid &&
      isTelefonoValid &&
      isFechaValid &&
      isTerminosValid
    ) {
      form.reset();
      toastEl.classList.add("bg-success");
      toast.show();
    }
  });

  // Validación en tiempo real (opcional)
  /*document.getElementById("nombre").addEventListener("blur", validateNombre);
  document.getElementById("email").addEventListener("blur", validateEmail);
  document
    .getElementById("telefono")
    .addEventListener("blur", validateTelefono);
  document.getElementById("fecha").addEventListener("change", validateFecha);
  document.getElementById("terminos").addEventListener("change", function () {
    if (this.checked) {
      document.getElementById("terminosError").textContent = "";
    }
  });*/
}

// Inicializar solo si estamos en la página correcta
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("contactForm")) {
    initRegistro();
  }
});
