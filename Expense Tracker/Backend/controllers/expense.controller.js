import mongoose from 'mongoose';
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import ExpenseModel from '../models/expense.model.js';

const createExpense = asyncHandler(async (req, res) => {
    try {
        const {tag, amount, category, projectId} = req.body;

        if(tag==="" || category==="" || amount <= 0) {
            throw new ApiError(400, "Mendatory fields are required.");
        }
        var createdExpense;

        if(projectId) {
            if(!mongoose.Types.ObjectId.isValid(projectId)) {
                throw new ApiError(400, "Something wrong with project Id.")
                process.exit(1);
            }

            createdExpense = await ExpenseModel.create({
                tag,
                amount,
                category,
                project: projectId
            })
        } else {
            createdExpense = await ExpenseModel.create({
                tag,
                amount,
                category
            })
        }

        if(!createdExpense) {
            throw new ApiError(500, "Something went wrong with creating expense.")
        }

        res
        .status(201)
        .json(
            new ApiResponse(201, createdExpense, "Expense created successfully")
        )

    } catch (error) {
        throw new ApiError(500, error.message)
    }
});

const deleteExpense = asyncHandler(async (req, res) => {
    try {
        const {expenseId} = req.body;

        if(!expenseId) {
            throw new ApiError(400, "Expense Id required.")
        }
        if(!mongoose.Types.ObjectId.isValid(expenseId)) {
            throw new ApiError(403, "Expense Id is not in valid format")
        }

        await ExpenseModel.findByIdAndDelete(expenseId);
        const deletedExpense = await ExpenseModel.findById(expenseId);
        if(deletedExpense) {
            throw new ApiError(500, "Something went wrong with deleting the expense.")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200, null, "Expense deleted successfully")
        )
        
    } catch (error) {
        throw new ApiError(500, error.message)
    }
});

export {
    createExpense,
    deleteExpense,
}