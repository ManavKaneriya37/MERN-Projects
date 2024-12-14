const router = require('express').Router();
const { body } = require('express-validator')
const userController = require('../controllers/user.controller')
const userAuth = require('../middlewares/userAuth')


router.post('/signup', [
    body('fullname').isLength({min: 3}).withMessage("Enter a valid name"),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Enter valid password'),
], 
    userController.loginUser
)

router.post('/send-otp', userController.sendOtp)
router.post('/verify-otp', userController.verifyOtp)

router.get('/profile', userAuth.authUser , userController.getProfile)

module.exports = router;
