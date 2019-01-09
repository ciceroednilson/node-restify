var clients = require('restify-clients');

var client = clients.createJsonClient({
  url: 'http://localhost:3000',
  version: '1.0'
});

client.get('/pessoa', function (err, req, res, pessoas) {

 
    pessoas.forEach(pessoa => {

        console.log("\nCÓDIGO: " +  pessoa.codigo + " NOME: " + pessoa.nome + " IDADE: " + pessoa.idade + "\n");

    });



});