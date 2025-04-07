var http = require('http')
var mysql = require('mysql')

const hostname = '127.0.0.1'
const port = 3000

var conn = mysql.createConnection( { 
    host : "localhost" ,
    user : "root" ,
    password : "" ,
    database : "loja"
 } )

 const server = http.createServer( (req, res) => {
    res.statusCode = 200
    res.setHeader( 'Content-type' , 'application/json' )
    try{
        
        if( conn.state != "authenticated" ){
            conn.connect( function(erro){
                if( erro ){
                    res.end( ' { "resposta" : "Erro na conexão!" } ' )
                }else{
                    consultar(res)
                }
            })
        }else{
            consultar(res)
        } 
    }catch( error) {
        res.end( ' { "resposta" : "Erro no servidor!" } ' )
    }
 })

 function consultar(res){
    var sql = "SELECT * FROM produto ORDER BY nome "
    conn.query( sql , function( err, result , fields ){
        if (err) {
            res.end( ' { "resposta" : "Erro na consulta!" } ' )
        }else{
            res.end( JSON.stringify(result) )
        }
    })
 }

 server.listen( port , hostname , ()=> {
    console.log( `Servidor sendo executado em: http://${hostname}:${port}` )
 })

 //Exercício: Criar no banco de dados a tabela cliente
 // que deve conter as colunas id, nome, altura
 // contruir um arquivo chamado listarClientes.js contendo um servidor NODE que
 // responde com a lista de clientes, ordenado pela altura.