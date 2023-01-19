export default function initDarkMode(){
    const darkMode = document.querySelector('.icon-darkmode');
    const addDarkMode = () => {
        document.body.classList.toggle('ativo');
    };
    darkMode.addEventListener('click',addDarkMode);
}