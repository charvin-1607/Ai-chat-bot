const express = require("express");
const router = express.Router();

const {
    sendMessage,
    getMessages
} = require("../controllers/messageController");

const authMiddleware = require("../middlewares/authMiddleware");

const {
    validationErrorHandler,
    messageValidation,
} = require("../middlewares/validationMiddleware");



router.post("/",
    
    authMiddleware,
    messageValidation,
    validationErrorHandler,
    sendMessage
);

router.get(
    "/:conversationId",
    authMiddleware,
    getMessages
);


module.exports = router;