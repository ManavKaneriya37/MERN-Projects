import mongoose from "mongoose";

const incomeSchema = mongoose.Schema({

}, {timestamps: true});

const Income = mongoose.model('Income', incomeSchema);
export default Income;