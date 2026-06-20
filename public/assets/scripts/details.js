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