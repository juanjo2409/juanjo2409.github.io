// =========================================================
// MENÚ DE NAVEGACIÓN HAMBURGUESA & RESPONSIVE (VANILLA JS)
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const navBackdrop = document.getElementById("navBackdrop");
    const navLinks = document.querySelectorAll(".nav-link, .nav-cta");

    function toggleMenu() {
        if (!hamburger || !navMenu) return;
        const isOpen = navMenu.classList.contains("is-active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        hamburger.classList.add("is-active");
        navMenu.classList.add("is-active");
        if (navBackdrop) navBackdrop.classList.add("is-active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        hamburger.classList.remove("is-active");
        navMenu.classList.remove("is-active");
        if (navBackdrop) navBackdrop.classList.remove("is-active");
        document.body.style.overflow = "";
    }

    if (hamburger) {
        hamburger.addEventListener("click", toggleMenu);
    }

    if (navBackdrop) {
        navBackdrop.addEventListener("click", closeMenu);
    }

    // Cerrar al hacer clic en cualquier enlace
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu();
        });
    });

    // Cerrar con tecla Escape
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeMenu();
        }
    });

    // Efecto de sombreado del navbar al hacer scroll
    const navbar = document.querySelector(".navbar-container");
    window.addEventListener("scroll", function () {
        if (!navbar) return;
        if (window.scrollY > 25) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }, { passive: true });
});
