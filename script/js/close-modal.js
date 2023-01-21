export default function initCloseModal(){

}
const close = document.querySelectorAll('.close');
const darkModal = document.querySelector('.darker');
//fechar os resultados e o modal com click no documento
const divResults = document.querySelector('.div-results');
const results = document.querySelector('.results');

const removeEvent = (e) => {
    e.addEventListener('click',() => {
        darkModal.classList.remove('ativo');
        darkModal.nextElementSibling.classList.remove('ativo');
    });
}
const fecharResultadoModal = (classe1,classe2) => {
    const elemento1 = document.querySelectorAll(classe1);
    elemento1.forEach((e) => e.classList.remove('ativo'));
};
close.forEach(removeEvent);
window.addEventListener('click', () => {
    fecharResultadoModal('.resultado',null);
});