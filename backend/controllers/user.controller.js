//const userRepository = require('../repositories/userRepository');
const User = require('./backend/models/user.model.js');

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
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// update user by id
const putUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndUpdate(id, req.body)
        if (!user)
            return res.status(404).json({message: "User not Found"})
        
        const updatedUser = await User.findById(id)
        return res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

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
    deleteUser,
//    login,
};