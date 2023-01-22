export default function initSearch(){
    //const search = document.querySelector('.icon-search');
    const buscar = document.getElementById('buscar');
    const results = document.querySelector('.results');
    const form = document.forms.form1;
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
    const limparResultados = (elemento) => {
        const children = [...elemento.children];
        children.forEach(e => e.remove());
    };
    const criarResultado = (tr) => {
        const div = document.createElement('div');
        div.classList.add('show-results');
        const children = [...tr.children];
        limparResultados(results);
        div.innerHTML = 
        `
            <span class="span-results"><span class="title">Descrição:</span> ${children[0].innerText}</span>
            <span class="span-results"><span class="title">Data:</span> ${children[1].innerText}</span>
            <span class="span-results"><span class="title">Tipo:</span> ${children[2].innerText}</span>
            <span class="span-results"><span class="title">Status:</span> ${children[3].innerText}</span>
        `;
        results.appendChild(div);
        abrirResultados('.resultado');
    };
    const procurarTarefa = (event) => {
        if(event.key === 'Enter' || event.type === 'input'){
            event.preventDefault();
            if(!isNull('.tabela-corpo')){
                let td = null;
                const corpo = document.querySelector('.tabela-corpo');
                const tr = (corpo !== null ? [...corpo.children] : null);
                tr.forEach((e) => {
                    if(valor === e.children[0].innerText)
                        criarResultado(e);
                });
            }
            else
                limparResultados(results);
        }
        console.log('tipo: ',event.type);
    };
    buscar.addEventListener('input',getText);
    form.addEventListener('input',procurarTarefa);
    window.addEventListener('keypress',procurarTarefa);
}