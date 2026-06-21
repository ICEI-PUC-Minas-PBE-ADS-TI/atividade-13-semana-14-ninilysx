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

async function createChart() {
    try{
        const resposta = await fetch('http://localhost:3000/produtos')
        const produtos = await resposta.json();

        // conta quantidade de produto por categoria

        const countCat = {}

        produtos.forEach(produto =>{
            const categoria = produto.categoria;
            if(countCat[categoria]){
                countCat[categoria]++;
            } else{
                countCat[categoria] = 1;
            }
        });

        const nomeCat = Object.keys(countCat);
        const quantidades = Object.values(countCat);

        const ctx = document.getElementById('grafico');

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: nomeCat,
                datasets: [{
                    label: 'Total de produtos',
                    data: quantidades,
                    backgroundColor: [
                        '#8E9546',
                        '#BBCA6F',
                        '#E9E29B',
                        '#f7ddce',
                        '#F1B4AF',
                        '#DD8C96',
                        '#A4565C'
                    ], 
                    hoverBackgroundColor: [
                        '#8E9546',
                        '#BBCA6F',
                        '#E9E29B',
                        '#f7ddce',
                        '#F1B4AF',
                        '#DD8C96',
                        '#A4565C'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip:{
                        enabled: true
                    }
                }
            }
        });
    } catch (error){
        console.error('Erro ao carregar gráfico: ', error)
    }
}

createChart();

async function createNotas() {
    try{
        const resposta = await fetch('http://localhost:3000/comentarios')
        const comentarios = await resposta.json();

        // conta quantidade de produto por categoria

        const countNota = {
            '1 Estrela': 0,
            '2 Estrelas': 0,
            '3 Estrelas': 0,
            '4 Estrelas': 0,
            '5 Estrelas': 0,
        };

        comentarios.forEach(comentario =>{
            const nota = comentario.nota;
            const chave = `${nota} Estrela${nota > 1 ? 's' : ''}`;

            if(countNota[chave] !== undefined){
                countNota[chave]++;
            }
        });

        const nomeNota = Object.keys(countNota);
        const quantidade = Object.values(countNota);

        const ctx = document.getElementById('grafico-notas');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nomeNota,
                datasets: [{
                    label: 'Total de produtos',
                    data: quantidade,
                    backgroundColor: [
                        '#8E9546',
                        '#BBCA6F',
                        '#E9E29B',
                        '#f7ddce',
                        '#F1B4AF',
                        '#DD8C96',
                        '#A4565C'
                    ], 
                    hoverBackgroundColor: [
                        '#8E9546',
                        '#BBCA6F',
                        '#E9E29B',
                        '#f7ddce',
                        '#F1B4AF',
                        '#DD8C96',
                        '#A4565C'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginsAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    } catch (error){
        console.error('Erro ao carregar gráfico: ', error)
    }
}

createNotas();