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
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    category: {
        type: String,
        trim: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    }
}, {timestamps: true});

const Income = mongoose.model('Income', incomeSchema);
export default Income;