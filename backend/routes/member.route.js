const express = require('express');
const router = express.Router();
const { getMember, getMembers, postMember, putMember, deleteMember } = require('../controllers/member.controller');

// Rota para obter todos os membros
router.get('/', getMembers);

// Rota para obter um membro pelo ID
router.get('/:id', getMember);

// Rota para criar um novo membro
router.post('/', postMember);

// Rota para atualizar um membro pelo ID
router.put('/:id', putMember);

// Rota para deletar um membro pelo ID
router.delete('/:id', deleteMember);

module.exports = router;
