import { Router } from "express";
import {verifyUser} from '../middlewares/auth.middleware.js'
import { createExpense } from "../controllers/expense.controller.js";

const router = Router();

router.route('/create').post(verifyUser, createExpense);


export default  router;