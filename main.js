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
      const div = document.createElement("div");
      const img = document.createElement("img");
      const nombre = document.createElement("p");

      nombre.textContent = `Pais: ${pais.name.common}`;

      img.src = pais.flags.png;
      img.alt = `Bandera de ${pais.name.common}`;
      img.className = "img-fluid m-2";

      div.appendChild(nombre);
      div.appendChild(img);

      div.className = "card p-3 m-2 text-center";

      cont.appendChild(div);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}*/
