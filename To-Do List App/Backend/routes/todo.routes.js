const router = require('express').Router();
const {body} = require('express-validator')
const todoController = require('../controllers/todo.controller')
const userAuth = require('../middlewares/userAuth')

router.post('/create', [
    body('title').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('description').isLength({min: 3}).withMessage('Description must be at least 3 characters long'),
],
    userAuth.authUser,
    todoController.createTodo
)

router.post('/all', userAuth.authUser, todoController.getAllTodos)

router.post('/priority', userAuth.authUser, todoController.getPriorityTodos);

module.exports = router;