const primeiroNome = document.querySelector("#primeiro-nome");
const ultimoNome = document.querySelector("#ultimo-nome");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const confirmaSenha = document.querySelector("#confirma-senha");
const checkbox = document.querySelector("#confirma-termos");
const form = document.querySelector("form")
var text = document.querySelector("form").querySelector("span")

var usuarios_cadastrados = [];

form.addEventListener("submit",(event) => {
    event.preventDefault();
    validaSenha();
});

function validaSenha(){
    const letrasMinus = "abcdefghijklmnopqrstuvwxyz"
    const letrasMaius = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numeros = "1234567890"
    if(senha.value.length < 8 ){
        mostraErro("a senha deve ter mais de 8 caracteres");
    }
    else if(!iteraCharset(senha.value,letrasMaius)){
        mostraErro("a senha deve conter letras maiusculas");
    }
    else if(!iteraCharset(senha.value,letrasMinus)){
        mostraErro("a senha deve conter letras minusculas");
    }
    else if(!iteraCharset(senha.value,numeros)){
        mostraErro("a senha deve conter numeros");
    }
    else if(senha.value !== confirmaSenha.value){
        mostraErro("as 2 senhas devem ser iguais")
    }
    else if(!validaEmail(email.value)){
        mostraErro("digite um email valido")
    }
    else if(!checkbox.checked){
        mostraErro("confirme os termos de uso")
    }
    else if(senha.value.trim() === "" || confirmaSenha.value.trim() === ""){
        mostraErro("digite uma senha valida")
    }
    else if(primeiroNome.value.trim().length <2 || ultimoNome.value.trim()<2){
        mostraErro("digite um nome válido")
    }
    else if(!analisaUsuarioCadastrado(email.value)){
        console.log("entrou")
        mostraErro("email já cadastrado")
    }
    else{
        const usuario = {
            primeiroNome:primeiroNome.value,
            ultimoNome:ultimoNome.value,
            email:email.value,
            senha:senha.value,
            carrinho: [],
            favoritos:[],
            livrosAlugados: [],
            fotoImgUrl: "../assets/foto-padrao.jpg"
        }
        let usuariosCadastrados = [];
        usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios"));
        if(usuariosCadastrados){
            usuariosCadastrados.forEach(x => {
                usuarios_cadastrados.push(x)
            });
        }

        usuarios_cadastrados.push(usuario);
        localStorage.setItem('usuarioAtual',JSON.stringify(usuario));
        localStorage.setItem("usuarios",JSON.stringify(usuarios_cadastrados));
        limparInputs()
        window.location.href = "../telas/perfil.html";
    }
}

function analisaUsuarioCadastrado(email){
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if(usuarios !== null){
        for(var i = 0;i<usuarios.length;i++){
            if(usuarios[i].email == email){
                return false;
            }
        }
    }
    return true;
}

function validaEmail(email){
    if(email.value === ""){
        return false;
    }
    else if(!email.includes("@gmail.com") && !email.includes("@fatec.sp.gov.br") &&
        !email.includes("@outlook.com") && !email.includes("@yahoo.com") && !email.includes("@icloud.com") 
        && !email.includes("@hotmail.com")){
            return false;
    }
    return true;
}

function iteraCharset(senha,charset){
    for(var i = 0;i<charset.length;i++){
        if(senha.includes(charset[i])){
            return true;
        }
    }
    return false;
}

function mostraErro(msg){
    text.innerHTML = msg;
    text.className = "erro"
}

function limparInputs(){
    text.className = "";
    primeiroNome.value = "";
    ultimoNome.value = "";
    email.value = "";
    senha.value = "";
    confirmaSenha.value = "";
    checkbox.checked = false;
}

