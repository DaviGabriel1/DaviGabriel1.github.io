const valorImgUrl = document.querySelector("#imgUrl");
const usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

if(usuarioAtual.fotoImgUrl){
    valorImgUrl.value = usuarioAtual.fotoImgUrl;
}

function editarImgUrl(){
    usuarioAtual.fotoImgUrl = valorImgUrl.value;
    localStorage.setItem("usuarioAtual",JSON.stringify(usuarioAtual))
    window.location.href = "../index.html"
}