/**
 * @file script.js
 * @description Lógica principal para a página riegos.dev, incluindo controle de dropdowns,
 * carregamento dinâmico de projetos e interatividade do menu.
 */

document.addEventListener("DOMContentLoaded", function () {
  /**
   * Gerencia todos os menus dropdown da página.
   * Fecha um menu quando outro é aberto ou quando o usuário clica fora.
   */
  const manageDropdowns = () => {
    const dropdowns = [
      {
        buttonId: "daniel-menu-button",
        menuId: "daniel-menu",
      },
      {
        buttonId: "tiago-menu-button",
        menuId: "tiago-menu",
      },
      {
        buttonId: "sitemap-menu-button",
        menuId: "sitemap-menu",
      },
    ];

    dropdowns.forEach((d) => {
      const button = document.getElementById(d.buttonId);
      const menu = document.getElementById(d.menuId);

      if (!button || !menu) {
        console.warn(`Dropdown not found: ${d.buttonId}`);
        return;
      }

      button.addEventListener("click", (event) => {
        event.stopPropagation();
        // Fecha todos os outros menus antes de abrir o atual
        dropdowns.forEach((other_d) => {
          if (d.menuId !== other_d.menuId) {
            document.getElementById(other_d.menuId)?.classList.add("hidden");
          }
        });
        // Alterna a visibilidade do menu clicado
        menu.classList.toggle("hidden");
      });
    });

    // Fecha todos os menus ao clicar em qualquer lugar do documento
    document.addEventListener("click", () => {
      dropdowns.forEach((d) => {
        document.getElementById(d.menuId)?.classList.add("hidden");
      });
    });
    
    // Fecha todos os menus ao pressionar a tecla 'Escape'
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            dropdowns.forEach((d) => {
                document.getElementById(d.menuId)?.classList.add("hidden");
            });
        }
    });
  };

  /**
   * Carrega os cards de projeto a partir de um arquivo JSON e os insere na página.
   */
  const loadProjectCards = async () => {
    const container = document.getElementById("cards-container");
    if (!container) return;

    try {
      const response = await fetch("card-content.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const cardsData = await response.json();

      container.innerHTML = ""; // Limpa o container

      cardsData.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = "project-card";

        const linksHTML = card.links
          .map(
            (link) =>
              `<a href="${link.href}" target="_blank">${link.text}</a>`
          )
          .join("");

        cardElement.innerHTML = `
          <div class="card-content">
            <h2>${card.title}</h2>
            <p>${card.description}</p>
            <p class="stacks"><strong>• Stacks:</strong> ${card.stacks}</p>
          </div>
          <div class="links">
            ${linksHTML}
          </div>
        `;
        container.appendChild(cardElement);
      });
    } catch (error) {
      console.error("Erro ao carregar os cards:", error);
      container.innerHTML = `<p class="text-red-400 text-center col-span-full">Não foi possível carregar os projetos. Tente novamente mais tarde.</p>`;
    }
  };
  
  /**
   * NOVA FEATURE: Adiciona o efeito "UpComing..." nos links do menu Site Map.
   */
  const setupUpcomingFeature = () => {
    const siteMapMenu = document.getElementById("sitemap-menu");
    if (!siteMapMenu) return;

    const links = siteMapMenu.querySelectorAll("a");

    links.forEach(link => {
      const originalText = link.innerText;

      // Evento quando o mouse entra no link (onmouseover)
      link.addEventListener("mouseover", () => {
        link.innerText = "UpComing...";
      });

      // Evento quando o mouse sai do link (onmouseout)
      link.addEventListener("mouseout", () => {
        link.innerText = originalText;
      });
    });
  };

  // --- INICIALIZAÇÃO DAS FUNÇÕES ---
  manageDropdowns();
  loadProjectCards();
  setupUpcomingFeature();
});