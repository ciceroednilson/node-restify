var Router  = require('restify-router').Router;
var restify = require('restify');

var pessoaController = require("./controller/pessoaController");
 
//CRIANDO O SERVIDOR
const server = restify.createServer({
  name: 'app-rest-pessoa-restify',
  version: '1.0.0'
});
 
//PORTA
const port = 3000;


//O BODY VAI SER CONVERTIDO EM JSON
server.use(restify.plugins.jsonBodyParser());

//ESSE PARAMETRO GARANTE QUE O SERVIDOR VAI TRATAR O TIPO DE DADO QUE ESTAMOS ESEPRADO,
//CASO VENHA UM FORMATO NÃO TRATADO O CLIENTE VAI  RECEBER O "NotAcceptableError (406)".
server.use(restify.plugins.acceptParser(server.acceptable));

//ADICIONANDO AS ROTAS DO CONTROLLER PESSOA
pessoaController.applyRoutes(server);

server.listen(port, function () {
  console.log('aplicação executando na porta ', port);
});

