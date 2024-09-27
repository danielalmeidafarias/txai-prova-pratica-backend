# TXAI Prova Prática Backend
## Descrição
- Esta é uma API de gerenciamento de produtos desenvolvida como parte de um desafio técnico. A aplicação permite a criação, leitura, atualização e exclusão de produtos, utilizando o framework Nest.js e o banco de dados MySQL.
* A api está disponível em https://txai-prova-pratica-backend-1.onrender.com/api
* O deploy foi realizado no plano gratuito, por isso, algumas requisições podem demorar mais que o normal...

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
   git clone https://github.com/danielalmeidafarias/txai-prova-pratica-backend.git
   cd txai-prova-pratica-backend
   ```
2. Instale as dependências:

```bash
npm install
```

## Confguração
- Configuração do Banco de Dados: Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
DATABASE_URL="mysql://root:root@localhost:3306/txai"
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
## Rode o seeder do banco de dados:
1. É criado um usuário com login=admin-master e senha=123456789@
   - Esse usuário obtém recursos de MASTER
   - Apenas o usuário MASTER pode promover um usuário a ADMIN
2. É adicionado no banco alguns usuário e produtos para teste
```bash
npx prisma db seed
```

6. Inicie a aplicação: Para iniciar o servidor em modo de desenvolvimento, execute:
```bash
npm run start:dev
```

7. Abra localhost:3000/api para Documentação

## Scripts Disponíveis
- npm run build: Compila a aplicação.
- npm run start: Inicia a aplicação.
- npm run start:dev: Inicia a aplicação em modo de desenvolvimento.
- npm run test: Executa os testes.
