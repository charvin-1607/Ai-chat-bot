const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");
const {
    validationErrorHandler,
    signupValidation,
    loginValidation
} = require("../middlewares/validationMiddleware");


// register and login routes (public)
router.post("/signup",
    signupValidation,
    validationErrorHandler,
    authController.signup
);


router.post("/login",
    loginValidation,
    validationErrorHandler,
    authController.login

);

router.get("/me", authMiddleware, authController.getMe);

// logout route protected by authMiddleware
//router.post("/logout", authMiddleware, authController.logout);




module.exports = router;