async function fetchItems() {
    try {
        const resposta = await fetch('http://localhost:3000/produtos');
        const dados = await resposta.json();
        console.log(dados);
    } catch (error) {
        console.error('Erro: ', error);
    }
}

function createCard(item) {
    return `
    <div id="card-individual">
    <div class="image">
        <img src="${item.imagem}" alt="${item.nome}" class="img-doce">
    </div>
    <div class="card-body">
        <h4 class="nome">${item.nome}</h4>
        <p class="desc">${item.descCurta}</p>
        <div class="categoria">
            <p>${item.categoria}</p>
        </div>
        <div class="preco">
            <span>R$${item.preco.toFixed(2).replace('.',',')}</span>
        </div>
    </div>
    <div class="footer">
     <a href="details.html?id=${item.id}">Ver detalhes</a>
    </div>
    </div>
    `
}

async function renderCards(){
    try{
    const resposta = await fetch('http://localhost:3000/produtos');
    const produtos  = await resposta.json();

    const cards = document.getElementById('container-doces');
    cards.innerHTML = '';

    produtos.forEach(produto => {
        const card = createCard(produto);
        cards.innerHTML += card;
    });
    } catch (error){
        console.error('Erro:', error)
    }
}

async function init() {
    fetchItems();
    renderCards();
}

init();

