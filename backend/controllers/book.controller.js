const Book = require('../models/book.model');

// Obter todos os livros
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter um livro pelo ID
const getBook = async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Criar um novo livro
const postBook = async (req, res) => {
    try {
        const { title, author, isbn, available } = req.body;
        if (!title || !author || !isbn) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({ message: 'ISBN já existe' });
        }
        const newBook = new Book({ title, author, isbn, available });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar um livro pelo ID
const putBook = async (req, res) => {
    try {
        const { title, author, isbn, available } = req.body;
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        book.title = title || book.title;
        book.author = author || book.author;
        book.isbn = isbn || book.isbn;
        book.available = available !== undefined ? available : book.available;
        await book.save();
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Deletar um livro pelo ID
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findByIdAndDelete(id)
        if (!book)
            return res.status(404).json({ message: "Book not Found" })

        return res.status(200).json({ message: "Book deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getBooks,
    getBook,
    postBook,
    putBook,
    deleteBook
};
