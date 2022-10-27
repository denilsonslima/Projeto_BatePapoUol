// const name = prompt("Informe Seu Nome: ")

function adicionarContato(seletor){
    const aparecer = document.querySelector(".ctt")
    aparecer.classList.remove("escondido")
}

function removerCtt(seletor){
    const desaparecer = document.querySelector(".ctt")
    desaparecer.classList.add("escondido")
}

let nomes = [];

const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
promessa.then(funcao)

function funcao(valor){
    nomes = valor.data;
    rederizarReceitas()
}

function rederizarReceitas(){
    let main = document.querySelector(".main")
    main.innerHTML = "";
    for (let i = 0; i < nomes.length; i++){
        let name = nomes[i].from
        let time = nomes[i].time
        let text = nomes[i].text
        main.innerHTML+= `
        <div class="chat"><p><time>${time}</time> ${name} ${text}</p></div>
        `
    }
}
