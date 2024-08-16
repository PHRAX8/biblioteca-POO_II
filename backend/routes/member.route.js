const express = require('express');
const { getMember, getMembers, postMember, putMember, deleteMember } = require('../controllers/member.controller');
const authMiddleware = require('../auth/authMiddleware');

const router = express.Router();

// Rota para obter todos os membros
router.get('/', authMiddleware, getMembers);

// Rota para obter um membro pelo ID
router.get('/:id', authMiddleware, getMember);

// Rota para criar um novo membro
router.post('/', authMiddleware, postMember);

// Rota para atualizar um membro pelo ID
router.put('/:id', authMiddleware, putMember);

// Rota para deletar um membro pelo ID
router.delete('/:id', authMiddleware, deleteMember);

module.exports = router;
