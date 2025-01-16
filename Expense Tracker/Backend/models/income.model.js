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
    }
}, {timestamps: true});

const Income = mongoose.model('Income', incomeSchema);
export default Income;