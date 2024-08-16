const express = require('express');
const { getLoans, getLoan, postLoan, putLoan, deleteLoan } = require('../controllers/loan.controller');
const authMiddleware = require('../auth/authMiddleware');

const router = express.Router();

// Rota para obter todos os empréstimos
router.get('/', authMiddleware, getLoans);

// Rota para obter um empréstimo pelo ID
router.get('/:id', authMiddleware, getLoan);

// Rota para criar um novo empréstimo
router.post('/', authMiddleware, postLoan);

// Rota para atualizar um empréstimo pelo ID
router.put('/:id', authMiddleware, putLoan);

// Rota para deletar um empréstimo pelo ID
router.delete('/:id', authMiddleware, deleteLoan);

module.exports = router;
