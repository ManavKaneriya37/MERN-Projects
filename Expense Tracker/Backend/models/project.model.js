import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }, 
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expense',
        }
    ],
    income: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Income',
        }
    ],
    budget: {
        type: Number,
        default: 0,
    },

}, {timestamps: true})

const Project = mongoose.model('Project', projectSchema);

export default Project;