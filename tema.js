const boton = document.getElementById("btn-tema");

if (localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("dark-mode");
    boton.textContent = "☀️ Modo claro";
}

boton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("tema", "oscuro");
        boton.textContent = "☀️ Modo claro";
    } else {
        localStorage.setItem("tema", "claro");
        boton.textContent = "🌙 Modo oscuro";
    }
});

const listaEstudios = document.getElementById("lista-estudios");
const formularioEstudio = document.getElementById("form-estudio");
const inputTitulo = document.getElementById("titulo-estudio");
const inputCentro = document.getElementById("centro-estudio");
const inputPeriodo = document.getElementById("periodo-estudio");

const estudiosIniciales = [
    {
        titulo: "Grado Superior – Desarrollo de Aplicaciones Multiplataforma (DAM)",
        centro: "IES Gregorio Prieto, Valdepeñas (Ciudad Real)",
        periodo: "septiembre 2025 – actualidad"
    },
    {
        titulo: "Grado Medio – Sistemas Microinformáticos y Redes (SMR)",
        centro: "IES Modesto Navarro, La Solana (Ciudad Real)",
        periodo: "septiembre 2023 – junio 2025"
    }
];

let estudios = cargarEstudios();

function cargarEstudios() {
    const estudiosGuardados = localStorage.getItem("estudios");

    if (estudiosGuardados !== null) {
        return JSON.parse(estudiosGuardados);
    }

    return estudiosIniciales;
}

function guardarEstudios() {
    localStorage.setItem("estudios", JSON.stringify(estudios));
}

function crearParrafo(nombre, valor) {
    const parrafo = document.createElement("p");
    const textoNegrita = document.createElement("strong");

    textoNegrita.textContent = nombre;
    parrafo.appendChild(textoNegrita);
    parrafo.appendChild(document.createTextNode(" " + valor));

    return parrafo;
}

function crearEstudio(estudio) {
    const articulo = document.createElement("article");

    const titulo = document.createElement("h3");
    titulo.textContent = estudio.titulo;

    const centro = crearParrafo("Centro:", estudio.centro);
    const periodo = crearParrafo("Periodo:", estudio.periodo);

    articulo.appendChild(titulo);
    articulo.appendChild(centro);
    articulo.appendChild(periodo);

    return articulo;
}

function pintarEstudios() {
    listaEstudios.textContent = "";

    for (let i = 0; i < estudios.length; i++) {
        listaEstudios.appendChild(crearEstudio(estudios[i]));
    }
}

formularioEstudio.addEventListener("submit", function (event) {
    event.preventDefault();

    const nuevoEstudio = {
        titulo: inputTitulo.value,
        centro: inputCentro.value,
        periodo: inputPeriodo.value
    };

    estudios.push(nuevoEstudio);
    guardarEstudios();
    pintarEstudios();
    formularioEstudio.reset();
});

pintarEstudios();
