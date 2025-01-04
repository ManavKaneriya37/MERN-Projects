const router = require("express").Router();
const projectController = require("../controllers/project.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {body} = require("express-validator");

router.post("/create",
  authMiddleware.authUser,
  body('name').isString().withMessage('Name must be a string'),
  projectController.createProject
);

router.post("/all",
  authMiddleware.authUser,
  projectController.getAllProjects
);

router.put('/add-user', 
  authMiddleware.authUser,
  body('projectId').isString().withMessage('Project ID must be a string').bail(),
  body('users').isArray({ min: 1 }).withMessage('Users must be an array').bail()
    .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
  projectController.addUserToProject
);

router.get('/:projectId',
  authMiddleware.authUser,
  projectController.getProjectById
);

module.exports = router;