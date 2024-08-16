const express = require('express');
const { getBooks, getBook, postBook, putBook, deleteBook } = require('../controllers/book.controller');
const authMiddleware = require('../auth/authMiddleware');

const router = express.Router();

// Rota para obter todos os livros
router.get('/', authMiddleware, getBooks);

// Rota para obter um livro pelo ID
router.get('/:id', authMiddleware, getBook);

// Rota para criar um novo livro
router.post('/', authMiddleware, postBook);

// Rota para atualizar um livro pelo ID
router.put('/:id', authMiddleware, putBook);

// Rota para deletar um livro pelo ID
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
