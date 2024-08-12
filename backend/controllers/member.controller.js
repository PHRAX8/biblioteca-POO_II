const Member = require('../models/member.model');

// Obter todos os membros
const getMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter um membro pelo ID
const getMember = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findById(id);
        if (!member) {
            return res.status(404).json({ message: 'Membro não encontrado' });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Criar um novo membro
const postMember = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }
        const existingMember = await Member.findOne({ email });
        if (existingMember) {
            return res.status(400).json({ message: 'E-mail já existe' });
        }
        const newMember = new Member({ name, email, phone });
        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar um membro pelo ID
const putMember = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Membro não encontrado' });
        }
        member.name = name || member.name;
        member.email = email || member.email;
        member.phone = phone || member.phone;
        await member.save();
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Deletar um membro pelo ID
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findByIdAndDelete(id);
        if (!member) {
            return res.status(404).json({ message: 'Membro não encontrado' });
        }
        return res.status(200).json({ message: 'Membro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMembers,
    getMember,
    postMember,
    putMember,
    deleteMember
};
