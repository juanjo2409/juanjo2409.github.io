// =========================================================
// PORTAFOLIO PROFESIONAL - JUAN JOSÉ MALDONADO NAVARRO
// Vanilla JavaScript: Typewriter, Contadores, Filtros, Modal & Clean Arch
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // -----------------------------------------------------
    // 1. SISTEMA DE TOAST NOTIFICATIONS
    // -----------------------------------------------------
    function showToast(message, icon = "✅") {
        let container = document.getElementById("toastContainer");
        if (!container) {
            container = document.createElement("div");
            container.id = "toastContainer";
            container.className = "toast-container";
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `
            <span style="font-size: 1.2rem;">${icon}</span>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 350);
        }, 3500);
    }

    // -----------------------------------------------------
    // 2. TYPEWRITER EFFECT CREATIVO EN HERO
    // -----------------------------------------------------
    const typewriterElement = document.getElementById("typewriterText");
    if (typewriterElement) {
        const phrases = [
            "Backend .NET & Clean Architecture",
            "APIs RESTful de Alto Rendimiento",
            "Domain-Driven Design (DDD) & SOLID",
            "Full Stack con React & TypeScript",
            "Contenedores Docker & Cloud Deployments"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 85;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2200; // Pausa al completar la frase
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 450;
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // -----------------------------------------------------
    // 3. CONTADORES NUMÉRICOS ANIMADOS EN HERO
    // -----------------------------------------------------
    const counters = document.querySelectorAll(".counter");
    let countersStarted = false;

    function startCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const duration = 1800; // ms
            const step = Math.ceil(target / (duration / 25));

            let count = 0;
            const timer = setInterval(() => {
                count += step;
                if (count >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = count;
                }
            }, 25);
        });
    }

    // Iniciar contadores si están en pantalla
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    startCounters();
                }
            });
        }, { threshold: 0.2 });

        counters.forEach(counter => observer.observe(counter));
    }

    // -----------------------------------------------------
    // 4. FILTRADO INTERACTIVO DE PROYECTOS
    // -----------------------------------------------------
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".portfolio-grid .proyecto-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                    requestAnimationFrame(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    });
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(15px)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 250);
                }
            });
        });
    });

    // -----------------------------------------------------
    // 5. MODAL INTERACTIVO DE ARQUITECTURA DE PROYECTOS
    // -----------------------------------------------------
    const modalData = {
        framerent: {
            title: "FrameRent — Arquitectura y Reglas de Negocio (.NET)",
            badge: "Clean Architecture & Docker",
            repo: "https://github.com/juanjo2409/FrameRent",
            body: `
                <p><strong>FrameRent</strong> es un sistema full-stack desarrollado bajo estrictos principios de arquitectura de software para alquiler de equipo audiovisual:</p>
                <h4>🏛️ Arquitectura en 4 Capas</h4>
                <ul>
                    <li><strong>Domain:</strong> Entidad central <code>Rental</code> gobernada por máquina de estados finitos (<code>Pending</code>, <code>Approved</code>, <code>Delivered</code>, <code>Returned</code>), cálculo automático de mora diaria <code>LateFee</code> y objetos de valor inmutables.</li>
                    <li><strong>Application:</strong> Casos de uso orquestados, validación de traslapes temporales y contratos DTO.</li>
                    <li><strong>Infrastructure:</strong> Entity Framework Core con consultas LINQ optimizadas (<code>AsNoTracking</code>), persistencia en PostgreSQL y contenedores Docker Compose.</li>
                    <li><strong>Presentation:</strong> ASP.NET Core Web API securizada con JWT Bearer + cliente MVC consumiendo la API mediante <code>HttpClient</code> tipado.</li>
                </ul>
                <h4>⚡ Invariantes Clave</h4>
                <p>Nadie puede alquilar un ítem sin validación previa contra traslapes de fechas, y existe una restricción de máximo 15 días y hasta 3 alquileres activos simultáneos por cliente.</p>
            `
        },
        skillhub: {
            title: "SkillHub — Gestión Académica & Domain-Driven Design (.NET 10)",
            badge: ".NET 10 & DDD",
            repo: "https://github.com/juanjo2409/SkillHub",
            body: `
                <p><strong>SkillHub</strong> es una plataforma diseñada para resolver la complejidad operativa de centros de formación y talleres especializados:</p>
                <h4>🏛️ Enfoque de Dominio (DDD)</h4>
                <ul>
                    <li><strong>Control de Cupos:</strong> Prevención atómica de sobre-inscripciones en talleres con concurrencia.</li>
                    <li><strong>Detección de Conflictos:</strong> Algoritmo de verificación de solapamiento de horarios entre talleres matriculados por un mismo participante.</li>
                    <li><strong>Ingeniería Documental:</strong> Ingesta y parseo masivo de registros de participantes desde hojas de cálculo Excel utilizando <strong>EPPlus</strong>.</li>
                    <li><strong>Emisión de Certificados:</strong> Generación programática de diplomas académicos en formato PDF con diseño vectorial mediante <strong>QuestPDF</strong>.</li>
                    <li><strong>Documentación Viva:</strong> Integración de <strong>Scalar</strong> para exploración interactiva de OpenAPI.</li>
                </ul>
            `
        },
        psicobitacoras: {
            title: "PsicoBitácoras — Plataforma en Producción (daleunclick.online)",
            badge: "React + Node.js en Producción",
            repo: "https://github.com/juanjo2409/psicobitacoras",
            body: `
                <p><strong>PsicoBitácoras</strong> es una solución full-stack construida para terapeutas y pacientes, actualmente operando en producción con usuarios reales:</p>
                <h4>🌐 Stack y Despliegue en Producción</h4>
                <ul>
                    <li><strong>Frontend SPA:</strong> Desarrollado con <strong>React (Vite)</strong> y estilizado con la última especificación de <strong>Tailwind CSS v4</strong> para una carga instantánea y fluidez en móviles.</li>
                    <li><strong>Backend API:</strong> Servicios modulares RESTful construidos sobre <strong>Node.js</strong> y <strong>Express.js</strong>.</li>
                    <li><strong>Persistencia de Datos:</strong> Modelado relacional en <strong>MySQL</strong> protegiendo la privacidad de notas clínicas y bitácoras de pacientes.</li>
                    <li><strong>Agendamiento:</strong> Módulo de reservas y confirmación de citas terapéuticas en tiempo real.</li>
                </ul>
                <p>🔗 <strong>Demo en Vivo:</strong> <a href="https://www.daleunclick.online" target="_blank" rel="noopener noreferrer" style="color: #2563eb; font-weight: 700;">https://www.daleunclick.online ↗</a></p>
            `
        }
    };

    const projectModal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBadge = document.getElementById("modalBadge");
    const modalBody = document.getElementById("modalBody");
    const modalRepoLink = document.getElementById("modalRepoLink");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalCloseFooterBtn = document.getElementById("modalCloseFooterBtn");

    function openModal(projectKey) {
        const data = modalData[projectKey];
        if (!data || !projectModal) return;

        modalTitle.textContent = data.title;
        modalBadge.textContent = data.badge;
        modalBody.innerHTML = data.body;
        modalRepoLink.href = data.repo;

        projectModal.classList.add("is-open");
        projectModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!projectModal) return;
        projectModal.classList.remove("is-open");
        projectModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    document.querySelectorAll(".js-open-modal").forEach(button => {
        button.addEventListener("click", () => {
            const projectKey = button.getAttribute("data-project");
            openModal(projectKey);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    if (modalCloseFooterBtn) modalCloseFooterBtn.addEventListener("click", closeModal);

    if (projectModal) {
        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) closeModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal && projectModal.classList.contains("is-open")) {
            closeModal();
        }
    });

    // -----------------------------------------------------
    // 6. EXPLORADOR INTERACTIVO DE CLEAN ARCHITECTURE
    // -----------------------------------------------------
    const archLayerData = {
        domain: {
            title: "Capa Domain (Núcleo Puro)",
            rule: "Regla: Cero dependencias externas",
            desc: "Contiene las entidades esenciales de negocio con máquinas de estado, Value Objects inmutables y reglas de validación sin acoplamiento a bases de datos ni frameworks web.",
            folders: [
                "📁 Entities/ (User.cs, Rental.cs, Workshop.cs)",
                "📁 ValueObjects/ (Email.cs, Money.cs, DateRange.cs)",
                "📁 Exceptions/ (DomainRuleValidationException.cs)",
                "📁 Enums/ (RentalStatus.cs, EnrollmentState.cs)"
            ],
            principles: ["⚡ SOLID", "⚡ Inmutabilidad", "⚡ DDD Puro", "⚡ Cero Acoplamiento"]
        },
        application: {
            title: "Capa Application (Casos de Uso & Orquestación)",
            rule: "Regla: Solo referencia a Domain",
            desc: "Orquesta el flujo de información de los casos de uso. Declara interfaces de abstracción (repositorios, tokens, reportes) sin conocer los detalles de infraestructura.",
            folders: [
                "📁 Interfaces/ (IUserRepository.cs, IRentalRepository.cs, IUnitOfWork.cs)",
                "📁 DTOs/ (CreateRentalRequestDto.cs, WorkshopSummaryResponse.cs)",
                "📁 UseCases/ (RegisterParticipantUseCase.cs, ReturnEquipmentHandler.cs)",
                "📁 Common/ (Result<T>.cs, ErrorCatalog.cs)"
            ],
            principles: ["⚡ Inversión de Dependencias (DIP)", "⚡ Single Responsibility", "⚡ Result Pattern", "⚡ DTOs Tipados"]
        },
        infrastructure: {
            title: "Capa Infrastructure (Persistencia, Datos & Adaptadores)",
            rule: "Regla: Implementa las interfaces de Application",
            desc: "Donde reside el código concreto: Entity Framework Core sobre PostgreSQL/SQL Server, generación de PDFs con QuestPDF, lectura Excel con EPPlus y servicios de Azure.",
            folders: [
                "📁 Persistence/ (AppDbContext.cs, Configurations/FluentApi/)",
                "📁 Repositories/ (EfRentalRepository.cs, EfWorkshopRepository.cs)",
                "📁 Reports/ (QuestPdfCertificateGenerator.cs, EpPlusExcelReader.cs)",
                "📁 Security/ (JwtTokenGenerator.cs, IdentityService.cs)"
            ],
            principles: ["⚡ Repository Pattern", "⚡ Entity Framework Core", "⚡ PostgreSQL / SQL Server", "⚡ QuestPDF & EPPlus"]
        },
        presentation: {
            title: "Capa Presentation / API (.NET 10 Web API)",
            rule: "Regla: Punto de Entrada HTTP & Middleware",
            desc: "Controladores delgados (Thin Controllers) que delegan la lógica a Application. Gestiona la autenticación JWT, políticas CORS, documentación OpenAPI (Scalar) y manejo global de excepciones RFC 7807.",
            folders: [
                "📁 Controllers/ (RentalsController.cs, WorkshopsController.cs, AuthController.cs)",
                "📁 Middlewares/ (GlobalExceptionHandlerMiddleware.cs)",
                "📁 Extensions/ (ServiceCollectionExtensions.cs)",
                "📄 Program.cs (Dependency Injection Container, JWT Bearer, Scalar UI)"
            ],
            principles: ["⚡ ASP.NET Core Web API", "⚡ JWT Authentication & RBAC", "⚡ Scalar / Swagger OpenAPI", "⚡ Global Error Handling"]
        }
    };

    const layerPills = document.querySelectorAll(".layer-pill");
    const archDisplayTitle = document.getElementById("archDisplayTitle");
    const archDisplayRule = document.getElementById("archDisplayRule");
    const archDisplayDesc = document.getElementById("archDisplayDesc");
    const archDisplayFolders = document.getElementById("archDisplayFolders");
    const archDisplayPrinciples = document.getElementById("archDisplayPrinciples");

    function updateArch(layerKey) {
        const item = archLayerData[layerKey];
        if (!item) return;

        if (archDisplayTitle) archDisplayTitle.textContent = item.title;
        if (archDisplayRule) archDisplayRule.textContent = item.rule;
        if (archDisplayDesc) archDisplayDesc.textContent = item.desc;

        if (archDisplayFolders) {
            archDisplayFolders.innerHTML = item.folders.map(f => `<li>${f}</li>`).join("");
        }

        if (archDisplayPrinciples) {
            archDisplayPrinciples.innerHTML = item.principles.map(p => `<span>${p}</span>`).join(" ");
        }
    }

    layerPills.forEach(pill => {
        pill.addEventListener("click", () => {
            layerPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            const layerKey = pill.getAttribute("data-layer");
            updateArch(layerKey);
        });
    });

    // -----------------------------------------------------
    // 7. FORMULARIO DE CONTACTO FUNCIONAL CON TOAST
    // -----------------------------------------------------
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const nameInput = document.getElementById("contactName");
            const emailInput = document.getElementById("contactEmail");
            const messageInput = document.getElementById("contactMessage");

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            if (!name || !email || !message) {
                showToast("Por favor completa todos los campos del formulario.", "⚠️");
                return;
            }

            // Simulación de envío exitoso
            showToast(`¡Muchas gracias ${name}! Tu mensaje ha sido registrado exitosamente.`, "🚀");
            contactForm.reset();
        });
    }

    // -----------------------------------------------------
    // 8. BOTÓN VOLVER ARRIBA
    // -----------------------------------------------------
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
