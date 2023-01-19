export default function initMenuLateral(){
    const menu = document.querySelector('.li-menu');
    const menuLateral = document.querySelector('.menu-lateral');
    const toggle = () => {
        menuLateral.classList.toggle('ativo');
    };
    menu.addEventListener('click',toggle);
}
