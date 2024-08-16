const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

// POST Registter
router.post('/register', userController.registerUser); 

// POST: Login 
router.post('/login', userController.loginUser); 

// GET: all users
router.get('/', userController.getAllUsers); 

// GET by ID
router.get('/:id', userController.getUserById); 

// PUT by ID
router.put('/:id', userController.updateUser); 

// DELETE by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
