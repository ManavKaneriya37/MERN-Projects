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

router.post('/todays', userAuth.authUser, todoController.getTodaysTodos);

router.post('/complete', userAuth.authUser, todoController.completeTask);

router.post('/get', userAuth.authUser, todoController.getTodo);

router.post('/update', userAuth.authUser, todoController.updateData);

router.post('/filter', userAuth.authUser, todoController.filterData);

module.exports = router;