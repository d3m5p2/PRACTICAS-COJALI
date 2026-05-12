var boton = document.getElementById("btn-tema");

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
