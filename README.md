# Pizza Shop API
Uma aplicação backend, utilizando Bun com Elysia. A ideia da aplicação é um controle de restaurante. 

 ## Tecnologias

 Esse projeto foi desenvolvido com as seguintes tecnologias:

 - [Bun](https://bun.sh/) 
 - [Elysia JS](https://elysiajs.com/)
 - [Drizzle ORM](https://orm.drizzle.team/)
 - [Zod](https://zod.dev/)
 - [Typescript](https://www.typescriptlang.org/)

 ## Como rodar o projeto.
 Para conseguir executar esse projeto em sua máquina, é necessário seguir os seguintes passos

 1 - Instalar as dependências

 ```bash
    bun install
```

 2 - Criar o banco de dados utilizando o docker compose 

 ```bash
    docker compose up -d
```

 3 - Inserir as migrations dos bancos de dados.

 ```bash
    bun migrate
```

 4 - Inserir as migrations dos bancos de dados para ter alguns dados pré cadastrados para fins de testes da aplicação (Esse passo é opcional, mas recomendo fortemente que o siga).


 ```bash
    bun seed
```
 5- Para rodar a aplicação e consumir as rotas, rode o seguinte comando:

 ```bash
    bun dev
```

## Dúvidas
Se tiver alguma dúvida ou sugestão para esse projeto, pode criar alguma issue ou então entrar em contato direto comigo aqui no GitHub ou então no Linkedin (Está na descrição do meu perfil).