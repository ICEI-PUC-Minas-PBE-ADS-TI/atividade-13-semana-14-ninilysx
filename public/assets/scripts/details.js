const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function carregarDetalhes() {
    const container = document.getElementById('tela-det');

    if(!id){
        container.innerHTML = `
        <div class="alerta">
        <p>Nenhum produto encontrado!</p>
        </div>`
        return;
    }

    try {
        const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
            method:'GET'
        });

        if(!resposta.ok){
            container.innerHTML = `
        <div class="alerta">
        <p>Produto inexistente!</p>
        </div>`
        return;
        } 

    const produto = await resposta.json();

    document.title = `${produto.nome}`

    container.innerHTML = `
    <div id="image-det">
            <img src="${produto.imagem}" alt="${produto.nome}">
        </div>
        <div id="body-det">
            <h2 class="nome-det">${produto.nome}</h2>
            <span class="preco-det">R$${produto.preco.toFixed(2).replace('.', ',')}</span>
            <p class="categoria-det">${produto.categoria}</p>
            <p class="desc-longa">${produto.descLonga}</p>
            <div id="array-tags">
                ${produto.tags.map(tag => `<p class="tag">${tag}</p>`).join('')}
            </div>
            <div>
                <button onclick="alert('Não é possível comprar este produto no momento!')" class="comprar">Comprar</button>
            </div>
        </div>
        `;
    } catch (error){
            console.error('Erro: ', error)
        }
}

carregarDetalhes();

 function pegarID() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
}

async function carregarComentarios() {

    const idProd = pegarID();

    try{
        const resposta = await fetch('http://localhost:3000/comentarios')
        const comentarios = await resposta.json();

        const comentariosFiltrados = comentarios.filter(c => c.produtoId == idProd);

        const container = document.getElementById('comentarios');
        container.innerHTML = '';

        if (comentariosFiltrados.length === 0 ){
            container.innerHTML = `<p class="aviso-det">Este produto ainda não recebeu avaliações!</p>`;
            return;
        }

        comentariosFiltrados.forEach(comentario => {
        const estrelas = "⚝".repeat(comentario.nota) 

        const card = `
        <div id="coment-individual">
        <div class="header-coment">
            <h4 class="nome-cliente">${comentario.usuario}</h4>
            <span class="nota">${estrelas}</span>
        </div>
            <span class="coment-texto">${comentario.texto}</span>
        </div>
        `
        container.innerHTML += card;
    });
    } catch (error){
        console.error('Erro:', error)
    }
}

window.addEventListener('DOMContentLoaded', carregarComentarios);

