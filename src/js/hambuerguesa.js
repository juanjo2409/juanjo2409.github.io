// MENÚ HAMBURGUESA
const hamburguesa =
document.getElementById("hamburguesa");

const menu =
document.getElementById("menu");

if (hamburguesa && menu) {

hamburguesa.addEventListener("click", function () {

menu.classList.toggle("activo");

});

}