const express = require("express")
const knex = require("knex")
const createErrors = require("http-errors")

const PORT = 8001;

const app = express()

app.use( express.json() )
app.use( express.urlencoded( {extended : true } ))

const conn = knex( { 
    client: "mysql" ,
    connection : {
        host : "localhost" ,
        user : "root" ,
        password : "" ,
        database : "loja"
    }
 })

 app.get( "/" , (req, res) => {
    res.json( { resposta : "Sejam bem-vindos à nossa Loja"} )
 })

 app.get( "/produtos" , (req, res, next) => {
    conn("produto")
        .then(  dados => res.json( dados ) )
        .catch( next )
 })

 app.get( "/produtos/:idProd" , (req, res, next) => {
    const id = req.params.idProd
    conn("produto")
        .where( "id" , id )
        .first()
        .then( dados => {
            if( !dados ){
                return next( createErrors( 404 , "Produto não encontrado") )
            }
            res.json( dados ) 
        })
        .catch( next )
 })

 app.post( "/produtos" , (req, res, next) => {
    conn("produto")
        .insert( req.body )
        .then(  dados => {
            if( !dados ){
                return next( createErrors( 400 , "Não foi possível inserir" ) )
            }
            res.status( 201 ).json( { 
                resposta : "Produto inserido!" ,
                id : dados[0]
            } )
            //res.json( dados ) 
        } )
        .catch( next )
 })


 app.put( "/produtos/:idProd" , (req, res, next) => {
    const id = req.params.idProd
    conn("produto")
        .where( "id" , id )
        .update( req.body )
        .then( dados => {
            if( !dados ){
                return next( createErrors( 404 , "Produto não encontrado") )
            }
            res.status(200).json( { resposta: "Produto editado!" } ) 
        })
        .catch( next )
 })

 app.delete( "/produtos/:idProd" , (req, res, next) => {
    const id = req.params.idProd
    conn("produto")
        .where( "id" , id )
        .delete()
        .then( dados => {
            if( !dados ){
                return next( createErrors( 404 , "Produto não encontrado") )
            }
            res.status(200).json( { resposta: "Produto removido!" } ) 
        })
        .catch( next )
 })

app.use( (err, req, res, next ) => {
    res
        .status( err.status || 500 )
        .json( { 
            erro :  err.message || "Erro interno do Servidor!" 
        } )
} ) 

 app.listen( PORT , ()=>{
    console.log( `Loja executando em: http://localhost:${PORT}` )
 } )