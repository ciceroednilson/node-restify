# Restify - criação de uma API e um Cliente.

Esse código tem como objetivo mostrar o uso do framework Restify para criar e consumir uma api rest.

## Pacotes necessários para criação da API.

```bash
npm install csv-reader --save
npm install csv-write-stream  --save
npm install nodemon --save
npm install restify --save
npm install restify-router --save
```

## Pacotes necessários para criação do Cliente.

```bash
npm install restify --save
npm install restify-clients --save
```

## Estrutura da API.

[imagemServer]


## API com Restify.

No arquivo pessoaController.js temos o método get que vai retornar os registros de pessoas que estão em um arquivo csv.


```java
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
```
No arquivo app.js vamos ter a criação do nosso server e o registro da nossa rota que criamos no pessoaController.js.

```java
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

```
## Execução da API.

Para executar a api basta ir até um terminal e acessar o diretório raiz da aplicação e executar o comando abaixo.

```bash
node app.js
```
ou 

```bash
nodemon app.js
```

Endereço do método.
http://localhost:3000/pessoa .

Resultado da chamada da API.
```java
[{"codigo":1,"nome":"Cícero","idade":32,"endereco":"Centro"},{"codigo":2,"nome":"Joao","idade":33,"endereco":"Avenida Tio San"},{"codigo":3,"nome":"Yuri","idade":10,"endereco":"Rua Maria"},{"codigo":4,"nome":"Maria","idade":50,"endereco":"Avenida Brasil"},{"codigo":5,"nome":"Ana","idade":70,"endereco":"Rua Rio de Janeiro"}]
```


## Estrutura do Cliente.

[imagemCLiente]

## Cliente com Restify.

No arquivo app.js vamos ter a chamada da nossa api e o tratamento dos dados de retorno.

```java
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
```

## Executando o Cliente.

Para executar o cliente basta ir até um terminal e acessar o diretório raiz da aplicação e executar o comando abaixo.

```bash
node app.js
```

E então vamos ter o resultado abaixo.

```bash
CÓDIGO: 1 NOME: Cícero IDADE: 32


CÓDIGO: 2 NOME: Joao IDADE: 33


CÓDIGO: 3 NOME: Yuri IDADE: 10


CÓDIGO: 4 NOME: Maria IDADE: 50


CÓDIGO: 5 NOME: Ana IDADE: 70
```


