const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const foto = document.getElementById("foto");

const usuarioAtual = carregarUsuarioAtual();


atualizarPerfil();

function atualizarPerfil(i){
    console.log(foto)
    
    
    const livrosAlugados = usuarioAtual.livrosAlugados
    if(usuarioAtual !== ""){
        nome.innerHTML = usuarioAtual.primeiroNome;
        nome.innerHTML += " "+usuarioAtual.ultimoNome;
        email.innerHTML = usuarioAtual.email;
        foto.style.backgroundImage = `url('${usuarioAtual.fotoImgUrl}')`
        if(livrosAlugados){
            livrosAlugados.forEach(livro => {
                carregarlivrosHTML(livro);
            });
        }
    }
    else{
        alert("erro ao carregar usuario")
        window.location.href = "../telas/index.html";
    }
}

function carregarlivrosHTML(livro){
    let endereco = livro.pais+", "+livro.complemento+", "+livro.cep

    let livroDiv = document.createElement("div");
    livroDiv.className = "produto-layout"; 
    livroDiv.style ="cursor: pointer;"
    livroDiv.innerHTML = `
        <img src="${livro.imgSrc}" alt="" class="produto imgProduto">
        <span class="titulo" style="font-weight: bold;">${livro.titulo}</span>
        <br><span class="autor">${livro.autor}</span>
        <div class="descricao" style="display: none;">${livro.descricao}</div>
        <div class="campo-remetente">
            <label style="font-weight: bold;">nome do remetente: <br></label><span class="nome">${livro.nome}</span>
        </div>
        <div class="campo-endereco">
            <span style="font-weight: bold;">endereço: <br></span><span class="endereco">${endereco}</span>
        </div>
        <div class="campo-vencimento">
            <span style="font-weight: bold;">data de vencimento: <br></span><span class="vencimento">${livro.data}</span>
        </div>
    `;

    livroDiv.addEventListener('click', function(event) {
        event.stopPropagation()

        localStorage.setItem("produto",JSON.stringify(livro)); //TODO criar tela personalizada com infos de devoluçãp

        window.location.href = "../telas/produto.html" 
    });

    document.getElementById("lista-livros").append(livroDiv);
}

function carregarUsuarioAtual(){
    return JSON.parse(localStorage.getItem("usuarioAtual")) ? JSON.parse(localStorage.getItem("usuarioAtual")) : "";
}

function sairConta(){
    salvarUsuario();
    localStorage.removeItem("usuarioAtual");
    window.location.href = "../telas/index.html";
}

function devolverLivros(){
    if(confirm("tem certeza que deseja devolver? (prazo para devolução a agencia será de 2 dias)")){
        let usuario = carregarUsuarioAtual();
        usuario.livrosAlugados = [];
        localStorage.setItem("usuarioAtual",JSON.stringify(usuario));
        atualizarPerfil();
        //TODO pop up para avisar que os livros foram removidos e o tempo para devolver
        window.location.reload();
    }
}

function salvarUsuario(){
    let usuarioAtual = carregarUsuarioAtual();
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || "";

    if(usuarios !== ""){
        usuarios.forEach(x => {
            if(x.email == usuarioAtual.email){
                x.carrinho = usuarioAtual.carrinho;
                x.livrosAlugados = usuarioAtual.livrosAlugados;
            }
        })
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
}