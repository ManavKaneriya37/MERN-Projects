import {Router} from 'express'
import {
    registerUser, 
    loginUser, 
    getCurrentUser, 
    logoutUser,
    getAllGeneralTransactions,
    updateUser
} from '../controllers/user.controller.js'
import {verifyUser} from '../middlewares/auth.middleware.js'

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/current-user').get(verifyUser, getCurrentUser);
router.route('/logout').get(verifyUser, logoutUser)
router.route('/transactoins/general').get(verifyUser, getAllGeneralTransactions);
router.route('/update-profile').post(verifyUser, updateUser);

export default router;