import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        default: "",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }, 
    expenses: {
        type: Number,
        default: 0  
    },
    income: {
        type: Number,
        default: 0  
    },
    budget: {
        type: Number,
        default: 0,
    },

}, {timestamps: true})

const Project = mongoose.model('Project', projectSchema);

export default Project;