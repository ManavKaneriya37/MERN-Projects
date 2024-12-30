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


module.exports = router;