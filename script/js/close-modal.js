export default function initCloseModal(){

}
const close = document.querySelectorAll('.close');
const darkModal = document.querySelector('.darker');
const removeEvent = (e) => {
    e.addEventListener('click',() => {
        darkModal.classList.remove('ativo');
        darkModal.nextElementSibling.classList.remove('ativo');
    });
}
close.forEach(removeEvent);