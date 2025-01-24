import { Router } from "express";
import { createIncome, deleteIncome, getIncomes, getIncomesByUserId, getIncomesTotal, getAllIncomes } from "../controllers/income.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";


const router = Router();

router.route('/create').post(verifyUser, createIncome);
router.route('/delete').post(verifyUser, deleteIncome);
router.route('/get-total').post(verifyUser, getIncomesTotal);
router.route('/get-incomes').post(verifyUser, getIncomes);
router.route('/user/get-incomes').post(verifyUser, getIncomesByUserId);
router.route('/all/get-incomes').post(verifyUser, getAllIncomes);

export default router;