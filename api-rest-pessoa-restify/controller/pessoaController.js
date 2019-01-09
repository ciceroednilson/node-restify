var Router = require('restify-router').Router;

var fs = require('fs');

var csvReadableStream = require('csv-reader');

var csvWriter = require('csv-write-stream');

const routerPessoa = new Router();

routerPessoa.get("/pessoa",function(req, res, next){
    
    var pessoa;
    var arrayPessoa = new Array();

    //CAMINHO DO ARQUIVO CSV
    var inputStream = fs.createReadStream("./csv/pessoas.csv", 'utf8');

    //PARAMETROS PARA TRATAR O ARQUIVO CSV
    var params = csvReadableStream({ parseNumbers: true, trim: true });
    
    inputStream.pipe(params)
        .on('data', function (row) {
            
            //CRIANDO O OBJETO PESSOA E SETANDO OS VALORES
            pessoa = new Object();
            pessoa.codigo   = row[0];
            pessoa.nome     = row[1];
            pessoa.idade    = row[2];
            pessoa.endereco = row[3];

            //ADICIONA UMA PESSOA A LISTA
            arrayPessoa.push(pessoa);

            
        })
        .on('end', function (data) {
            
            //APÓS LER TODOS OS REGISTROS DO ARQUIVO CSV RETORNAMOS O JSON            
            res.json(arrayPessoa);
    
            return next();   
        });     

});

module.exports = routerPessoa;