const express = require('express');
const router = express.Router();
const {getUser, getUsers, postUser, putUser, deleteUser} = require('../controllers/user.controller.js');

// route to get all users
router.get('/', getUsers);

// route to get user by id
router.get("/:id", getUser);

// route to post user
router.post('/', postUser);

// route to update user by id
router.put('/:id', putUser);

// route to delete user by id
router.delete('/:id', deleteUser);

//router.post('/login', userController.login);

module.exports = router;