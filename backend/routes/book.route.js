const express = require('express');
const router = express.Router();
const {
    getBooks,
    getBook,
    postBook,
    putBook,
    deleteBook
} = require('../controllers/book.controller');

// Rota para obter todos os livros
router.get('/', getBooks);

// Rota para obter um livro pelo ID
router.get('/:id', getBook);

// Rota para criar um novo livro
router.post('/', postBook);

// Rota para atualizar um livro pelo ID
router.put('/:id', putBook);

// Rota para deletar um livro pelo ID
router.delete('/:id', deleteBook);

module.exports = router;
