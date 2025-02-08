const express = require('express')
const router = express.Router();
const {registerUser} = require('../controllers/user.controller')

router.get('/register', registerUser)

module.exports = router;