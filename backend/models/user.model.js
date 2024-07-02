const mongoose = require('mongoose');

// Definir o esquema do usuário
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'librarian'],
        required: true
    }
}, {
    timestamps: true // Adiciona campos createdAt e updatedAt
});

// Cria o modelo de usuário
const User = mongoose.model('User', userSchema);

module.exports = User;
