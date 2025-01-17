import mongoose from "mongoose";

const expenseModel = mongoose.Schema({
    tag:{
        type:String,
        required:true,
        trim: true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now,
    },
    category: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true})

const Expense = mongoose.model('Expense', expenseModel);
export default Expense;