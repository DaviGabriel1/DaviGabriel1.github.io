const produto = JSON.parse(localStorage.getItem("produto")) || {};
var carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};;
const img = document.getElementById("img");
var titulo = document.getElementById("titulo");
var descricao = document.getElementById("descricao");
var autor = document.getElementById("autor");
var data = document.getElementById("data")

function carregarProduto() {
    if (produto && img && titulo && descricao) {
        img.src = produto.imgSrc;
        titulo.innerHTML = produto.titulo;
        titulo.innerHTML += " - "
        titulo.innerHTML += produto.autor;
        descricao.innerHTML = produto.descricao;
        data.innerHTML = produto.data;
    } else {
        console.error("Erro: produto ou elementos da página não encontrados.");
    }
}

carregarProduto();


function adicionarAoCarrinhoP(event){
    event.stopPropagation();
    console.log(carrinho)
    let usuarioA = JSON.parse(localStorage.getItem("usuarioAtual")) || "";
    
    if(usuarioA){
        let livro = produto;
        console.log(livro)
        usuarioA.carrinho.push(livro);
        carrinho = usuarioA.carrinho
        localStorage.setItem("usuarioAtual",JSON.stringify(usuarioA))
        alert("livro adicionado ao carrinho") // TODO substituir por um pop-up
    }
    else{
        alert("faça login para adicionar ao carrinho")
    }
    window.location.href = "../telas/carrinho.html";
}

