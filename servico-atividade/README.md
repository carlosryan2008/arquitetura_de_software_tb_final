# Serviço de Atividades e Comunicação

Serviço responsável por fóruns de discussão, mensagens privadas e sistema de avaliações com correção automática.

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
DATABASE_URL="postgresql://user:password@localhost:5436/atividades?schema=public"
PORT=3005
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

### Fóruns

- `POST /forums` - Cria um fórum para um curso
- `GET /forums/:id` - Busca um fórum específico
- `GET /courses/:courseId/forums` - Lista fóruns de um curso

### Tópicos

- `POST /topics` - Cria um tópico de discussão
- `GET /topics/:id` - Busca um tópico específico
- `GET /forums/:forumId/topics` - Lista tópicos de um fórum

### Postagens

- `POST /posts` - Cria uma postagem em um tópico
- `GET /topics/:topicId/posts` - Lista postagens de um tópico

### Mensagens Privadas

- `POST /private-messages` - Envia mensagem privada
- `GET /private-messages/:id` - Busca uma mensagem
- `GET /users/:userId/private-messages` - Lista mensagens de um usuário
- `PATCH /private-messages/:id/read` - Marca mensagem como lida

### Avaliações

- `POST /assessments` - Cria uma avaliação
- `GET /assessments/:id` - Busca uma avaliação
- `GET /courses/:courseId/assessments` - Lista avaliações de um curso

### Questões

- `POST /questions` - Cria uma questão (objetiva ou dissertativa)
- `GET /assessments/:assessmentId/questions` - Lista questões de uma avaliação

### Submissões

- `POST /submissions` - Submete resposta (correção automática para questões objetivas)
- `GET /submissions/:id` - Busca uma submissão
- `GET /assessments/:assessmentId/submissions` - Lista submissões de uma avaliação
- `GET /users/:userId/submissions` - Lista submissões de um usuário

## Modelo de Dados

### Forum
- `id`, `courseId`, `name`, `description`

### Topic
- `id`, `forumId`, `userId`, `title`, `content`

### Post
- `id`, `topicId`, `userId`, `content`

### PrivateMessage
- `id`, `senderId`, `receiverId`, `courseId`, `subject`, `content`, `read`

### Assessment
- `id`, `courseId`, `title`, `description`, `startDate`, `endDate`

### Question
- `id`, `assessmentId`, `type` (OBJECTIVE/ESSAY), `question`, `options[]`, `correctAnswer`, `points`, `order`

### Submission
- `id`, `assessmentId`, `userId`, `status` (PENDING/GRADED/RETURNED), `submittedAt`

### SubmissionAnswer
- `id`, `submissionId`, `questionId`, `answer`

### Grade
- `id`, `submissionId`, `totalScore`, `maxScore`, `percentage`, `feedback`

## Exemplos de Requisição

### Criar Fórum

```json
POST /forums

{
  "courseId": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Fórum de Discussão",
  "description": "Discussões sobre o curso"
}
```

### Criar Tópico

```json
POST /topics

{
  "forumId": "123e4567-e89b-12d3-a456-426614174001",
  "userId": "123e4567-e89b-12d3-a456-426614174002",
  "title": "Dúvida sobre TypeScript",
  "content": "Como usar generics?"
}
```

### Criar Avaliação com Questões

```json
POST /assessments

{
  "courseId": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Avaliação Final",
  "description": "Avaliação sobre TypeScript",
  "startDate": "2024-12-20T00:00:00Z",
  "endDate": "2024-12-25T23:59:59Z"
}

POST /questions

{
  "assessmentId": "...",
  "type": "OBJECTIVE",
  "question": "Qual é a sintaxe correta para definir um tipo genérico?",
  "options": ["<T>", "<Type>", "Generic<T>", "T<>"],
  "correctAnswer": "A",
  "points": 10,
  "order": 1
}
```

### Submeter Avaliação

```json
POST /submissions

{
  "assessmentId": "123e4567-e89b-12d3-a456-426614174003",
  "userId": "123e4567-e89b-12d3-a456-426614174002",
  "answers": [
    {
      "questionId": "123e4567-e89b-12d3-a456-426614174004",
      "answer": "A"
    }
  ]
}

Resposta (com correção automática):
{
  "id": "...",
  "status": "GRADED",
  "grade": {
    "totalScore": 10,
    "maxScore": 10,
    "percentage": 100
  }
}
```

## Correção Automática

- **Questões Objetivas**: Corrigidas automaticamente comparando a resposta do aluno com `correctAnswer`
- **Questões Dissertativas**: Requerem correção manual (não calculadas automaticamente)
- A nota é calculada automaticamente e o status da submissão é atualizado para `GRADED`

## Observações

- Este serviço não possui autenticação/autorização. Todas as rotas são públicas.
- A correção automática funciona apenas para questões objetivas.
- Questões dissertativas precisam de correção manual posterior.
- O sistema valida se a avaliação está dentro do prazo antes de permitir submissão.

