const router = require('express').Router();
const projectController = require('../controllers/project.controller');

router.post('/create', projectController.createProject);

module.exports = router;