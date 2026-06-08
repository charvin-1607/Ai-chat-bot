const express = require("express");

const chatController = require("./chatController");

const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

// get all chat
router.get("/",authMiddleware, chatController.getChatHistory);

// Send Message Route
router.post("/", authMiddleware, chatController.sendMessage);

//delete chat 
router.delete("/:id",authMiddleware,chatController.deleteChat);

//delete all chats
router.delete("/",authMiddleware,chatController.deleteAllChats);

//rename chat
router.patch("/:id",authMiddleware,chatController.renameChat);


module.exports = router;