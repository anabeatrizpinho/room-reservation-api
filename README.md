
# 🚀 Sistema de Reservas de Salas - API RESTful

![Status](https://img.shields.io/badge/status-production-brightgreen)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

API completa para gerenciamento de reservas de salas de reunião com autenticação segura e controle de horários.

## 📋 Tabela de Conteúdos
- [Funcionalidades](#✨-funcionalidades)
- [Tecnologias](#💻-tecnologias)
- [Instalação](#🛠️-instalação)
- [Rotas da API](#📌-rotas-da-api)

## ✨ Funcionalidades
- **Autenticação** com JWT
- **CRUD completo** de usuários, salas e reservas
- **Validação de dados** robusta
- **Controle de conflitos** em reservas
- **Documentação** dos endpoints

## 💻 Tecnologias
| Camada          | Tecnologias                                |
|-----------------|-------------------------------------------|
| Backend         | NestJS, TypeScript                        |
| Banco de Dados  | MySQL, Prisma ORM                         |
| Segurança       | JWT, Bcrypt                               |
| Validação       | class-validator                           |

## 🛠️ Instalação

1. **Clone o repositório**:
```bash
git clone https://github.com/anabeatrizpinho/room-reservation-api.git
cd room-reservation-api
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure o ambiente**:
```bash
cp .env.example .env
# Edite o .env com suas configurações
```

4. **Execute as migrations**:
```bash
npx prisma migrate dev
```

5. **Inicie o servidor**:
```bash
npm run start:dev
```

## 📌 Rotas da API

### 🔐 Autenticação
| Método | Endpoint       | Descrição               | Autenticação |
|--------|----------------|-------------------------|--------------|
| POST   | `/auth/login`  | Login de usuário        | Não          |

**Exemplo de Request**:
```json
{
  "email": "usuario@empresa.com",
  "password": "senha123"
}
```

### 👥 Usuários
| Método | Endpoint       | Descrição               | Autenticação |
|--------|----------------|-------------------------|--------------|
| POST   | `/users`       | Cria novo usuário       | Não          |
| GET    | `/users`       | Lista todos usuários    | Sim          |
| GET    | `/users/:id`   | Obtém usuário por ID    | Sim          |
| PATCH  | `/users/:id`   | Atualiza usuário        | Sim          |
| DELETE | `/users/:id`   | Remove usuário          | Sim          |

**Exemplo de Request (POST)**:
```json
{
  "name": "Ana Silva",
  "email": "ana@empresa.com",
  "password": "senhaSegura123"
}
```

### 🏢 Salas de Reunião
| Método | Endpoint            | Descrição               | Autenticação |
|--------|---------------------|-------------------------|--------------|
| POST   | `/meeting-rooms`    | Cria nova sala          | Sim          |
| GET    | `/meeting-rooms`    | Lista todas salas       | Sim          |
| GET    | `/meeting-rooms/:id`| Obtém sala por ID       | Sim          |
| PATCH  | `/meeting-rooms/:id`| Atualiza sala           | Sim          |
| DELETE | `/meeting-rooms/:id`| Remove sala             | Sim          |

**Exemplo de Request (POST)**:
```json
{
  "name": "Sala de Reuniões A",
  "capacity": 8
}
```

### 📅 Reservas
| Método | Endpoint          | Descrição               | Autenticação |
|--------|-------------------|-------------------------|--------------|
| POST   | `/reservations`   | Cria nova reserva       | Sim          |
| GET    | `/reservations`   | Lista todas reservas    | Sim          |
| GET    | `/reservations/:id`| Obtém reserva por ID    | Sim          |
| PATCH  | `/reservations/:id`| Atualiza reserva        | Sim          |
| DELETE | `/reservations/:id`| Remove reserva          | Sim          |

**Exemplo de Request (POST)**:
```json
{
  "userId": 1,
  "roomId": 2,
  "startTime": "2023-12-20T10:00:00Z",
  "endTime": "2023-12-20T11:00:00Z"
}
```

## 📧 Contato
Desenvolvido por [Ana Beatriz Pinho](https://github.com/anabeatrizpinho)


