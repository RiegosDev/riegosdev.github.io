document.addEventListener('DOMContentLoaded', function () {
    
    /**
     * Função genérica para controlar a visibilidade de um menu dropdown.
     * @param {string} buttonId - O ID do botão que aciona o dropdown.
     * @param {string} menuId - O ID do menu que será exibido/ocultado.
     * @param {string} containerId - O ID do container que envolve o botão e o menu.
     */
    const setupDropdown = (buttonId, menuId, containerId) => {
        const button = document.getElementById(buttonId);
        const menu = document.getElementById(menuId);
        const container = document.getElementById(containerId);

        if (!button || !menu || !container) {
            console.error(`Dropdown elements not found for: ${containerId}`);
            return;
        }

        // Exibe ou oculta o menu ao clicar no botão
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede que o clique se propague para o document
            // Oculta o outro menu se estiver aberto
            if (containerId === 'daniel-dropdown-container') {
                document.getElementById('tiago-menu').classList.add('hidden');
            } else {
                document.getElementById('daniel-menu').classList.add('hidden');
            }
            menu.classList.toggle('hidden');
        });
    };

    // Configura os dropdowns para Daniel e Tiago
    setupDropdown('daniel-menu-button', 'daniel-menu', 'daniel-dropdown-container');
    setupDropdown('tiago-menu-button', 'tiago-menu', 'tiago-dropdown-container');

    // Oculta os menus se clicar fora deles
    document.addEventListener('click', () => {
        document.getElementById('daniel-menu').classList.add('hidden');
        document.getElementById('tiago-menu').classList.add('hidden');
    });
    
    // Oculta os menus ao pressionar a tecla 'Escape'
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.getElementById('daniel-menu').classList.add('hidden');
            document.getElementById('tiago-menu').classList.add('hidden');
        }
    });

    /**
     * NOVO: Adiciona funcionalidade de "Em desenvolvimento" para o portfólio do Tiago.

    const tiagoPortfolioLink = document.getElementById('tiago-portfolio-link');

    if (tiagoPortfolioLink) {
        const originalText = tiagoPortfolioLink.textContent;
        const devText = 'Em desenvolvimento...';

        tiagoPortfolioLink.addEventListener('click', (event) => {
            event.preventDefault(); // Previne a navegação para '#'
            event.stopPropagation(); // Previne que o menu feche imediatamente

            // Altera o texto apenas se não já estiver alterado
            if (tiagoPortfolioLink.textContent === originalText) {
                tiagoPortfolioLink.textContent = devText;
                // Adiciona uma classe para feedback visual (cor âmbar)
                tiagoPortfolioLink.classList.add('text-amber-400');
                tiagoPortfolioLink.classList.remove('text-slate-300');

                // Reverte o texto após 2.5 segundos
                setTimeout(() => {
                    tiagoPortfolioLink.textContent = originalText;
                    tiagoPortfolioLink.classList.remove('text-amber-400');
                    tiagoPortfolioLink.classList.add('text-slate-300');
                }, 2500);
            }
        });
    }
             */
});
