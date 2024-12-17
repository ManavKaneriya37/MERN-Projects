const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: String,
    },
    priority: {
        type: String,
        trim: true,
        default: 'none'
    },
    category: {
        type: String,
        trim: true,
        default: 'personal'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const todoModel = mongoose.model('todo', todoSchema);
module.exports = todoModel;