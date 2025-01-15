import mongoose from "mongoose";

const expenseModel = mongoose.Schema({
    
}, {timestamps: true})

const Expense = mongoose.model('Expense', expenseModel);
export default Expense;