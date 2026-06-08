const { body, validationResult } =
require("express-validator");


// SIGNUP VALIDATION
const signupValidation = [

    body("name")

        .trim()

        .notEmpty()

        .withMessage(
            "Name is required"
        )

        .isLength({
            min: 3,
            max: 30
        })

        .withMessage(
            "Name must be between 3 and 30 characters"
        ),


    body("email")

        .trim()

        .notEmpty()

        .withMessage(
            "Email is required"
        )

        .isEmail()

        .withMessage(
            "Invalid email address"
        ),


    body("password")

        .notEmpty()

        .withMessage(
            "Password is required"
        )

        .isLength({
            min: 6
        })

        .withMessage(
            "Password must be at least 8 characters"
        )

        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
        )

        .withMessage(
            "Password must contain uppercase, lowercase and number"
        )

];

const loginValidation = [

    body("email")

        .trim()

        .notEmpty()

        .withMessage(
            "Email is required"
        )

        .isEmail()

        .withMessage(
            "Invalid email address"
        ),

    body("password")

        .notEmpty()

        .withMessage(
            "Password is required"
        )

];

// VALIDATION ERROR HANDLER
const validationErrorHandler = ( req,res,next) => {

    const errors =
        validationResult(req);

    if (
        !errors.isEmpty()
    ) {

        return res.status(400).json({

            success: false,

            message:
                errors.array()[0].msg

        });

    }

    next();

};

// MESSAGE VALIDATION

const messageValidation = [

    body("message")

        .trim()

        .notEmpty()

        .withMessage(
            "Message is required"
        )

        .isLength({
            min: 1,
            max: 5000
        })

        .withMessage(
            "Message cannot exceed 5000 characters"
        )

];


//Rename Conversation Validation
const renameConversationValidation = [

    body("title")

        .trim()

        .notEmpty()

        .withMessage(
            "Title is required"
        )

        .isLength({
            min: 1,
            max: 100
        })

        .withMessage(
            "Title must be between 1 and 100 characters"
        )

];

module.exports = {

    signupValidation,

    loginValidation,

    messageValidation,
    
    renameConversationValidation,

    validationErrorHandler

};