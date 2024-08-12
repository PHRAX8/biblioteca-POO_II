const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir o esquema de empréstimo
const loanSchema = new Schema({
    book_id: {
        type: Schema.Types.ObjectId,
        ref: 'Book', // Refere-se ao modelo de livro
        required: true
    },
    member_id: {
        type: Schema.Types.ObjectId,
        ref: 'Member', // Refere-se ao modelo de membro
        required: true
    },
    loan_date: {
        type: Date,
        default: Date.now, 
        required: true
    },
    return_date: {
        type: Date
    },
    returned: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true // Adiciona campos createdAt e updatedAt
});

// Criar o modelo de empréstimo
const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
