const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir o esquema do livro
const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true // Adiciona campos createdAt e updatedAt
});

// Criar o modelo de livro
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
