function buscarProdutos(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            objJSON = JSON.parse( this.responseText );
            if( objJSON.resposta  ){
                alert( objJSON.resposta );
            }else{
                txt =   ' <table border="1" >';
                txt +=  '    <tr>';
                txt +=  '       <th>ID</th>';
                txt +=  '       <th>Nome</th>';
                txt +=  '       <th>Preço</th>';
                txt +=  '    </tr>';

                var produtos = objJSON.produtos;
                produtos.forEach( prod => {
                    txt += '<tr>';
                    txt += '    <td>' + prod.id + '</td>';
                    txt += '    <td>' + prod.nome + '</td>';
                    txt += '    <td>' + prod.preco + '</td>';
                    txt += '</tr>';
                });
                txt += '</table>';
                document.getElementById("divProdutos").innerHTML = txt;
            }

        }else if(this.readyState == 4){
            alert( this.responseText );
        }
    };
    req.open("GET" , "servidor.php?consultar", true );
    req.send();
}

function adicionar(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            objJSON = JSON.parse( this.responseText );
            if( objJSON.resposta  ){
                alert( objJSON.resposta );
            }else{
               
                alert( 'ID: ' + objJSON.id );
                buscarProdutos();

            }

        }else if(this.readyState == 4){
            alert( this.status + " - " + this.responseText );
        }
    };
    req.open("POST" , "servidor.php?inserir", true );

    req.setRequestHeader( "Content-type" , "application/x-www-form-urlencoded" );

    nome = document.getElementById("txtNome").value;
    preco = document.getElementById("txtPreco").value;

    req.send("name=" + nome + "&price=" + preco);
}