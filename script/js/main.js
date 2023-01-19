export default function initMain(){
    //variaveis
    const form = document.forms[0];
    const button = document.querySelector('.add-tarefa');
    const divTable = document.querySelector('.div-table');
    const darkerModal = document.querySelector('.darker');

    //objeto com os dados de todos inputs
    const inputs = {//pegando dados do form de forma dinamica
        descricao: {//se setarmos
            tarefa: '',
            prazo: '',
            tipo: 'Rotina',
            status: 'Pendente'
        },
        tarefa(valor){
            this.descricao.tarefa = valor;
        },
        prazo(valor){
            this.descricao.prazo = valor;
        },
        tipo(valor){
            this.descricao.tipo = valor;
        },
        status(valor){
            this.descricao.status = valor;
        }
    }

    //funcoes
    const getTarefa = (event) => {
        inputs[event.target.id](event.target.value);//pegando dados do form de forma dinamica
    };
    const isEmpty = (elemento1,elemento2) => {
        return !elemento1 || !elemento2;
    };
    const createTable = (elemento) => {
        elemento.innerHTML = `
        <thead class="tabela-cabecalho">
            <tr>
                <th class="primeira-linha">Descrição</th>
                <th>Prazo</th>
                <th>Tipo</th>
                <th>Status</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody class="tabela-corpo">
            <tr>
                <td class="left">${inputs.descricao.tarefa}</td>
                <td>${inputs.descricao.prazo}</td>
                <td>${inputs.descricao.tipo}</td>
                <td class="stt ${inputs.descricao.status.toLowerCase()}">${inputs.descricao.status}</td>
                <td> <img src="./imagens/tres-pontos.png" class="editar"></td>
                <td><img src="./imagens/trash.png" class="excluir"></td>
            </tr>
        </tbody>
        `;
        elemento.setAttribute('class','tabela-tarefas');
        divTable.appendChild(elemento);
    };
    const createTask = (elementoPai) => {
        const target = document.querySelector(elementoPai);
        const task = document.createElement('tr');
        task.innerHTML = `
        <tr>
            <td class="left">${inputs.descricao.tarefa}</td>
            <td>${inputs.descricao.prazo}</td>
            <td>${inputs.descricao.tipo}</td>
            <td class="stt ${inputs.descricao.status.toLowerCase()}">${inputs.descricao.status}</td>
            <td> <img src="./imagens/tres-pontos.png" class="editar"></td>
            <td><img src="./imagens/trash.png" class="excluir"></td>
        </tr>
        `;
        target.appendChild(task);
    };
    const animaButton = () => {
        setTimeout(() => {
            button.classList.add('adicionada');
            const timer = setTimeout(() => {
                button.classList.remove('adicionada');
            },2000);
        },0);
    };
    const setTarefa = (event) => {//cria a tarefa e add na tabela
        try{
            event.preventDefault();
            if(!divTable.children.length && !isEmpty(inputs.descricao.tarefa,inputs.descricao.prazo)){
                const table = document.createElement('table');
                createTable(table);
                //add a seta de verificado ao criar uma tarefa
                animaButton();
            }
            else if(!isEmpty(inputs.descricao.tarefa,inputs.descricao.prazo)){
                createTask('.tabela-corpo');
                animaButton();
            }
                
        }
        catch(erro){
            console.log('erro tipo ', erro);
        }
    };
    const alterarTarefa = (event) => {//editar ou excluir
        const tr = event.target.closest('tr');//função que pega o primeiro elemento informado no parametro
        event.target.classList.contains('excluir') ? tr.remove() : undefined;
        if(event.target.classList.contains('editar')){
            darkerModal.classList.add('ativo');
            darkerModal.nextElementSibling.classList.add('ativo');//nextElementSibling ou selecionar o modal com document.querySelector,tanto faz
        }
    };
    
    //add os eventos
    form.addEventListener('input',getTarefa);
    button.addEventListener('click',setTarefa);
    divTable.addEventListener('click',alterarTarefa);
}