const Chat = require("./Chat");

const generateAIResponse = require("../services/aiService");


const sendMessage = async (req, res) => {

    try {

        // Get User Message
        const { message } = req.body;


        // Validation
        if (!message) {

            return res.status(400).json({
                success: false,
                message: "Message is required"
            });

        }


        // Generate AI Response
        const aiResponse = await generateAIResponse(message);


        // Save Chat In Database
        const chat = await Chat.create({
            user: req.user.id,
            message,
            response: aiResponse
        });


        // Response
        res.status(201).json({
            success: true,
            chat
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// GET CHAT HISTORY
const getChatHistory = async (req, res) => {

    try {

        // Find User Chats
        const chats = await Chat.find({
            user: req.user.id
        }).sort({
            createdAt: -1   // latest chat 1st show
        });


        // Response
        res.status(200).json({
            success: true,
            count: chats.length,
            chats
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// DELETE SINGLE CHAT
const deleteChat = async (req, res) => {

    try {

        // Get Chat
        const chat = await Chat.findByIdAndDelete(req.params.id);

        // Chat Check
        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }


        // Response
        res.status(200).json({
            success: true,
            message: "Chat deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};

// delete all chat
const deleteAllChats = async (req, res) => {
    try {

        await Chat.deleteMany({
            user: req.user.id
        });

        res.status(200).json({
            success: true,
            message: "All chats deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

//rename
const renameChat = async (req, res) => {
    try {

        const { title } = req.body;

        const chat = await Chat.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        if (!chat) {
            return res.status(404).json({ success: false, message: "Employee not found" });
          }
      
        
          res.status(200).json({
            success: true,
            message: "Chat renamed successfully",
            chat
        });
        } catch (error) {
          res.status(500).json({ success: false, message: error.message ||"Server error" });
        }

};
module.exports = {
    sendMessage,
    getChatHistory,
    deleteChat,
    deleteAllChats,
    renameChat,
};