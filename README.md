# Delivery API

Uma API REST para sistema de delivery desenvolvida em Node.js com Express e PostgreSQL.

## 📋 Sobre o Projeto

Esta API fornece endpoints para gerenciar um sistema completo de delivery, incluindo usuários, empresas, produtos, pedidos e entregadores. O sistema utiliza autenticação JWT e inclui funcionalidades de upload de arquivos para AWS S3.

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular organizada por features:

```
api/
├── features/           # Módulos de funcionalidades
│   ├── companies/      # Gestão de empresas
│   ├── dashboard/      # Dashboard e métricas
│   ├── deliverymans/   # Gestão de entregadores
│   ├── email/          # Envio de emails
│   ├── login/          # Autenticação
│   ├── orderItens/     # Itens de pedidos
│   ├── orders/         # Gestão de pedidos
│   ├── products/       # Catálogo de produtos
│   └── users/          # Gestão de usuários
├── routes/             # Configuração de rotas
├── middleware/         # Middlewares personalizados
└── controllers/        # Controladores auxiliares
```

### Estrutura de Cada Feature

Cada feature segue o padrão:
- `*.controller.js` - Lógica de controle das requisições
- `*.service.js` - Lógica de negócio
- `*.routes.js` - Definição das rotas
- `*.zod.js` - Validação de dados com Zod

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados principal
- **Sequelize** - ORM para banco de dados
- **JWT** - Autenticação e autorização
- **Zod** - Validação de schemas
- **Multer** - Upload de arquivos
- **AWS S3** - Armazenamento de arquivos
- **Firebase Admin** - Notificações push
- **Nodemailer** - Envio de emails
- **Socket.io** - Comunicação em tempo real
- **bcryptjs** - Hash de senhas

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` com as seguintes configurações:

```env
# Database
DB_USERNAME=seu_usuario_db
DB_PASSWORD=sua_senha_db
DB_HOST=host_do_banco
DB_PORT=5432
DB=nome_do_banco
DB_LOGGING=false

# JWT
DELIVERY_SECRET_KEY=sua_chave_secreta_delivery
DASHBOARD_SECRET_KEY=sua_chave_secreta_dashboard

# Email (SMTP)
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_email

# AWS S3
AWS_ACCESS_KEY=sua_access_key_aws
AWS_SECRET_ACCESS_KEY=sua_secret_key_aws
REGION=us-east-2
BUCKET=nome_do_bucket

# Servidor
PORT_EXPRESS=3032
PORT_SOCKET=3033
```

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm start
```

## 🔗 Endpoints Principais

### Autenticação
- `POST /login` - Fazer login no sistema

### Usuários
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Empresas
- `GET /companies` - Listar empresas
- `POST /companies` - Criar empresa
- `PUT /companies/:id` - Atualizar empresa

### Produtos
- `GET /products` - Listar produtos
- `POST /products` - Criar produto
- `PUT /products/:id` - Atualizar produto

### Pedidos
- `GET /orders` - Listar pedidos
- `POST /orders` - Criar pedido
- `PUT /orders/:id` - Atualizar pedido

### Entregadores
- `GET /deliverymans` - Listar entregadores
- `POST /deliverymans` - Criar entregador

### Upload
- `POST /upload` - Upload de arquivos para S3

### Email
- `POST /sendEmail` - Enviar emails

## 🗄️ Banco de Dados

O sistema utiliza PostgreSQL com Sequelize ORM. Os modelos estão localizados em `../base/database/models/` e incluem:

- `users` - Usuários do sistema
- `companies` - Empresas cadastradas
- `products` - Catálogo de produtos
- `orders` - Pedidos realizados
- `orderItens` - Itens dos pedidos
- `deliverymans` - Entregadores
- `dashboard` - Dados de dashboard

### Características do Banco
- Usa SSL para conexões seguras
- Pool de conexões configurado (max: 5, min: 0)
- Suporte a transações
- Soft delete (deletedAt)
- Logging opcional

## 🔧 Funcionalidades

### Core Features
- **Autenticação JWT** - Sistema seguro de login
- **Upload de Arquivos** - Integração com AWS S3
- **Validação de Dados** - Usando Zod schemas
- **Paginação** - Suporte a paginação em listagens
- **Soft Delete** - Exclusão lógica de registros
- **Transações** - Operações atômicas no banco
- **Logs** - Sistema de auditoria de alterações

### Middleware
- **CORS** - Habilitado para todas as origens
- **Rate Limiting** - Controle de taxa de requisições
- **Helmet** - Segurança HTTP
- **Morgan** - Logging de requisições
- **Body Parser** - Parsing de JSON (limite: 50MB)

### Comunicação
- **Socket.io** - WebSocket para tempo real (porta 3033)
- **Nodemailer** - Envio de emails via SMTP
- **Firebase** - Notificações push

## 📊 Monitoramento

O servidor inclui:
- Logging detalhado de requisições com Morgan
- Retry automático na conexão com banco (1000 tentativas)
- Healthcheck na inicialização
- Timestamps em todas as operações

## 🔒 Segurança

- Senhas hasheadas com bcryptjs
- Tokens JWT para autenticação
- Headers de segurança com Helmet
- Validação rigorosa de entrada de dados
- SSL obrigatório no banco de dados
- Middleware de autorização

## 🚦 Status do Projeto

- ✅ API REST funcional
- ✅ Autenticação implementada
- ✅ Upload de arquivos
- ✅ Sistema de pedidos
- ✅ Comunicação em tempo real
- ✅ Integração com serviços externos

## 📝 Notas de Desenvolvimento

- O projeto utiliza ESLint com configuração Google
- Prettier para formatação de código
- Nodemon para desenvolvimento
- Jest e Mocha para testes (configurado mas não implementado)
- Suporte a TypeScript através de Zod para validação

## 🤝 Contribuição

Para contribuir com o projeto:

1. Clone o repositório
2. Instale as dependências
3. Configure o arquivo `.env`
4. Execute `npm start` para desenvolvimento
5. Siga os padrões de código estabelecidos (ESLint + Prettier)