

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new To-Do
router.post('/todos', authMiddleware, todoController.createTodo);

// Get all To-Dos
router.get('/todos', authMiddleware, todoController.getTodos);

// Get a single To-Do by ID
router.get('/todos/:id', authMiddleware, todoController.getTodoById);

// Update a To-Do
router.put('/todos/:id', authMiddleware, todoController.updateTodo);

// Delete a To-Do
router.delete('/todos/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;

