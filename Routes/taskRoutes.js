const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/TaskController');

// POST
router.post('/create', taskController.createTask);

// GET all Tugas
router.get('/', taskController.getAllTasks);

// GET by ID
router.get('/:id', taskController.getTaskById);

// PUT by ID
router.put('/:id', taskController.updateTask);

// DELETE by ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
