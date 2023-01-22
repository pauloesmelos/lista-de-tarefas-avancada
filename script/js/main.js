export default function initMain(){
    //variaveis
    const form = document.forms.todolist;
    const button = document.querySelector('.add-tarefa');
    const divTable = document.querySelector('.div-table');
    const formEdit = document.forms.formEditar;//edit
    const buttonAdd = document.querySelector('.button-edit');//edit

    //objeto com os dados de todos inputs
    const inputs = {//pegando dados do form de forma dinamica
        descricao: {
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
    const edit = {//objeto com os valores que o usuário ira editar
        tr: null,
        tarefas(valor){
            this.valueTarefa = valor;
        },
        prazo(valor){
            this.valuePrazo = valor;
        },
        tipo(valor){
            this.valueTipo = valor;
        },
        status(valor){
            this.valueStatus = valor;
        }
    };
    //funcoes
    const messagemError = (elemento,bool) => {
        const span = document.querySelector(elemento);
        if(bool)
            span.classList.add('ativo');
        else
            span.classList.remove('ativo');
    };
    const getTarefa = (event) => {
        inputs[event.target.id](event.target.value);//pegando dados do form de forma dinamica
        messagemError('.error',false);//passar o span com a mensagem de erro
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
                <td class="left" data-label="Descricao">${inputs.descricao.tarefa}</td>
                <td data-label="Prazo">${inputs.descricao.prazo}</td>
                <td data-label="Tipo">${inputs.descricao.tipo}</td>
                <td class="stt ${inputs.descricao.status.toLowerCase()}" data-label="Status">${inputs.descricao.status}</td>
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
            <td class="left" data-label="Descricao">${inputs.descricao.tarefa}</td>
            <td data-label="Prazo">${inputs.descricao.prazo}</td>
            <td data-label="Tipo">${inputs.descricao.tipo}</td>
            <td class="stt ${inputs.descricao.status.toLowerCase()}" data-label="Status">${inputs.descricao.status}</td>
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
            },1000);
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
            else if(isEmpty(inputs.descricao.tarefa,inputs.descricao.prazo))
                messagemError('.error',true);
        }
        catch(erro){
            console.log('erro tipo ', erro);
        }
    };
    const trQueSeraMudado = (tr) => {
        edit.tr = tr;
    };
    const preencherInputsEditar = () => {
        const tr = [...edit.tr.children];
        const filhos = [...formEdit.children];
        const inputs = filhos.map((e) => {
            let input = null;
            if(e.tagName === 'INPUT' || e.tagName === 'SELECT')
                input = e;
            return input;
        }).filter(e => e !== null);//pegando os inputs do formulario de edição e elimando os labels

        inputs.forEach((e,i) => {
            e.value = tr[i].innerText;      
        });
    };
    const abrirOuFecharModal = (classe) => {
        const elementos = document.querySelectorAll(classe);
        elementos.forEach((e) => e.classList.toggle('ativo'));
    }
    const alterarTarefa = (event) => {//editar ou excluir
        const tr = event.target.closest('tr');//função que pega o primeiro elemento informado no parametro
        event.target.classList.contains('excluir') ? tr.remove() : undefined;
        if(event.target.classList.contains('editar')){
            abrirOuFecharModal('[data-modal="on"]')
            //darkerModal.classList.add('ativo');
            //darkerModal.nextElementSibling.classList.add('ativo');//nextElementSibling ou selecionar o modal com document.querySelector,tanto faz
            trQueSeraMudado(tr);
            preencherInputsEditar();//preenche com os dados originais
        }
    };
    const getTexto = (event) => {
        edit[event.target.name](event.target.value)//[] é uma altenativa ao . ex: edit.tarefas === edit[tarefas]
    };
    const editarTr = (array) => {
        const tr = [...edit.tr.children];//tr original - capturado na função alterarTarefa com a função closest() - que retorna o ancestral mais proximo - elemento pai 
        tr.forEach((e,i) => {
            if(e.classList.contains('stt') && e.innerText !== array[i]){//verifica se mudou o tipo do status - realizado ou pendente
                const status = array[i];
                switch(status){
                    case 'Pendente':
                        e.setAttribute('class','stt pendente');
                        console.log(e);
                        break;
                    case 'Realizado':
                        e.setAttribute('class','stt realizado');
                        console.log(e);
                        break;
                }
            }
            e.innerText !== '' ? e.innerText = array[i] : undefined;
        });
    }
    const editarTarefa = () => {
        //criar um array de tarefas pra editar na tabela de forma dinamica - num forEach
        const array = [];
        array.push(edit.valueTarefa = (edit.valueTarefa === undefined) ? inputs.descricao.tarefa : edit.valueTarefa);
        array.push(edit.valuePrazo = (edit.valuePrazo === undefined) ? inputs.descricao.prazo : edit.valuePrazo);
        array.push(edit.valueTipo = (edit.valueTipo === undefined) ? 'Rotina' : edit.valueTipo);
        array.push(edit.valueStatus = (edit.valueStatus === undefined) ? 'Pendente' : edit.valueStatus);
        editarTr(array);
        abrirOuFecharModal('[data-modal="on"]');
    }
    //add os eventos
    form.addEventListener('input',getTarefa);
    button.addEventListener('click',setTarefa);
    divTable.addEventListener('click',alterarTarefa);
    formEdit.addEventListener('input',getTexto);
    buttonAdd.addEventListener('click',editarTarefa);
}