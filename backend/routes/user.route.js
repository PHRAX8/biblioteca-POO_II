const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// route to get all users
router.get('/', userController.getUsers);

// route to get user by id
router.get("/:id", userController.getUser);

// route to post user
router.post('/', userController.postUser);

// route to update user by id
router.put('/:id', userController.putUser);

// route to delete user by id
router.delete('/:id', userController.deleteUser);

//router.post('/login', userController.login);

module.exports = router;