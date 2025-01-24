import { Router } from "express";
import {verifyUser} from '../middlewares/auth.middleware.js'
import { 
    createExpense,
    deleteExpense,
    getExpensesTotal,
    getExpenses,
    getExpenseByUserId,
    getAllExpenses
} from "../controllers/expense.controller.js";

const router = Router();

router.route('/create').post(verifyUser, createExpense);
router.route('/delete').post(verifyUser, deleteExpense);
router.route('/get-total').post(verifyUser, getExpensesTotal);
router.route('/get-expenses').post(verifyUser, getExpenses);
router.route('/user/get-expenses').post(verifyUser, getExpenseByUserId);
router.route('/all/get-expenses').post(verifyUser, getAllExpenses);


export default router;