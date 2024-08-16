const express = require('express');
const router = express.Router();
const projectController = require('../Controllers/ProjectController');

// POST
router.post('/create', projectController.createProject);

// GET all projects
router.get('/', projectController.getAllProjects);

// GET by ID
router.get('/:id', projectController.getProjectById);

// PUT by ID
router.put('/:id', projectController.updateProject);

// DELETE by ID
router.delete('/:id', projectController.deleteProject);

module.exports = router;
