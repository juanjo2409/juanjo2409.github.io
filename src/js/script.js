// =========================================================
// SCRIPT PRINCIPAL - juanjo2409
// Animaciones creativas, rotación de roles y scroll suave
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // -----------------------------------------------------
    // 1. ROTACIÓN DINÁMICA DE ROLES EN HERO
    // -----------------------------------------------------
    const roleElement = document.getElementById("typingRole");
    if (roleElement) {
        const roles = [
            "Backend .NET & Full Stack Developer",
            "Clean Architecture & DDD",
            "APIs RESTful con C# y PostgreSQL",
            "Full Stack con React & TypeScript",
            "Docker & Despliegues en la Nube"
        ];
        let roleIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let speed = 90;

        function typeLoop() {
            const current = roles[roleIdx];

            if (isDeleting) {
                roleElement.textContent = current.substring(0, charIdx - 1);
                charIdx--;
                speed = 35;
            } else {
                roleElement.textContent = current.substring(0, charIdx + 1);
                charIdx++;
                speed = 80;
            }

            if (!isDeleting && charIdx === current.length) {
                speed = 2400; // Pausa al completar la frase
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                speed = 400;
            }

            setTimeout(typeLoop, speed);
        }

        typeLoop();
    }

    // -----------------------------------------------------
    // 2. ACTUALIZACIÓN AUTOMÁTICA DEL NAV SEGÚN SCROLL
    // -----------------------------------------------------
    const sections = document.querySelectorAll("section[id], footer[id]");
    const navItems = document.querySelectorAll(".nav-item");

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            const href = item.getAttribute("href");
            if (href === `#${current}`) {
                item.classList.add("active");
            }
        });
    }, { passive: true });
});
