export default function initSearch(){

}
const search = document.querySelector('.icon-search');
const buscar = document.getElementById('buscar');
const results = document.querySelector('.results');
let valor = null;

const getText = (event) => {
    valor = event.target.value;
};
const isNull = (identificador) => {
    const elemento = document.querySelector(identificador);//erro pq ???????
    const bool = (elemento !== null ? false : true); 
    return bool;//true se o elemento for nulo
}
const abrirResultados = (classe) => {
    const elementos = document.querySelectorAll(classe);
    elementos.forEach((e) => e.classList.add('ativo'));
};
const criarResultado = (tr) => {
    const div = document.createElement('div');
    div.classList.add('show-results');
    const children = [...tr.children];
    div.innerHTML = 
    `
        <span class="span-results"><span class="title">Descrição</span>: ${children[0].innerText}</span>
        <span class="span-results"><span class="title">Data</span>: ${children[1].innerText}</span>
        <span class="span-results"><span class="title">Tipo</span>: ${children[2].innerText}</span>
        <span class="span-results"><span class="title">Status</span>: ${children[3].innerText}</span>
    `;
    results.appendChild(div);
    abrirResultados('.resultado');
};
const procurarTarefa = (event) => {
    if(!isNull('.tabela-corpo') && event.key === 'Enter'){
        let td = null;
        const corpo = document.querySelector('.tabela-corpo');
        const tr = (corpo !== null ? [...corpo.children] : null);
        tr.forEach((e) => {
            if(valor === e.children[0].innerText)
                criarResultado(e);
                console.log(event);
        });
    }
    else{
        console.log('nao ha tarefas');
    }
};
buscar.addEventListener('input',getText);
search.addEventListener('click',procurarTarefa);
window.addEventListener('keydown',procurarTarefa);