# Serviço de Catálogo de Cursos

Serviço responsável pelo CRUD de cursos, incluindo módulos de conteúdo.

## Tecnologias

- Node.js
- Express.js
- Prisma ORM
- Zod (validação)
- TypeScript

## Estrutura

O serviço segue uma arquitetura simples e direta:

- **Controllers**: Funções Express que recebem requisições HTTP, validam dados com Zod e retornam respostas
- **Services**: Contêm a lógica de negócio
- **Repositories**: Acesso ao banco de dados via Prisma

```
src/
├── application/
│   ├── controllers/     # Handlers HTTP diretos
│   ├── services/        # Lógica de negócio
│   ├── repositories/    # Acesso ao banco
│   └── errors/          # Erros customizados
└── server/
    └── index.ts         # Configuração Express
```

## Configuração

1. Instale as dependências:
```bash
pnpm install
```

2. Configure as variáveis de ambiente criando um arquivo `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5433/catalogo_cursos?schema=public"
PORT=3002
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

Todas as rotas são públicas (sem autenticação):

- `GET /courses` - Lista todos os cursos (com paginação e filtros)
  - Query params: `page`, `limit`, `category`, `level`, `teacherId`
- `GET /courses/:id` - Busca um curso específico
- `POST /courses` - Cria um novo curso
- `PUT /courses/:id` - Atualiza um curso
- `DELETE /courses/:id` - Remove um curso

## Modelo de Dados

### Course
- `id`: UUID
- `name`: Nome do curso
- `description`: Descrição do curso
- `value`: Valor do curso (número)
- `teacherId`: ID do professor responsável
- `category`: Categoria do curso
- `level`: Nível do curso
- `duration`: Duração em horas
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

### Module
- `id`: UUID
- `courseId`: ID do curso
- `title`: Título do módulo
- `description`: Descrição do módulo (opcional)
- `order`: Ordem do módulo no curso
- `content`: Conteúdo do módulo
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

## Exemplo de Requisição

### Criar Curso

```json
POST /courses

{
  "name": "Curso de TypeScript",
  "description": "Aprenda TypeScript do zero",
  "value": 299.99,
  "category": "Programação",
  "level": "Intermediário",
  "duration": 40,
  "modules": [
    {
      "title": "Introdução ao TypeScript",
      "description": "Primeiros passos",
      "order": 0,
      "content": "Conteúdo do módulo..."
    },
    {
      "title": "Tipos Avançados",
      "description": "Tipos complexos",
      "order": 1,
      "content": "Conteúdo do módulo..."
    }
  ]
}
```

## Observações

Este serviço não possui autenticação/autorização. Todas as rotas são públicas.

