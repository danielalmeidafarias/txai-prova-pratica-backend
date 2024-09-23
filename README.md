# TXAI Prova Prática Backend

## Descrição
- Esta é uma API de gerenciamento de produtos desenvolvida como parte de um desafio técnico. A aplicação permite a criação, leitura, atualização e exclusão de produtos, utilizando o framework Nest.js e o banco de dados MySQL.

## Tecnologias Utilizadas
- **Nest.js**: Framework para construção de aplicações Node.js eficientes e escaláveis.
- **Prisma**: ORM para facilitar a interação com o banco de dados.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **JWT**: Para autenticação segura.
- **Docker**: Para containerização da aplicação e do banco de dados.

## Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:
- Node.js (versão >= 16)
- Docker e Docker Compose

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone <URL do repositório>
   cd txai-prova-pratica-backend
   ```
2. Instale as dependências:

```bash
npm install
```

## Confguração
- Configuração do Banco de Dados: Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DB"
JWT_SECRET="DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE."
COOKIES_SECRET="another super secret string"
```
* Substitua as chaves pelos valores corretos para o seu ambiente.

## Inicie o banco de dados com Docker:
* Certifique-se de ter um docker-compose.yml configurado para o MySQL.
```bash
docker-compose up -d
```

## Execute as migrations do Prisma:
```bash
npm run migrate
```

6. Inicie a aplicação: Para iniciar o servidor em modo de desenvolvimento, execute:
```bash
npm run start:dev
```


## Scripts Disponíveis
npm run build: Compila a aplicação.
npm run format: Formata o código com Prettier.
npm run start: Inicia a aplicação.
npm run start:dev: Inicia a aplicação em modo de desenvolvimento.
npm run test: Executa os testes.
npm run lint: Executa o linter no código.
npm run migrate: Executa as migrações do Prisma.
npm run generate: Gera o cliente do Prisma.
