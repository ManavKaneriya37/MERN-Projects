const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");

router.post("/signup",
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  userController.signUp
);

router.post('/signin',
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  userController.signIn
)


module.exports = router;
