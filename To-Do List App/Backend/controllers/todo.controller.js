const todoModel = require('../models/todo.model')
const {validationResult} = require('express-validator')

module.exports.createTodo = async (req, res) => {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const todaydate = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const fulldate = `${year}-${month + 1}-${todaydate}`;

        const {title, description, user} = req.body;
        const date = req.body?.date || fulldate;
        const priority = req.body?.priority || 'None';
        const category = req.body?.category || 'Personal';

        if(!title || !description || !user)
            return res.status(400).json({ message: "Either Title or description or user id is missing" });

        const todo = await todoModel.create({
            title,
            description,
            date,
            priority,
            category,
            user
        })

        res.status(201).json(todo);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating todo' })
    }
}

module.exports.getAllTodos = async (req, res) => {
    const userid = req.body.userid;

    const todos = await todoModel.find({user: userid})
    res.status(200).json(todos);    
}

module.exports.getPriorityTodos = async (req, res) => {
    const userid = req.body.userid;

    const allPriorityTodos = await todoModel.find({user: userid, priority: {$ne: 'None'} });
    res.status(200).json(allPriorityTodos);
}

module.exports.getTodaysTodos = async (req, res) => {
    const userid = req.body.userid;
    const todaysDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

    const allTodaysTodos = await todoModel.find({user: userid, date: todaysDate});
    res.status(200).json(allTodaysTodos);
}

module.exports.completeTask = async (req, res) => {
    const todoid = req.body.todoid;
    const user = req.user;

    await todoModel.findOneAndDelete({_id: todoid});
    const restTodos = await todoModel.find({user: user._id});
    res.status(200).json(restTodos)
}
module.exports.getTodo = async (req, res) => {
    const todoid = req.body.todoid;

    const todo = await todoModel.findOne({_id: todoid});
    res.status(200).json(todo);
}
module.exports.updateData = async (req, res) => {
    try {
    const { _id, title, description, date, priority, category } = req.body.formData;
        
    if (!_id) {
        return res.status(400).json({ message: "Todo id is missing" });
    }

    const updatedTodo = await todoModel.findByIdAndUpdate(_id, {
        title,
        description,
        date,
        priority,
        category
    });

    if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
} catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating todo' })
}
}