/////////////////////////////////////////Config de data limite////////////////////////////////////////////////////

const hoje = new Date();

const amanha = new Date(hoje);
amanha.setDate(hoje.getDate() + 1);

const maximo = new Date(hoje);
maximo.setDate(hoje.getDate() + 7);

const dataAmanha = amanha.toISOString().split("T")[0];
const dataMaxima = maximo.toISOString().split("T")[0];

document.getElementById("data").setAttribute("min", dataAmanha);
document.getElementById("data").setAttribute("max", dataMaxima);

function formatarDataParaISO(dataBR) {
    const [dia, mes, ano] = dataBR.split("/");
    return `${ano}-${mes}-${dia}`;
}

function retornaArrayData(data){
    const dataInput = data.value; // Pega o valor do input
    const dataFormatadaISO = formatarDataParaISO(dataInput);
    let anoMesDia = dataFormatadaISO.split("-");
    anoMesDia = anoMesDia.filter((index) => index>=2).reverse();
    if(anoMesDia){
        let dataStr = ""
        anoMesDia.forEach(x => {
            dataStr += x+"/";
        })
        dataStr = dataStr.substring(0,dataStr.length-1) 
        return dataStr;
    }
    return null
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const nome = document.getElementById("nome");
const pais = document.getElementById("pais");
const cep = document.getElementById("cep");
const complemento = document.getElementById("complemento");
const btnAlugar = document.getElementById("alugar");
var aviso = document.querySelector("span");
const data = document.getElementById("data");

var produtoAlugar = JSON.parse(localStorage.getItem("produtoAlugar"))
var usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

console.log(usuarioAtual)

btnAlugar.addEventListener(("click"), function(event){
    event.preventDefault();
    let anoMesDia = retornaArrayData(data);
    var objPedido = processaDados(nome.value,pais.value,cep.value,complemento.value,anoMesDia);

    if(objPedido && anoMesDia.length>3){
        
        produtoAlugar.nome = objPedido.nome;
        produtoAlugar.pais = objPedido.pais;
        produtoAlugar.cep = objPedido.cep;
        produtoAlugar.complemento = objPedido.complemento;
        produtoAlugar.data = objPedido.data;

        usuarioAtual.livrosAlugados.push(produtoAlugar);
        localStorage.setItem("usuarioAtual",JSON.stringify(usuarioAtual));
        limparInput();
        alert("livro alugado - prazo de entrega: 2 dias - prazo para devolução marcado para: "+anoMesDia) //substituir por um pop-up estilizado
        window.location.href = "../telas/perfil.html"
    }
    else{
        aviso.innerHTML = "campos vazios, envie todas as informações"
        aviso.className = "erro"
    }



})

function limparInput(){
    nome.value = '';
    pais.value = '';
    cep.value = '';
    complemento.value = '';
}

function processaDados(nome,pais,cep,complemento,data){
    if(nome == null || pais == null || cep == null || complemento == null || data == null){
        return null;
    }
    else if (nome.trim() == "" || pais.trim() == "" || cep.trim() == "" || complemento.trim() == ""){
        return null;
    }

    return {
        nome: nome,
        pais:pais,
        cep:cep,
        complemento:complemento,
        data:data
    }
    
}

function teste(){
    const dataInput = document.getElementById("data").value; // Pega o valor do input
    const dataFormatadaISO = formatarDataParaISO(dataInput);
    var anoMesDia = dataFormatadaISO.split("-");
    anoMesDia = anoMesDia.filter((index) => index>=2).reverse();
    
    var objPedido = processaDados(nome.value,pais.value,cep.value,complemento.value,anoMesDia);

    if(objPedido && anoMesDia.length === 3){
        console.log(anoMesDia)
        console.log("sucesso")
    }
    else{
        aviso.innerHTML = "campos vazios, envie todas as informações"
        aviso.className = "erro"
    }
}


