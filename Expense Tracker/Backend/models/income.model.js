import mongoose from "mongoose";

const incomeSchema = mongoose.Schema({
    tag: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    }
}, {timestamps: true});

const Income = mongoose.model('Income', incomeSchema);
export default Income;