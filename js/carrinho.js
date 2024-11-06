var usuarioAt = JSON.parse(localStorage.getItem("usuarioAtual")) || [];
var carrinho = usuarioAt.carrinho;
console.log(carrinho)
const listaDeLivros = document.getElementById("lista-livros");

function carregarlivros(){
    carrinho.forEach(livro => {
        carregarlivrosHTML(livro);
    })
}

carregarlivros();

function carregarlivrosHTML(livro){
    let livroDiv = document.createElement("div");
    livroDiv.className = "produto-layout";
    livroDiv.innerHTML = `
        <img src="${livro.imgSrc}" alt="" class="produto imgProduto">
                <div class="desc">
                    <span class="titulo">${livro.titulo}</span>
                    <br><span class="autor">${livro.autor}</span>
                    <br><div class="detalhes"><span class="data">${livro.data}</span> - <span class="quant-pags">${livro.quantPags}</span></div>
                    <div class="descricao" style="display: none;">${livro.descricao}</div>
                    <button class="btn-alugar" onclick="redirecionarAlugar(event,this)">Alugar</button>
                    <svg xmlns="http://www.w3.org/2000/svg" onclick="excluirLivro(event,this)" height="100px" viewBox="0 -960 960 960" width="100px" fill="#000000"><path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                </div>
    `;

    livroDiv.addEventListener('click', function(event) {
        //TODO adicionar a div no local storage
        event.stopPropagation()

        produto = retornarLivroC(livroDiv);
        console.log(produto)
        localStorage.setItem("produto",JSON.stringify(produto));

        window.location.href = "../telas/produto.html" 
    });

    document.getElementById("lista-livros").append(livroDiv);
}

function excluirLivro(event,btn){
    event.stopPropagation();
    console.log(carrinho)
    let livroDiv = btn.parentElement.parentElement;
    let objLivro = retornarLivroC(livroDiv);
    usuarioAt.carrinho = carrinho.filter(livro => livro.titulo !== objLivro.titulo) //atualiza carrinho
    localStorage.setItem("usuarioAtual",JSON.stringify(usuarioAt))
    console.log(usuarioAt)
    livroDiv.remove();
}

function redirecionarPaginaC(div){
    produto = retornarLivroC(div);
        console.log(produto)
                localStorage.setItem("produto",JSON.stringify(produto));
                window.location.href = "../telas/produto.html" 
}

function retornarLivroC(elemento){
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

function redirecionarAlugar(event,btn){
    event.stopPropagation();
    let divLivro = btn.parentElement.parentElement;
    let livroAlugar = retornarLivroC(divLivro);
    localStorage.setItem("produtoAlugar",JSON.stringify(livroAlugar));
    console.log(livroAlugar);
    excluirLivro(event,btn)
    window.location.href = "../telas/alugar.html"
}

function atualizarCarrinho(){
    carrinho = usuarioAt.carrinho;
}

function limparCarrinho(){
   var l =  document.querySelectorAll(".produto-layout")
   l.forEach(x => {
    limparCarrinhoLS();
    x.remove();
   })
}

function limparCarrinhoLS(){
    usuarioAt.carrinho = []
    localStorage.setItem("usuarioAtual",JSON.stringify(usuarioAt))
}