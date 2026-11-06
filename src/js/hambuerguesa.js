// =========================================================
// MENÚ MÓVIL Y SCROLL - juanjo2409
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navLinks = document.getElementById("navLinks");
    const navOverlay = document.getElementById("navOverlay");
    const navItems = document.querySelectorAll(".nav-item");

    function toggleMenu() {
        if (!hamburgerBtn || !navLinks) return;
        const isOpen = navLinks.classList.contains("is-active");
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        hamburgerBtn.classList.add("is-active");
        navLinks.classList.add("is-active");
        if (navOverlay) navOverlay.classList.add("is-active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        hamburgerBtn.classList.remove("is-active");
        navLinks.classList.remove("is-active");
        if (navOverlay) navOverlay.classList.remove("is-active");
        document.body.style.overflow = "";
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", toggleMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener("click", closeMenu);
    }

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            closeMenu();
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

    // Sombra del header en scroll
    const header = document.getElementById("siteHeader");
    window.addEventListener("scroll", () => {
        if (!header) return;
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }, { passive: true });
});
