const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    }
}, {
    timestamps: true // Adiciona campos createdAt e updatedAt
});

// Cria o modelo de membro
const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
