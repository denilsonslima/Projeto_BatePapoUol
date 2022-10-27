const usuarioLogado = prompt("Informe Seu Nome: ")
if (usuarioLogado !== ""){
    setTimeout(participantesAtivos, 500)
}

// let value;
// const sms = []
// document.addEventListener("keypress", function(e){
//     if (e.key === "Enter"){
//         const btn = document.querySelector("#send")
//         btn.click()
        
//         const name = document.querySelector("#input")
//         value = name.value;
//         sms.push(value)
//         participantesAtivos()
//     }
    
// });


function adicionarContato(seletor){
    const aparecer = document.querySelector(".ctt")
    aparecer.classList.remove("escondido")
}

function removerCtt(seletor){
    const desaparecer = document.querySelector(".ctt")
    desaparecer.classList.add("escondido")
}

let nomes = [];

function iniciar(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promessa.then(funcao)
}
iniciar()
setInterval(iniciar, 5000)

function funcao(valor){
    nomes = valor.data;
    rederizarReceitas()
}

let main, text;
function rederizarReceitas(){
    main = document.querySelector(".main")
    main.innerHTML = "";
    for (let i = 0; i < nomes.length; i++){
        let name = nomes[i].from
        let nome = name[0].toUpperCase() + name.substring(1) //Primeira letra Maiúscula
        let time = nomes[i].time
        text = nomes[i].text
        main.innerHTML+= `
        <div class="chat"><p><time>(${time})</time> <span>${nome}</span> ${text}</p></div>
        `
    }
}

function participantesAtivos(){
    const addNome = {
        name: usuarioLogado
    }
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", addNome)
    requisicao.then(deuCerto)
    
    function deuCerto(valor){
        rederizarReceitas()
    }
    
} 
