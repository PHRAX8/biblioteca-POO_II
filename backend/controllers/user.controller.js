//const userRepository = require('../repositories/userRepository');
const User = require('../models/user.model.js');

// get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// get user by id
const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// post user
const postUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Nome de usuário já existe' });
        }
        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update user by id
const putUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        user.username = username || user.username;
        user.password = password || user.password;
        user.role = role || user.role;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete user by id
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user)
            return res.status(404).json({message: "User not Found"})
        
        return res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//const login = async (req, res) => {
    // Implementar a lógica de login
//};

module.exports = {
    getUser,
    getUsers,
    postUser,
    putUser,
    deleteUser
//    login,
};