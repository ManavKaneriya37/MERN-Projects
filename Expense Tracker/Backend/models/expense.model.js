import mongoose from "mongoose";

const expenseModel = mongoose.Schema({
    tag:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now,
    }
}, {timestamps: true})

const Expense = mongoose.model('Expense', expenseModel);
export default Expense;