const Loan = require('../models/loan.model');

// Obter todos os empréstimos
const getLoans = async (req, res) => {
    try {
        const loans = await Loan.find().populate('book_id').populate('member_id');
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter um empréstimo pelo ID
const getLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.findById(id).populate('book_id').populate('member_id');
        if (!loan) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Criar um novo empréstimo
const postLoan = async (req, res) => {
    try {
        const { book_id, member_id, loan_date, return_date, returned } = req.body;
        if (!book_id || !member_id || !returned) {
            return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
        }
        const newLoan = new Loan({ book_id, member_id, loan_date, return_date, returned });
        await newLoan.save();
        res.status(201).json(newLoan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar um empréstimo pelo ID
const putLoan = async (req, res) => {
    try {
        const { book_id, member_id, loan_date, return_date, returned } = req.body;
        const loan = await Loan.findById(req.params.id);
        if (!loan) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }
        loan.book_id = book_id || loan.book_id;
        loan.member_id = member_id || loan.member_id;
        loan.loan_date = loan_date || loan.loan_date;
        loan.return_date = return_date || loan.return_date;
        loan.returned = returned !== undefined ? returned : loan.returned;
        await loan.save();
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Deletar um empréstimo pelo ID
const deleteLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.findByIdAndDelete(id);
        if (!loan) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }
        res.status(200).json({ message: 'Empréstimo deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getLoans,
    getLoan,
    postLoan,
    putLoan,
    deleteLoan
};
