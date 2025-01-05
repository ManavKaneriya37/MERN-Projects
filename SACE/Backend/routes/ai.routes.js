const router = require('express').Router();
const aiController = require('../controllers/ai.controller')


router.get('/get-result',aiController.getResult );

module.exports = router;