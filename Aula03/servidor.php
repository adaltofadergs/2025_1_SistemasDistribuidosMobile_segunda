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

            echo ' { "produtos" : '.json_encode( $linhas ).' } ';

        }else{
            echo ' { "resposta" : "Erro ao conectar com o banco de dados!" } ';
        }
    }catch( \Throwable $th ){
        echo ' { "resposta" : "Erro no servidor!" } ';
    }
}