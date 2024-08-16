const express = require('express');
const { getUser, getUsers, postUser, putUser, deleteUser, login } = require('../controllers/user.controller');
const authMiddleware = require('../auth/authMiddleware');

const router = express.Router();

// route to get all users
router.get('/', authMiddleware, getUsers);

// route to get user by id
router.get("/:id", authMiddleware, getUser);

// route to post user
router.post('/', postUser);

// route to update user by id
router.put('/:id', authMiddleware, putUser);

// route to delete user by id
router.delete('/:id', authMiddleware, deleteUser);

router.post('/login', login);

module.exports = router;