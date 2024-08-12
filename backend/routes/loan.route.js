const express = require('express');
const router = express.Router();
const {
    getLoans,
    getLoan,
    postLoan,
    putLoan,
    deleteLoan
} = require('../controllers/loan.controller');

// Rota para obter todos os empréstimos
router.get('/', getLoans);

// Rota para obter um empréstimo pelo ID
router.get('/:id', getLoan);

// Rota para criar um novo empréstimo
router.post('/', postLoan);

// Rota para atualizar um empréstimo pelo ID
router.put('/:id', putLoan);

// Rota para deletar um empréstimo pelo ID
router.delete('/:id', deleteLoan);

module.exports = router;
