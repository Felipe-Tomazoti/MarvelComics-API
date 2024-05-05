# Dinastia M 🏹

Este repositório contém uma API desenvolvida em TypeScript utilizando o framework Fastify, 
integrada com o banco de dados Prisma e documentada com Swagger e Postman. 
O projeto tem como foco: fornecer dados relacionados à saga da Marvel, especificamente a "Dinastia M".
#
### Alunos: 
- Felipe Cesar Tomazoti de Souza, RA: 22019977-2
- Vagner Rodrigues Calado Junior, RA: 22014296-2
___
### Instalação
<a href="https://www.docker.com/">Docker</a> - Para criar o container do banco de dados - PostgreSQL

![image](https://github.com/Felipe-Tomazoti/MarvelComics-API/assets/126637375/b6637aed-be05-462e-9b6e-ca1e656f6d0a)
#
### Iniciando o projeto
#### Clone o projeto para sua máquina local: 
`$ git clone https://github.com/Felipe-Tomazoti/MarvelComics-API.git`

![image](https://github.com/Felipe-Tomazoti/MarvelComics-API/assets/126637375/0f9e1281-36dd-4d61-8a19-92deaec88c3a)


#### Execute o seguinte comando para rodar a API:
`npm start`
#
### Logo após esse comando, você ja pode testar as rotas da api! 😄
#### Swagger: 
- Para utilizar o swagger, basta entrar na URL a baixo ⬇️.
- http://localhost:3000/doc/static/index.html
#### Postman:
- Para utilizar o postman se faz necessário baixar o arquivo disponível no link a baixo ⬇️, e depois importar no Postman.
- https://drive.google.com/file/d/1TUVBIWLXAoHIohlzVEp28rIboB3g3K8t/view?usp=sharing

  ![image](https://github.com/Felipe-Tomazoti/MarvelComics-API/assets/126637375/eef3e914-8570-4802-9eaa-183b29f8a589)

#

### Inserindo a Saga: 'Dinastia M' 👑
Com o servidor e o docker rodando, nós já podemos popular nosso Banco de Dados!. Como passei acima, temos duas maneiras fáceis de utilizar a API, e para popular nosso banco de dados, basta executar a rota: /startApi !

![image](https://github.com/Felipe-Tomazoti/MarvelComics-API/assets/126637375/7c777268-b230-4fcc-ad87-c449fd3027d3)

___

### Testes 🕵️
#### Testes de Carga:
Para rodar os testes de carga, precisamos estar com o servidor e o docker rodando!. Além disso, o ideal é nós popularmos o banco de dados(Como ensinado a cima!) para termos um melhor feedback...
Então, para executarmos os testes de cada entidade, temos os seguintes comandos:

`npm run cannonComic`

`npm run cannonCreator`

`npm run cannonCharacter`

#### Testes E2E:
Para rodar os testes e2e, se faz necessário parar somente o SERVIDOR!, o container do docker precisa estar ativo a todo momento...
Então, para executarmos os testes, execute no terminal, o seguinte comando:

`npm test`

Para subir o servidor novamente, execute:

`npm run dev`

### Isso é tudo pessoal, muito obrigado se você leu até aqui e tenha um ótimo dia! 😉
___

## House of M 🏹

This repository contains an API developed in TypeScript using the Fastify, 
integrated with the Prisma database and documented with Swagger and Postman. 
The project's focus is to provide data related to the Marvel saga, specifically "House of M".
___

### Students: 
- Felipe Cesar Tomazoti de Souza, RA: 22019977-2
- Vagner Rodrigues Calado Junior, RA: 22014296-2
___
### Installation
<a href="https://www.docker.com/">Docker</a> - To create the database container - PostgreSQL

![image](https://github.com/Felipe-Tomazoti/MarvelComics-API/assets/126637375/b6637aed-be05-462e-9b6e-ca1e656f6d0a)
#
### Starting the Project
#### Clone the project to your local machine: 
`$ git clone https://github.com/Felipe-Tomazoti/MarvelComics-API.git`

![image](https://github.com/Felipe-Tomazoti/MarvelComics-API/assets/126637375/0f9e1281-36dd-4d61-8a19-92deaec88c3a)


#### Run the following command to launch the API:
`npm start`
#
### After this command, you can test the api routes! 😄
#### Swagger: 
- To use the swagger, simply enter the following URL ⬇️.
- http://localhost:3000/doc/static/index.html
#### Postman:
- To use Postman you need to download the file available at the following link ⬇️, and then import it into Postman.
- https://drive.google.com/file/d/1TUVBIWLXAoHIohlzVEp28rIboB3g3K8t/view?usp=sharing

  ![image](https://github.com/Felipe-Tomazoti/MarvelComics-API/assets/126637375/eef3e914-8570-4802-9eaa-183b29f8a589)

#

### Inserting the Saga: 'House of M' 👑
With the server and docker running, we can now populate our database! As I said above, there are two easy ways to use the API, and to populate our database, just run the route: /startApi !

![image](https://github.com/Felipe-Tomazoti/MarvelComics-API/assets/126637375/7c777268-b230-4fcc-ad87-c449fd3027d3)

___

### Tests 🕵️
#### Load tests:
To run the load tests we need to have the server and docker running! In addition, we should ideally populate the database (as explained above!) to get better feedback...
So, to run the tests for each entity, we have the following commands:

`npm run cannonComic`

`npm run cannonCreator`

`npm run cannonCharacter`

#### Tests E2E:
To run the e2e tests, you only need to stop the SERVER! the docker container needs to be active at all times...
So, to run the tests, run the following command in the terminal:

`npm test`

To bring up the server again, run:

`npm run dev`

### That's all folks, thank you very much if you've read this far and have a great day! 😉
