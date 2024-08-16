const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Cria o modelo de usuário
const User = mongoose.model('User', userSchema);

module.exports = User;