// =========================================================
// PORTAFOLIO PROFESIONAL - JUAN JOSÉ MALDONADO
// Vanilla JavaScript: Interactividad, Stack Dinámico & Blueprint
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
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        `;

        container.appendChild(toast);

        // Animar entrada
        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        // Desvanecer y remover después de 3.5 segundos
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
    // 2. TABS INTERACTIVOS DEL CORE STACK
    // -----------------------------------------------------
    const stackTabBtns = document.querySelectorAll(".stack-tab-btn");
    const stackPanels = document.querySelectorAll(".stack-panel");

    stackTabBtns.forEach(button => {
        button.addEventListener("click", () => {
            const targetPanelId = button.getAttribute("data-tab");

            stackTabBtns.forEach(btn => btn.classList.remove("active"));
            stackPanels.forEach(panel => panel.classList.remove("active"));

            button.classList.add("active");
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.classList.add("active");
            }
        });
    });

    // -----------------------------------------------------
    // 3. EXPLORADOR INTERACTIVO DE CLEAN ARCHITECTURE
    // -----------------------------------------------------
    const archLayerData = {
        domain: {
            title: "Capa Domain (Núcleo de Negocio Puro)",
            rule: "Regla: Cero dependencias externas",
            desc: "Representa el núcleo inviolable del sistema. Contiene entidades puras, objetos de valor y reglas de negocio. No hace referencia a frameworks web, Entity Framework ni bases de datos.",
            folders: [
                { name: "Entities/", note: "Modelos puros con estado y comportamiento (e.g. User, Account, Order)" },
                { name: "ValueObjects/", note: "Objetos inmutables tipados para validación (e.g. Email, Money, Address)" },
                { name: "Exceptions/", note: "Excepciones específicas del dominio (e.g. DomainRuleValidationException)" },
                { name: "Errors/", note: "Catálogos estructurados de errores de negocio para evitar excepciones costosas" }
            ],
            principles: ["SOLID", "Domain-Driven Design (DDD)", "Pureza Lógica", "Inmutabilidad"]
        },
        application: {
            title: "Capa Application (Orquestación & Casos de Uso)",
            rule: "Regla: Solo depende de Domain",
            desc: "Define los casos de uso del sistema. Orquesta cómo los datos fluyen hacia y desde las entidades. Declara interfaces de repositorios y servicios sin conocer cómo se implementan.",
            folders: [
                { name: "Interfaces/", note: "Contratos de abstracción (e.g. IUserRepository, IUnitOfWork, IJwtProvider)" },
                { name: "DTOs/", note: "Contratos de entrada y respuesta serializables para los clientes" },
                { name: "Features/", note: "Casos de uso estructurados por Commands y Queries con validaciones" },
                { name: "Common/", note: "Patrón Result<T>, utilidades de mapeo y comportamiento de pipelines" }
            ],
            principles: ["Inversión de Dependencias (DIP)", "Single Responsibility (SRP)", "Abstracción Pura", "Manejo de Errores Result Pattern"]
        },
        infrastructure: {
            title: "Capa Infrastructure (Persistencia, Azure & Servicios)",
            rule: "Regla: Implementa las interfaces de Application",
            desc: "Contiene todas las implementaciones concretas de acceso a datos y comunicación externa. Aquí reside EF Core, PostgreSQL, la integración con Azure (App Services, Key Vault, Blob Storage) y generación de tokens JWT.",
            folders: [
                { name: "Data/AppDbContext.cs", note: "Configuración de Entity Framework Core y Fluent API con PostgreSQL" },
                { name: "Repositories/", note: "Implementación del Repository Pattern (e.g. EfUserRepository : IUserRepository)" },
                { name: "Authentication/", note: "ASP.NET Core Identity, JWT Bearer Token Generator y hash seguro" },
                { name: "Cloud/Azure/", note: "Clientes de Azure Blob Storage, Azure Key Vault y configuraciones de nube" }
            ],
            principles: ["Repository Pattern", "Entity Framework Core", "PostgreSQL", "Microsoft Azure Cloud", "JWT Security"]
        },
        presentation: {
            title: "Capa Presentation / Web API (.NET 8/9)",
            rule: "Regla: Punto de entrada HTTP y Pipeline",
            desc: "Expone la funcionalidad del sistema al exterior mediante controladores ASP.NET Core Web API o Minimal APIs. Maneja la deserialización, autenticación por cabeceras HTTP, CORS, Swagger y el middleware global.",
            folders: [
                { name: "Controllers/", note: "Controladores delgados que delegan a Application (Thin Controllers)" },
                { name: "Middlewares/", note: "GlobalExceptionHandlerMiddleware para respuestas estandarizadas RFC 7807" },
                { name: "Extensions/", note: "Métodos de extensión para registrar servicios en el contenedor IoC" },
                { name: "Program.cs", note: "Punto de entrada de .NET 8/9, inyección de dependencias y pipeline HTTP" }
            ],
            principles: ["ASP.NET Core Web API", "Minimal APIs / Thin Controllers", "Dependency Injection Nativa", "Swagger / OpenAPI"]
        }
    };

    const archButtons = document.querySelectorAll(".arch-layer-btn");
    const displayTitle = document.getElementById("archDisplayTitle");
    const displayRule = document.getElementById("archDisplayRule");
    const displayDesc = document.getElementById("archDisplayDesc");
    const displayFolders = document.getElementById("archDisplayFolders");
    const displayPrinciples = document.getElementById("archDisplayPrinciples");

    function updateArchDisplay(layerKey) {
        const data = archLayerData[layerKey];
        if (!data) return;

        if (displayTitle) displayTitle.textContent = data.title;
        if (displayRule) displayRule.textContent = data.rule;
        if (displayDesc) displayDesc.textContent = data.desc;

        if (displayFolders) {
            displayFolders.innerHTML = data.folders.map(item => `
                <li class="arch-folder-item">
                    <span class="arch-folder-name">📁 ${item.name}</span>
                    <span class="arch-folder-note">→ ${item.note}</span>
                </li>
            `).join("");
        }

        if (displayPrinciples) {
            displayPrinciples.innerHTML = data.principles.map(item => `
                <span class="stack-pill">⚡ ${item}</span>
            `).join("");
        }
    }

    archButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const layerKey = btn.getAttribute("data-layer");
            archButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            updateArchDisplay(layerKey);
        });
    });

    // -----------------------------------------------------
    // 4. VISOR DE BLUEPRINTS DE CÓDIGO (VANILLA JS)
    // -----------------------------------------------------
    const codeSnippets = {
        solution: `// Solución: CleanArchitecture.sln (.NET 8/9)
// Separación estricta de responsabilidades en 4 proyectos desacoplados

CleanArchitecture/
├── 📁 src/
│   ├── 📁 1. Domain/                     [Sin dependencias externas]
│   │   ├── 📁 Entities/                  (User.cs, Product.cs, AuditEntry.cs)
│   │   ├── 📁 ValueObjects/              (Email.cs, Money.cs, PasswordHash.cs)
│   │   ├── 📁 Exceptions/                (DomainValidationException.cs)
│   │   └── 📁 Errors/                    (UserErrors.cs, ProductErrors.cs)
│   │
│   ├── 📁 2. Application/                [Referencia solo a Domain]
│   │   ├── 📁 Common/Interfaces/         (IUserRepository.cs, IJwtTokenGenerator.cs, IUnitOfWork.cs)
│   │   ├── 📁 Common/Models/             (Result.cs, Error.cs)
│   │   ├── 📁 DTOs/                      (UserDto.cs, LoginRequest.cs, AuthResponse.cs)
│   │   └── 📁 Features/Users/            (RegisterUserUseCase.cs, GetUserByIdQuery.cs)
│   │
│   ├── 📁 3. Infrastructure/             [Implementa interfaces de Application]
│   │   ├── 📁 Persistence/               (AppDbContext.cs, Configurations/)
│   │   ├── 📁 Repositories/              (UserRepository.cs : IUserRepository)
│   │   ├── 📁 Authentication/            (JwtTokenGenerator.cs, IdentityConfig.cs)
│   │   └── 📁 Cloud/Azure/               (AzureBlobStorageService.cs, KeyVaultSecretProvider.cs)
│   │
│   └── 📁 4. Presentation.Api/           [ASP.NET Core Web API .NET 8/9]
│       ├── 📁 Controllers/               (UsersController.cs, AuthController.cs)
│       ├── 📁 Middlewares/               (GlobalExceptionHandlingMiddleware.cs)
│       └── 📄 Program.cs                 (Inyección de Dependencias, JWT Bearer, Swagger)
└── 📁 tests/                             (Domain.Tests, Application.Tests, Api.IntegrationTests)`,

        repository: `// Capa: Infrastructure / Repositories / UserRepository.cs
// Patrón: Repository Pattern con Entity Framework Core 8/9 & PostgreSQL

namespace CleanArchitecture.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
    }

    public async Task<User?> GetByEmailAsync(Email email, CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Email.Value == email.Value, cancellationToken);
    }

    public async Task AddAsync(User user, CancellationToken cancellationToken = default)
    {
        await _context.Users.AddAsync(user, cancellationToken);
    }

    public void Update(User user)
    {
        _context.Users.Update(user);
    }
}`,

        auth: `// Capa: Presentation / Controllers / AuthController.cs
// Autenticación segura con ASP.NET Core Identity & JWT Tokens

namespace CleanArchitecture.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken ct)
    {
        Result<AuthResponse> result = await _authService.AuthenticateAsync(request.Email, request.Password, ct);

        if (result.IsFailure)
        {
            return Unauthorized(new { error = result.Error.Description });
        }

        return Ok(result.Value);
    }
}`,

        angular: `// Frontend: user-management.service.ts (Angular 17+ / 18)
// Tipado estricto en TypeScript, RxJS Observables, Signals y Servicios Modulares

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = \`\${environment.apiUrl}/api/v1/users\`;

  // Angular Signals para estado reactivo instantáneo
  readonly activeUsers = signal<UserResponse[]>([]);
  readonly isLoading = signal<boolean>(false);

  loadUsers(): Observable<UserResponse[]> {
    this.isLoading.set(true);
    return this.http.get<UserResponse[]>(this.apiUrl).pipe(
      tap(users => {
        this.activeUsers.set(users);
        this.isLoading.set(false);
      }),
      catchError(error => {
        this.isLoading.set(false);
        return throwError(() => error);
      })
    );
  }
}`
    };

    const codeTabBtns = document.querySelectorAll(".code-tab-btn");
    const codeDisplayElement = document.getElementById("codeSnippetDisplay");
    const copyCodeBtn = document.getElementById("btnCopyCode");

    let currentSnippetKey = "solution";

    function renderSnippet(key) {
        currentSnippetKey = key;
        if (codeDisplayElement && codeSnippets[key]) {
            codeDisplayElement.textContent = codeSnippets[key];
        }
    }

    codeTabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const key = btn.getAttribute("data-code");
            codeTabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderSnippet(key);
        });
    });

    if (copyCodeBtn) {
        copyCodeBtn.addEventListener("click", async () => {
            const textToCopy = codeSnippets[currentSnippetKey];
            if (!textToCopy) return;

            try {
                await navigator.clipboard.writeText(textToCopy);
                showToast("¡Código copiado al portapapeles!", "📋");
                
                const originalHtml = copyCodeBtn.innerHTML;
                copyCodeBtn.innerHTML = `<span>✓</span> Copiado`;
                setTimeout(() => {
                    copyCodeBtn.innerHTML = originalHtml;
                }, 2000);
            } catch (err) {
                showToast("No se pudo copiar automáticamente.", "⚠️");
            }
        });
    }

    // Inicializar visualización de arquitectura y código
    updateArchDisplay("domain");
    renderSnippet("solution");

    // -----------------------------------------------------
    // 5. INTERACCIÓN DE FORMULARIO DE CONTACTO
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

            // Simulación de envío exitoso profesional
            showToast(`¡Gracias ${name}! Tu mensaje ha sido enviado exitosamente.`, "🚀");
            contactForm.reset();
        });
    }

    // -----------------------------------------------------
    // 6. BOTÓN VOLVER ARRIBA
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
