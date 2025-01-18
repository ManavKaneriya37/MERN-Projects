import { Router } from "express";
import { createIncome, deleteIncome, getIncomesTotal } from "../controllers/income.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";


const router = Router();

router.route('/create').post(verifyUser, createIncome);
router.route('/delete').post(verifyUser, deleteIncome);
router.route('/get-total').post(verifyUser, getIncomesTotal);

export default router;