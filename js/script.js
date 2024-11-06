const lista_produtos = document.querySelectorAll(".produtos-container");
const input = document.getElementById("search")
const catalogo = document.querySelectorAll(".produto-layout")
var produtos_arr = [];
var carrinho = [];

atualizarCarrinho();


function verificaLog(){
    var login = JSON.parse(localStorage.getItem("usuarioAtual"));
    if(login !== null){
        return true
    }
    return false;
}

function limparStorage(){
    localStorage.removeItem("produto");
}

function redirecionarPagina(elemento){
    var logado = verificaLog();
    const id = elemento.id;
    switch(id){
        case "user-icon":
            if(!logado){
                window.location.href = "../telas/Cadastro.html";
            }
            else{
                 window.location.href = "../telas/perfil.html"
            }
            break;

        case "cart-icon":
            window.location.href = "../telas/carrinho.html"
            break;

        case "favorite-icon":
            window.location.href = "../telas/favoritos.html"
            break;
            
        default:
            if(id.includes("produto")){
                produto = retornarLivro(elemento);
                console.log(produto)
                localStorage.setItem("produto",JSON.stringify(produto));
                window.location.href = "../telas/produto.html" 
            }
            break; 
        }   
}

function retornarLivro(elemento){
    const titulo = elemento.querySelector('.titulo').textContent;
    const autor = elemento.querySelector('.autor').textContent;
    const data = elemento.querySelector('.data').textContent;
    const quantPags = elemento.querySelector('.quant-pags').textContent;
    const descricao = elemento.querySelector('.descricao') ? elemento.querySelector('.descricao').textContent : '';
    const imgSrc = elemento.querySelector('img').src;

    const produto = {
        imgSrc: imgSrc,
        titulo:titulo,
        autor: autor,
        descricao:descricao,
        data:data,
        quantPags: quantPags,
    }
    return produto;
}

function adicionarAoCarrinho(event,btn){
    event.stopPropagation();
    let usuarioA = JSON.parse(localStorage.getItem("usuarioAtual")) || "";
    if(usuarioA){
        const livro = retornarLivro(btn.parentElement);
        //console.log(livro)
        carrinho.push(livro)

        usuarioA.carrinho = carrinho;
        console.log(usuarioA)
        localStorage.setItem("usuarioAtual",JSON.stringify(usuarioA))
        alert("livro adicionado ao carrinho") // TODO substituir por um pop-up
        console.log(carrinho)
    }
    else{
        alert("faça login para adicionar ao carrinho")
    }
    
}

function atualizarCarrinho(){
    let car = []
    car = JSON.parse(localStorage.getItem("usuarioAtual"));
    console.log(car)
    if(car != null){
        car.carrinho.forEach(livro => {
            carrinho.push(livro);
        });
    }
}

function pesquisar(){
    console.log("teste")
    if(window.location.href.includes("index")){
        const search = document.getElementById("search");
        console.log(console.log(search.value))

        catalogo.forEach(produto => {
            const titulo = produto.querySelector('.titulo').textContent;

            if(!titulo.toString().toLowerCase().includes(search.value.toLowerCase())){
                produto.style.display="none";
            }
            else if(search.value == ""){
                reiniciarPesquisa();
            }
            else{
                produto.style.display= "flex"
            }
        });
        search.value = "";
    }
    else{
        window.location.href = "../telas/index.html"
    }
}

function reiniciarPesquisa(){
    catalogo.forEach(produto => {
        produto.style.display="flex";
    })
}

function atualizarCatalogoNoStorage(){
    catalogo.forEach(produto => {
        produtos_arr.push(retornarLivro(produto));
    })
    localStorage.setItem("catalogo",JSON.stringify(produtos_arr));
}
atualizarCatalogoNoStorage()    


/*
ADICIONAR LIVRO NO SITE:

        let produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto-layout");
        produtoDiv.innerHTML = `
                <img src="${produto.imgSrc}" alt="" class="produto imgProduto">
                <span class="titulo">${produto.titulo}</span>
                <br><span class="autor">${produto.autor}</span>
                <br><div class="detalhes"><span class="data">${produto.data}</span> - <span class="quant-pags">${produto.quantPags}</span></div>
                <div class="descricao" style="display: none;">${produto.descricao}</div>
                <button class="btn-alugar" onclick="adicionarAoCarrinho(event,this)">colocar no carrinho</button>
        `
        document.querySelector(".produtos-container").append(produtoDiv)
        

*/

