let value; let nomes = [];
let usuarioLogado;
const main = document.querySelector(".main")

function iniciarChat(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promessa.then(pegarSMS)
    manterConexao()
}

function pegarSMS(valor){
    nomes = valor.data;
    renderizarMensagens()
}   

function renderizarMensagens(){
    main.innerHTML = "";
    for (let i = 0; i < nomes.length; i++){
        let name = nomes[i].from;
        let nome = name[0].toUpperCase() + name.substring(1); //Primeira letra Maiúscula
        let time = nomes[i].time;
        let text = nomes[i].text;
        let to = nomes[i].to
        if ((text === "entra na sala...") || (text === "sai da sala...")){
            main.innerHTML+= `
            <div class="chat entrar"><p><time>(${time})</time> <span>${nome}</span> ${text}</p></div>`
        } else if (to !== "Todos") {
            main.innerHTML+= `
        <div class="chat rosa"><p><time>(${time})</time> <span>${nome}</span>  Reservadamente para  <span>${to}:</span>  ${text}</p></div>`
        }
        else {
            main.innerHTML+= `
        <div class="chat"><p><time>(${time})</time> <span>${nome}</span>  para  <span>${to}:</span>  ${text}</p></div>`
        }
        
    }
    main.lastElementChild.scrollIntoView();
}

function adicionarParticipante(){
    const novoParticipante = {name: usuarioLogado}
    const participante = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", novoParticipante)
    participante.then(iniciarChat)
    participante.catch(erro)
    setInterval(iniciarChat, 3000)
    setInterval(manterConexao, 3000)

    function erro(){
        window.location.reload()
        alert("Nome em uso, tente outro!")
    }
} 

function manterConexao(){
    const userAtivo = {name: usuarioLogado}
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", userAtivo) 
}

function pegarInput(seletor){
    const elementoPai = seletor.parentNode;
    value = elementoPai.querySelector(".pegarSMS").value;
    let b = elementoPai.querySelector(".pegarSMS")
    b.value = ""
    enviarSMS()
}

function enviarSMS(){
    let novaMensagem = {
        from: usuarioLogado,
        to: "Todos",
        text: value,
        type: "message"
    }
    const a = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem)
    a.then(promisse)
    a.catch(erro)

    function promisse() {
        renderizarMensagens()
    }

    function erro(){
        window.location.reload()
    }
}

function adicionarContato(){
    const input = document.querySelector(".cadastro").value
    const apagarInput = document.querySelector(".cadastro")
    apagarInput.value = "";
    if (input !== ""){
        const a = document.querySelector(".cadastrar");
        a.classList.add("escondido")
        usuarioLogado = input;
    }   
    adicionarParticipante()
    setTimeout(addCtt, 500)
    setInterval(addCtt, 10000)
}

function verParticipantes(){
    const a = document.querySelector(".ctt");
    a.classList.remove("escondido")
}

function removerCtt(){
    const a = document.querySelector(".ctt")
    a.classList.add("escondido")
}

// bonus
function addCtt(){
    const a = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
    a.then(addParticipante)
}

function addParticipante(valor){
    let participante = valor.data;
    const contatos = document.querySelector(".contatos")
    contatos.innerHTML = "";
    for(let i = 0; i < participante.length; i++){
        contatos.innerHTML+= `
        <div onclick="selecionarCtt(this)" class="ctts"><ion-icon name="person-circle"></ion-icon><P>${participante[i].name}</P><ion-icon class="marcado" name="checkmark-outline"></ion-icon></div>
    `
    }
}

function selecionarCtt(seletor){
    const a = seletor.querySelector(".marcado")
    a.classList.add("aparecer")
}