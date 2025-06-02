//Index
const cuerpoTabla = document.getElementById("cuerpoTabla");
const cardsMovil = document.getElementById("cardsContainer");

paisesMasPoblados(cuerpoTabla, cardsMovil);

async function paisesMasPoblados(tabla, cards) {
  try {
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
      tabla.appendChild(fila);

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
      cards.appendChild(card);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

//Pagina formulario
document
  .getElementById("formContacto")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Resetear validaciones
    document
      .querySelectorAll(".is-invalid")
      .forEach((el) => el.classList.remove("is-invalid"));

    // Validar Nombre (mínimo 3 caracteres)
    const nombre = document.getElementById("nombre");
    if (nombre.value.trim().length < 3) {
      nombre.classList.add("is-invalid");
      isValid = false;
    }

    // Validar Email
    const email = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      email.classList.add("is-invalid");
      isValid = false;
    }

    // Validar Teléfono (formato internacional)
    const telefono = document.getElementById("telefono");
    const telRegex = /^\+?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{4,8}$/;
    if (!telRegex.test(telefono.value)) {
      telefono.classList.add("is-invalid");
      isValid = false;
    }

    // Validar Fecha
    const fecha = document.getElementById("fecha");
    if (!fecha.value) {
      fecha.classList.add("is-invalid");
      isValid = false;
    }

    // Validar Select
    const consulta = document.getElementById("consulta");
    if (!consulta.value) {
      consulta.classList.add("is-invalid");
      isValid = false;
    }

    // Validar Mensaje (mínimo 10 caracteres)
    const mensaje = document.getElementById("mensaje");
    if (mensaje.value.trim().length < 10) {
      mensaje.classList.add("is-invalid");
      isValid = false;
    }

    // Validar Checkbox
    const terminos = document.getElementById("terminos");
    if (!terminos.checked) {
      terminos.classList.add("is-invalid");
      isValid = false;
    }

    // Si todo es válido
    if (isValid) {
      // Simular envío (en un proyecto real sería un fetch/AJAX)
      alert("Formulario enviado correctamente");
      this.reset();
    } else {
      // Mostrar mensaje general de error
      const firstInvalid = document.querySelector(".is-invalid");
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

// Validación en tiempo real para campos
document
  .querySelectorAll(
    "#formContacto input, #formContacto textarea, #formContacto select"
  )
  .forEach((input) => {
    input.addEventListener("input", function () {
      if (this.classList.contains("is-invalid")) {
        this.classList.remove("is-invalid");
      }
    });
  });

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
