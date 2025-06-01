//Empieza buscarPais

/*const boton = document.getElementById("boton");

boton.addEventListener("Onclick", (e) => {
  e.preventDefault(); //para evitar recargar la pagina
  const paisBuscar = document.getElementById("Buscador").value;
  alert(`Pais buscado ${paisBuscar}`);
});*/

//Termina buscarPais
const contenedorPaises = document.getElementById("listado");
const contenedorBanderas = document.getElementById("cont-galeria");

paisesMasPoblados(contenedorPaises);

async function paisesMasPoblados(cont) {
  try {
    // Hacemos la solicitud HTTP (GET)

    const response = await fetch("https://restcountries.com/v3.1/all");

    // Verificamos si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error("Error al cargar los paises");
    }

    // Convertimos la respuesta en JSON
    const data = await response.json(); //En JavaScript, los datos JSON se manejan directamente como objetos. Data es el objeto completo.

    // Ordenar por población (de mayor a menor)
    const ordenPoblacion = data.sort((a, b) => b.population - a.population);

    // Tomar los 15 primeros
    const ArrayPaises = ordenPoblacion.slice(0, 20);

    ArrayPaises.forEach((pais) => {
      const div = document.createElement("div");
      div.classList.add("col-6", "col-sm-6", "col-md-4", "col-lg-3");

      //Languaje lo convierto con Object. ya que el lenguaje tiene diferentes claves
      const lenguajeNativo = Object.values(pais.languages); //Object.values es una funcion que me genera un array de valores
      const lengNativo = lenguajeNativo[0];

      //En esta Api para cada idioma y nombre hay dos formas: official y common
      div.innerHTML = `
        <div class="card h-90"> 
            <img src=${
              pais.flags.png
            } class="card-img-top img-fluid object-fit-cover border border-black""
              alt="${pais.name.common}">
            <div class="card-body">
              <h5 class="card-title text-center">${
                pais.translations.spa.common
              }</h5> 
              <p class="card-text"> <strong>Capital:</strong> ${
                pais.capital
              }</p>
              <p class="card-text"> <strong>Continente:</strong> ${
                pais.continents
              } </p>
              <p class="card-text"> <strong>Lenguaje nativo:</strong> ${lengNativo}</p>
              <p class="card-text"> <strong>Poblacion:</strong> ${pais.population.toLocaleString()}</p>
            </div>
        </div>
      `;
      cont.appendChild(div);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

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

const campoBuscar = document.getElementById("Buscador");
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
}
