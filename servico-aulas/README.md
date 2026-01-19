# Serviço de Conteúdo de Aulas

Serviço responsável pelo gerenciamento de aulas gravadas (YouTube) e sessões ao vivo (Google Meet).

## Tecnologias

- Node.js
- Express.js
- Prisma ORM
- Zod (validação)
- TypeScript

## Estrutura

O serviço segue uma arquitetura simples:

- **Controllers**: Funções Express que recebem requisições HTTP, validam dados com Zod e retornam respostas
- **Services**: Contêm a lógica de negócio
- **Repositories**: Acesso ao banco de dados via Prisma

## Configuração

1. Instale as dependências:
```bash
pnpm install
```

2. Configure as variáveis de ambiente criando um arquivo `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5434/conteudo_aulas?schema=public"
PORT=3003
```

3. Execute as migrações do Prisma:
```bash
pnpm prisma:migrate
```

4. Gere o cliente Prisma:
```bash
pnpm prisma:generate
```

5. Inicie o servidor:
```bash
pnpm dev
```

## Rotas

### Aulas (Lessons)

- `GET /lessons` - Lista todas as aulas
  - Query params: `userId`, `moduleId`
- `GET /lessons/:id` - Busca uma aula específica
- `POST /lessons` - Cria uma nova aula
- `PUT /lessons/:id` - Atualiza uma aula
- `DELETE /lessons/:id` - Remove uma aula

### Sessões ao Vivo (Live Sessions)

- `GET /live-sessions` - Lista todas as sessões ao vivo
  - Query params: `userId`, `moduleId`
- `GET /live-sessions/:id` - Busca uma sessão específica
- `POST /live-sessions` - Cria uma nova sessão ao vivo
- `PUT /live-sessions/:id` - Atualiza uma sessão ao vivo
- `DELETE /live-sessions/:id` - Remove uma sessão ao vivo

## Modelo de Dados

### Lesson (Aula)
- `id`: UUID
- `userId`: ID do usuário
- `moduleId`: ID do módulo
- `name`: Nome da aula
- `description`: Descrição (opcional)
- `url`: URL do YouTube
- `duration`: Duração em minutos
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

### LiveSession (Sessão ao Vivo)
- `id`: UUID
- `userId`: ID do usuário
- `moduleId`: ID do módulo
- `name`: Nome da sessão
- `description`: Descrição (opcional)
- `link`: Link do Google Meet
- `duration`: Duração em minutos
- `scheduledAt`: Data e hora agendada
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

## Exemplos de Requisição

### Criar Aula

```json
POST /lessons

{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "moduleId": "123e4567-e89b-12d3-a456-426614174001",
  "name": "Introdução ao TypeScript",
  "description": "Primeira aula do curso",
  "url": "https://www.youtube.com/watch?v=example",
  "duration": 45
}
```

### Criar Sessão ao Vivo

```json
POST /live-sessions

{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "moduleId": "123e4567-e89b-12d3-a456-426614174001",
  "name": "Aula ao Vivo - Q&A",
  "description": "Sessão de perguntas e respostas",
  "link": "https://meet.google.com/abc-defg-hij",
  "duration": 60,
  "scheduledAt": "2024-12-20T14:00:00Z"
}
```

## Observações

Este serviço não possui autenticação/autorização. Todas as rotas são públicas.

