const contenedorPaises = document.getElementById("listado");
const contenedorBanderas = document.getElementById("cont-galeria");

obtenerPaises(contenedorPaises);
obtenerBanderas(contenedorBanderas);

async function obtenerPaises(cont) {
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
      div.classList.add("card", "mb-3");
      //Languaje lo convierto con Object. ya que el lenguaje tiene diferentes claves
      const lenguajeNativo = Object.values(pais.languages); //Object.values es una funcion que me genera un array de valores
      const lengNativo = lenguajeNativo[0];

      //En esta Api para cada idioma y nombre hay dos formas: official y common
      div.innerHTML = `
        <div class="card-body">
            <h3 class="card-title">${pais.name.common}</h3> 
            <p class="text-muted"> Capital: ${pais.capital}</p>
            <p class="text-muted"> Continente: ${pais.continents} </p>
            <p class="text-muted"> Lenguaje nativo: ${lengNativo}</p>
        </div>
      `;
      cont.appendChild(div);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function obtenerBanderas(cont) {
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
}
