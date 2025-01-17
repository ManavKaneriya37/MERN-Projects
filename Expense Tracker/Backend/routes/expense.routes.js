import { Router } from "express";
import {verifyUser} from '../middlewares/auth.middleware.js'
import { 
    createExpense,
    deleteExpense,
} from "../controllers/expense.controller.js";

const router = Router();

router.route('/create').post(verifyUser, createExpense);
router.route('/delete').post(verifyUser, deleteExpense);

export default router;