export default function initEditarTask(){

}
//variaveis e objeto
const edit = {
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
//const form1 = document.getElementById('todolist');
const formEdit = document.forms.formEditar;
const buttonAdd = document.querySelector('.button-edit');
const tbody = document.querySelector('.darker');
console.log(tbody);
//funcoes
const getTexto = (event) => {
    edit[event.target.name](event.target.value)//[] é uma altenativa ao . ex: edit.tarefas === edit[tarefas]
};
const editarTarefa = () => {
    console.log(tbody);
}
buttonAdd.addEventListener('click',editarTarefa);
formEdit.addEventListener('input',getTexto);