pessoa = {
    nome : "Maria" ,
    idade : 25 ,
    altura : 1.75 ,
    anoFormacao : [ 2006 , 2013 , 2017 ] ,
    formacao : [ "Técnico" , "Graduação" , "Mestrado" ] ,
    casado : true ,
    conjuge : { nome : "José" , idade : 26 } ,
    filhos : [
        { nome : "Júlia" , idade : 5 } ,
        { nome : "Pedro" , idade : 3 }
    ] ,
    endereco : null ,
    getInfos : function(){
        return this.nome + " - Idade: " + this.idade;
    }
}

function lerObjeto(){
    var divObj = document.getElementById("divObjeto");
    txt = "Nome: " + pessoa.nome + "<br>";
    txt += "Idade: " + pessoa.idade + "<br>";
    txt += "Formações: ";
    pessoa.formacao.forEach( form => {
        txt += form + " - ";
    });

    txt += "<br>Casado(a)?: ";
    if( pessoa.casado ){ 
        txt += "SIM";
        txt += "<br>Cônjuge: " + pessoa.conjuge.nome;
    }else
        txt += "NÃO";
    txt += "<br>Filhos: ";
    if( pessoa.filhos.length > 0 ){
        pessoa.filhos.forEach( filho => {
            txt += "<br>" + filho.nome + " - Idade: " + filho.idade;
        });
    }else{
        txt += "Não possui";
    }

    txt += "<br><hr>"+ pessoa.getInfos();

    divObj.innerHTML = txt;
    divObj.style.background = "black";
    divObj.style.color = "white";
    divObj.style.padding = "20px";
    divObj.style.width = "50%";

 
}