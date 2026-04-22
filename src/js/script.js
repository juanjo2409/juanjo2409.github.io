// Mensaje inicial
alert("Bienvenido a mi portafolio 🚀");

// Cambiar texto
const btn = document.getElementById("btn");
const texto = document.getElementById("texto");

btn.addEventListener("click", () => {
    texto.textContent = "Gracias por visitar mi portafolio 💻";
});