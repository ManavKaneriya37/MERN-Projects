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

        console.log(req.body);

        const {title, description, user} = req.body;
        const date = req.body?.date || fulldate;
        const priority = req.body?.priority || 'none';
        const category = req.body?.category || 'personal';

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