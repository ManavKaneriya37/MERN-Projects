const router = require('express').Router();
const {body} = require('express-validator')
const todoController = require('../controllers/todo.controller')

router.post('/create', [
    body('title').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('description').isLength({min: 3}).withMessage('Description must be at least 3 characters long'),
],
    todoController.createTodo
)

module.exports = router;