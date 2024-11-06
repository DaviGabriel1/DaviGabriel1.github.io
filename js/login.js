const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const botao = document.querySelector("#botao");
const form = document.querySelector("form")

form.addEventListener("submit",(event) => {
    event.preventDefault();
    verificaLogin();
})


function verificaLogin(){
    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios"))
    if(listaUsuarios){
        listaUsuarios.forEach(x => {
            if(!verificaEmail(x.email)){
                mensagemErro("email não encontrado")
            }
            else if(!verificaSenha(x.senha)){
                mensagemErro("senha errada,tente novamente")
            }
            else{
                localStorage.setItem("usuarioAtual",JSON.stringify(x))
                console.log("usuario conectado")
                limparInputs();
                window.location.href = "../telas/perfil.html";
            }
        });  
    } 
}

function verificaEmail(emailO){
    if(emailO == email.value.trim()){
        return true;
    }
    return false;
}

function verificaSenha(senhaO){
    if(senhaO == senha.value.trim()){
        return true;
    }
    return false;
}

function mensagemErro(msg){
    let text = document.querySelector("form").querySelector("span");
    text.innerHTML = msg;
    text.className = "erro";
}

function limparInputs(){
    document.querySelector("form").querySelector("span").innerHTML = "";
    email.value = "";
    senha.value = "";
}