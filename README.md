### Regras da aplicação

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  > *As refeições devem ser relacionadas a um usuário.*
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível recuperar as métricas de um usuário
  - [x] Quantidade total de refeições registradas
  - [x] Quantidade total de refeições dentro da dieta
  - [x] Quantidade total de refeições fora da dieta
  - [x] Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

### Depedencias

## Dependências

### @fastify/cookie
Plugin para Fastify que adiciona suporte a cookies. Utilizado para gerenciar cookies nas requisições HTTP.

### @fastify/cors
Plugin para Fastify que adiciona suporte a CORS (Cross-Origin Resource Sharing). Utilizado para permitir ou restringir requisições de diferentes origens.

### @fastify/swagger
Plugin para Fastify que adiciona suporte à documentação de APIs usando Swagger. Utilizado para gerar documentação interativa das rotas da API.

### @fastify/swagger-ui
Plugin para Fastify que adiciona uma interface gráfica para a documentação Swagger. Utilizado para visualizar e testar as rotas da API.

### @types/supertest
Tipos TypeScript para a biblioteca Supertest. Utilizado para realizar testes de integração das rotas da API.

### better-sqlite3
Biblioteca SQLite de alto desempenho para Node.js. Utilizado como driver de banco de dados SQLite.

### dotenv
Biblioteca para carregar variáveis de ambiente de um arquivo `.env`. Utilizado para gerenciar configurações sensíveis e específicas do ambiente.

### fastify
Framework web rápido e de baixo overhead para Node.js. Utilizado como o servidor HTTP principal do projeto.

### fastify-type-provider-zod
Plugin para Fastify que adiciona suporte ao Zod como provedor de tipos. Utilizado para validação de esquemas de dados.

### knex
Query builder SQL para Node.js. Utilizado para interagir com bancos de dados relacionais.

### pg
Driver PostgreSQL para Node.js. Utilizado como driver de banco de dados PostgreSQL.

### sqlite
Driver SQLite para Node.js. Utilizado como driver de banco de dados SQLite.

### supertest
Biblioteca para testar APIs HTTP. Utilizado para realizar testes de integração das rotas da API.

### tsx
Ferramenta para executar arquivos TypeScript diretamente. Utilizado para desenvolvimento e execução de scripts TypeScript.

### typescript
Superset de JavaScript que adiciona tipagem estática. Utilizado para desenvolvimento com TypeScript.

### vitest
Framework de testes para projetos TypeScript. Utilizado para escrever e executar testes unitários e de integração.

### zod
Biblioteca de validação de esquemas TypeScript. Utilizado para definir e validar esquemas de dados.

## Dependências de Desenvolvimento

### @eslint/js
Configurações recomendadas do ESLint para JavaScript. Utilizado para linting de código JavaScript.

### @types/node
Tipos TypeScript para Node.js. Utilizado para fornecer tipagem estática para APIs do Node.js.

### eslint
Ferramenta de linting para JavaScript e TypeScript. Utilizado para garantir a qualidade e consistência do código.

### eslint-config-prettier
Desativa regras do ESLint que conflitam com o Prettier. Utilizado para integração entre ESLint e Prettier.

### eslint-plugin-prettier
Executa o Prettier como uma regra do ESLint. Utilizado para aplicar formatação de código com Prettier.

### globals
Lista de variáveis globais para diferentes ambientes. Utilizado para configurar variáveis globais no ESLint.

### prettier
Ferramenta de formatação de código. Utilizado para garantir a consistência da formatação do código.

### tsup
Empacotador de código TypeScript. Utilizado para construir o projeto para produção.

### typescript-eslint
Integração entre TypeScript e ESLint. Utilizado para linting de código TypeScript.

## Scripts

### dev
Executa o servidor em modo de desenvolvimento com hot-reloading.

### build
Compila o código TypeScript para JavaScript.

### lint
Executa o ESLint para verificar a qualidade do código.

### lint:fix
Executa o ESLint e corrige problemas de formatação automaticamente.

### knex
Executa comandos do Knex CLI.

### test
Executa os testes usando Vitest.