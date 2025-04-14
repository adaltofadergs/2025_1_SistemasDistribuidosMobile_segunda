const express = require("express")
const http = require( "http" )

const app = express()

produtos = [ "Coca-Cola" , "Pepsi", "Fanta"]

app.get( '/' , (req, res) => {
    res.status(200).send( "Bem-vindo(a) à nossa API REST")
})

app.get( '/produtos' , (req, res) => {
    res.status(200).send( produtos )
})

http.createServer(app).listen( 8001 , () => {
    console.log( 'Servidor iniciado em http://localhost:8001')
})

