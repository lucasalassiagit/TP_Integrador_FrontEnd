//Index
/*const cuerpoTabla = document.getElementById("cuerpoTabla");
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
}*/

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

    // 3. Hacer la solicitud a la API
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error("Error al cargar los países");

    // 4. Procesar los datos
    const data = await response.json();
    const paisesOrdenados = data
      .sort((a, b) => b.population - a.population)
      .slice(0, 10);

    // 5. Limpiar contenedores
    cuerpoTabla.innerHTML = "";
    cardsContainer.innerHTML = "";

    // 6. Crear elementos para cada país
    paisesOrdenados.forEach((pais, index) => {
      const numero = index + 1;

      // Fila de tabla para desktop
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <th scope="row">${numero}</th>
        <td>${pais.translations?.spa?.common || pais.name.common}</td>
        <td>${pais.capital?.[0] || "N/A"}</td>
        <td>${pais.continents?.[0] || "N/A"}</td>
        <td>${pais.population?.toLocaleString() || "N/A"}</td>
      `;
      cuerpoTabla.appendChild(fila);

      // Tarjeta para móviles
      const card = document.createElement("div");
      card.className = "col-12 mb-3";
      card.innerHTML = `
        <div class="card text-bg-dark border-white">
          <div class="card-header">
            <h5 class="card-title">${numero}. ${
        pais.translations?.spa?.common || pais.name.common
      }</h5>
          </div>
          <div class="card-body">
            <p class="card-text"><strong>Capital:</strong> ${
              pais.capital?.[0] || "N/A"
            }</p>
            <p class="card-text"><strong>Continente:</strong> ${
              pais.continents?.[0] || "N/A"
            }</p>
            <p class="card-text"><strong>Población:</strong> ${
              pais.population?.toLocaleString() || "N/A"
            }</p>
            ${
              pais.flags?.png
                ? `<img src="${pais.flags.png}" alt="Bandera" class="img-fluid mt-2" style="max-height: 100px;">`
                : ""
            }
          </div>
        </div>
      `;
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error en paisesMasPoblados:", error);
    // Mostrar error solo en la página correcta
    if (document.getElementById("cuerpoTabla")) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "alert alert-danger mt-3";
      errorDiv.textContent = `Error al cargar los datos: ${error.message}`;
      document.body.prepend(errorDiv);
    }
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

// Registro
