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

const usuarioGithub = "d3m5p2";
const githubPerfil = document.getElementById("github-perfil");
const githubRepos = document.getElementById("github-repos");

async function cargarGithub() {
    try {
        const respuestaPerfil = await fetch("https://api.github.com/users/" + usuarioGithub);

        if (!respuestaPerfil.ok) {
            throw new Error("No se pudo cargar el perfil de GitHub");
        }

        const perfil = await respuestaPerfil.json();
        pintarPerfilGithub(perfil);

        const respuestaRepos = await fetch("https://api.github.com/users/" + usuarioGithub + "/repos?sort=updated&per_page=6");

        if (!respuestaRepos.ok) {
            throw new Error("No se pudieron cargar los repositorios");
        }

        const repositorios = await respuestaRepos.json();
        pintarRepositorios(repositorios);
    } catch (error) {
        githubPerfil.textContent = "No se pudo cargar la información de GitHub.";
        githubRepos.textContent = "";
        console.log(error);
    }
}

function pintarPerfilGithub(perfil) {
    githubPerfil.textContent = "";

    const imagen = document.createElement("img");
    imagen.src = perfil.avatar_url;
    imagen.alt = "Foto de perfil de GitHub";
    imagen.classList.add("github-avatar");

    const cajaInfo = document.createElement("div");
    cajaInfo.classList.add("github-info");

    const nombre = document.createElement("h3");
    nombre.textContent = perfil.name || perfil.login;

    const usuario = document.createElement("p");
    usuario.textContent = "Usuario: @" + perfil.login;

    const reposPublicos = document.createElement("p");
    reposPublicos.textContent = "Repositorios públicos: " + perfil.public_repos;

    const seguidores = document.createElement("p");
    seguidores.textContent = "Seguidores: " + perfil.followers;

    const enlace = document.createElement("a");
    enlace.href = perfil.html_url;
    enlace.textContent = "Ver perfil en GitHub";
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    enlace.classList.add("github-enlace");

    cajaInfo.appendChild(nombre);
    cajaInfo.appendChild(usuario);
    cajaInfo.appendChild(reposPublicos);
    cajaInfo.appendChild(seguidores);
    cajaInfo.appendChild(enlace);

    githubPerfil.appendChild(imagen);
    githubPerfil.appendChild(cajaInfo);
}

function pintarRepositorios(repositorios) {
    githubRepos.textContent = "";

    if (repositorios.length === 0) {
        githubRepos.textContent = "No hay repositorios públicos para mostrar.";
        return;
    }

    for (let i = 0; i < repositorios.length; i++) {
        githubRepos.appendChild(crearRepositorio(repositorios[i]));
    }
}

function crearRepositorio(repositorio) {
    const articulo = document.createElement("article");

    const nombre = document.createElement("h3");
    nombre.textContent = repositorio.name;

    const descripcion = document.createElement("p");
    descripcion.textContent = repositorio.description || "Sin descripción";

    const lenguaje = document.createElement("p");
    lenguaje.textContent = "Lenguaje: " + (repositorio.language || "No indicado");

    const enlace = document.createElement("a");
    enlace.href = repositorio.html_url;
    enlace.textContent = "Ver repositorio";
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";

    articulo.appendChild(nombre);
    articulo.appendChild(descripcion);
    articulo.appendChild(lenguaje);
    articulo.appendChild(enlace);

    return articulo;
}

cargarGithub();
