// ==========================
// Alternância de Tema (Modo Claro / Escuro)
// ==========================

// Torna a função global para funcionar com onclick no HTML
window.alternarTema = function () {
  document.body.classList.toggle('darkmode');
  const temaAtual = document.body.classList.contains('darkmode') ? 'dark' : 'light';
  localStorage.setItem('tema', temaAtual);
};

// ==========================
// Sidebar (Links de Navegação)
// ==========================

function setActiveLink(links, index) {
  links.forEach(link => link.classList.remove('active'));
  if (index >= 0 && index < links.length) {
    links[index].classList.add('active');
  }
}

function inicializarSidebar() {
  const sidebarLinks = document.querySelectorAll('.sidebar nav ul li a');
  const pathname = window.location.pathname;
  let currentIndex = -1;

  // Marca o link ativo com base na URL da página
  sidebarLinks.forEach((link, index) => {
    const href = link.getAttribute('href');
    const isHome = pathname === '/' || pathname.includes('index.html');

    if ((isHome && index === 0) || pathname.includes(href)) {
      setActiveLink(sidebarLinks, index);
      currentIndex = index;
    }

    // Marca o link clicado
    link.addEventListener('click', () => {
      setActiveLink(sidebarLinks, index);
      currentIndex = index;
    });
  });

  // Atalhos do teclado numérico (1 a 9)
  document.addEventListener('keydown', (event) => {
    const keyPressed = parseInt(event.key);
    const elementoFocado = document.activeElement.tagName;
    const estaEditandoTexto = ['INPUT', 'TEXTAREA'].includes(elementoFocado);

    if (!isNaN(keyPressed) && keyPressed > 0 && keyPressed <= sidebarLinks.length && !estaEditandoTexto) {
      sidebarLinks[keyPressed - 1].click();
    }
  });
}

// ==========================
// Inicialização
// ==========================

document.addEventListener('DOMContentLoaded', () => {
  inicializarSidebar();

  // Atalho do teclado para alternar tema (tecla 5)
  document.addEventListener('keydown', (event) => {
    const elementoFocado = document.activeElement.tagName;
    const estaEditandoTexto = ['INPUT', 'TEXTAREA'].includes(elementoFocado);

    if (event.key === '5' && !estaEditandoTexto) {
      alternarTema();
    }
  });
});

  document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('mensagem');

    function autoResizeTextarea(el) {
      el.style.height = 'auto'; // Redefine a altura
      el.style.height = (el.scrollHeight) + 'px'; // Define a altura com base no conteúdo
    }

    if (textarea) {
      textarea.addEventListener('input', function () {
        autoResizeTextarea(this);
      });

      // Ajusta a altura ao carregar a página, se já houver conteúdo
      autoResizeTextarea(textarea);
    }
  });