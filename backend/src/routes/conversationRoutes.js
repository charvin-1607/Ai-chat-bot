const express = require("express");
const router = express.Router();

const conversation = require("../controllers/conversationController");

const protect = require("../middlewares/authMiddleware");

const {
    validationErrorHandler,
    renameConversationValidation,
} = require("../middlewares/validationMiddleware");




router.post("/", protect, conversation.createConversation);

router.get("/", protect, conversation.getConversations);

router.patch("/:id", 

        protect, 
        renameConversationValidation,
        validationErrorHandler,
        conversation.renameConversation
        
    );

router.delete("/:id", protect, conversation.deleteConversation);


module.exports = router;