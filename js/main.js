const form = document.querySelector('#novoItem');
const lista = document.querySelector('#lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

atualizarInterface();

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const atividade = evento.target.elements['atividade'].value;
    const horario = evento.target.elements['horario'].value;
    const id = Date.now();

    const item = {
        'atividade': atividade,
        'horario': horario,
        'id': id
    };

    itens.push(item);
    ordenarLista(itens);

    atualizarInterface();

    localStorage.setItem('itens', JSON.stringify(itens));

    evento.target.reset();
});

function criarElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const horarioSpan = document.createElement('span');
    horarioSpan.classList.add('item__horario');
    horarioSpan.innerHTML = item.horario;

    novoItem.appendChild(horarioSpan);
    novoItem.innerHTML += item.atividade;
    novoItem.appendChild(botaoDeletar(item.id))

    lista.appendChild(novoItem);
};

function atualizarInterface() {
    lista.innerHTML = '';
    itens.forEach((elemento) =>{
        criarElemento(elemento)
    })
};

function botaoDeletar(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.classList.add('botao-deletar');
    elementoBotao.innerText = '🗑️';

    elementoBotao.addEventListener('click', function() {
        deletarElemento(this.parentNode, id)
    })

    return elementoBotao;
};

function deletarElemento(elemento, id) {
    elemento.remove();

    itens.splice(itens.findIndex(item => item.id === id), 1)
    
    localStorage.setItem('itens', JSON.stringify(itens))
};

function ordenarLista(lista) {
    itens.sort((a, b) => a.horario.localeCompare(b.horario))
};
