export default function initData(){
    const span = document.querySelector('[data-atual="on"]');
    const formatar = () => {
        const date = new Date();
        const dia = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
        const mes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        return `${dia[date.getDay()]} ${date.getDate()} ${mes[date.getMonth()]}`;
    };
    span.innerHTML = formatar();
}
