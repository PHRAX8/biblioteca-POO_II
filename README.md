# Biblioteca-POO_II

## Projeto de uma Biblioteca 

- **Backend:** Node.js, Express & MongoDB
- **Frontend:** React, Redux & Bootstrap

### Projeto: Sistema de Gerenciamento de Biblioteca

**Descrição**  
Um sistema de gerenciamento de biblioteca que permita aos usuários (bibliotecários) adicionar, editar, remover e visualizar livros e membros, além de gerenciar empréstimos de livros.

### Requisitos

#### Usuários (users)

- `id` (chave primária)
- `username` (nome de usuário)
- `password` (senha criptografada)
- `role` (papel: admin, bibliotecário)

#### Livros (books)

- `id` (chave primária)
- `title` (título)
- `author` (autor)
- `isbn` (ISBN)
- `available` (disponibilidade: booleano)

#### Membros (members)

- `id` (chave primária)
- `name` (nome)
- `email` (e-mail)
- `phone` (telefone)

#### Empréstimos (loans)

- `id` (chave primária)
- `book_id` (chave estrangeira para books)
- `member_id` (chave estrangeira para members)
- `loan_date` (data de empréstimo)
- `return_date` (data de devolução)
- `returned` (devolvido: booleano)