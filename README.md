# Edu Connect - Arquitetura de Software

Este projeto é uma aplicação baseada em microserviços, composta por um **API Gateway** e um **Serviço de Autenticação**, utilizando Docker para o banco de dados PostgreSQL.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* **Node.js** (Versão compatível com a 20 ou superior)
* **Docker** e **Docker Compose**
* **PNPM** (Gerenciador de pacotes recomendado, pois é utilizado no `api-gateway`)

---

## 🚀 Configuração do Ambiente (.env)

Você precisará criar arquivos `.env` em dois diretórios diferentes.

### 1. API Gateway

Crie um arquivo `.env` dentro da pasta `api-gateway/` com as seguintes variáveis:

```properties
# api-gateway/.env
PORT=3000
JWT_SECRET=sua_chave_secreta_super_segura

```

### 2. Serviço de Autenticação

Crie um arquivo `.env` dentro da pasta `servico-autenticacao/`. Como este arquivo é usado tanto pelo Node.js quanto pelo Docker Compose para subir o banco, ele precisa das credenciais do banco e do Prisma:

```properties
# servico-autenticacao/.env

# Configuração da Aplicação
JWT_SECRET=sua_chave_secreta_super_segura

# Configuração do Banco de Dados (Para o container Docker)
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=auth_db

# URL de Conexão do Prisma
# A estrutura é: postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public
DATABASE_URL="postgresql://admin:admin@localhost:5432/auth_db?schema=public"

```

---

## 📦 Instalação e Execução

### Passo 1: Subir o Banco de Dados

Na raiz do projeto (onde está o `docker-compose.yml`), execute o comando para iniciar o container do PostgreSQL:

```bash
docker-compose up -d

```

*Isso iniciará o container `service_auth_db` na porta 5432.*

### Passo 2: Configurar o Serviço de Autenticação

Navegue até a pasta do serviço, instale as dependências e configure o banco de dados com o Prisma:

```bash
cd servico-autenticacao

# Instalar dependências
pnpm install

# Gerar o cliente do Prisma (baseado no schema.prisma)
pnpm dlx prisma generate

# Rodar as migrações para criar as tabelas no banco de dados
pnpm dlx prisma migrate dev --name init

# Rodar o projeto em modo de desenvolvimento
pnpm run dev

```

*O serviço rodará observando alterações no arquivo `src/index.ts`.*

### Passo 3: Configurar o API Gateway

Abra um novo terminal, navegue até a pasta do gateway e inicie o serviço:

```bash
cd api-gateway

# Instalar dependências
pnpm install

# Rodar o projeto em modo de desenvolvimento
pnpm run dev

```

*O gateway rodará observando alterações e lendo o arquivo `.env`.*

---

## 🛠 Comandos Úteis do Prisma

Dentro da pasta `servico-autenticacao`, você pode usar os seguintes comandos:

* **`pnpm dlx prisma studio`**: Abre uma interface visual no navegador para ver e editar os dados do banco.
* **`pnpm dlx prisma migrate dev`**: Cria uma nova migração baseada nas alterações do `schema.prisma`.
* **`pnpm dlx prisma generate`**: Atualiza a tipagem do cliente Prisma após mudanças no schema.

---

## 🧱 Estrutura do Projeto

* **api-gateway**: Porta de entrada da aplicação, lida com roteamento e proxy.
* **servico-autenticacao**: Gerencia usuários, login e tokens JWT.
* **docker-compose.yml**: Orquestração do banco de dados Postgres.
