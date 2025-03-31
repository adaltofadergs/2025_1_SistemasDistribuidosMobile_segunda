<?php

header("Content-type: application/json");

$local = "localhost";
$user = "root";
$senha = "";
$banco = "loja";

if( isset(  $_REQUEST["consultar"] ) ){

    try{
        $conn = mysqli_connect( $local , $user , $senha , $banco );

        if( $conn ){
            $sql = "SELECT * FROM produto ORDER BY nome";
            $result = mysqli_query( $conn , $sql  );

            $linhas = array();
            while( $row = mysqli_fetch_assoc( $result ) ){
                $linhas[] = $row;
            }
            mysqli_close( $conn );
            echo ' { "produtos" : '.json_encode( $linhas ).' } ';

        }else{
            echo ' { "resposta" : "Erro ao conectar com o banco de dados!" } ';
        }
    }catch( \Throwable $th ){
        echo ' { "resposta" : "Erro no servidor!" } ';
    }
}


if( isset(  $_REQUEST["inserir"] ) ){
    $nome = $_POST["name"];
    if( $nome != "" ){
        try{
            $conn = mysqli_connect( $local , $user , $senha , $banco );
            if( $conn ){
                $preco = $_POST["price"]; 
                $valor = 0.0;
                if( $preco != "" ) {
                    $valor = str_replace( "," , ".", $preco);
                }
                $sql = "INSERT INTO produto (nome, preco) VALUES ( '$nome' , $valor ) ";
                mysqli_query( $conn , $sql  );
                $id = mysqli_insert_id( $conn );
                mysqli_close( $conn );
                echo ' { "id" : '.$id.' } ';

            }else{
                echo ' { "resposta" : "Erro ao conectar com o banco de dados!" } ';
            }
        }catch( \Throwable $th ){
            echo ' { "resposta" : "Erro no servidor!" } ';
        }
    }else{
        echo ' { "resposta" : "O campo Nome é obrigatório" } ';
    }
}