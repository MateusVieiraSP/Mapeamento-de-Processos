// routes.js

// Objeto de mapeamento de páginas para URLs
const routes = {
    formulario: '/src/pages/formulario.html',
    mapeamento: '/src/pages/mapeamento.html'
};

function navigateTo(page) {
    const url = routes[page];
    
    if (url) {
        // Redireciona para a página correspondente
        window.location.assign(`${window.location.origin}${url}`);
    } else {
        console.error('Página não encontrada:', page);
    }
}

// Tornar `navigateTo` acessível globalmente
window.navigateTo = navigateTo;
