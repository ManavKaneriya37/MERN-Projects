import {Router} from 'express'
import {
    registerUser, 
    loginUser, 
    getCurrentUser, 
    logoutUser
} from '../controllers/user.controller.js'
import {verifyUser} from '../middlewares/auth.middleware.js'

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/current-user').get(verifyUser, getCurrentUser);
router.route('/logout').get(verifyUser, logoutUser)

export default router;