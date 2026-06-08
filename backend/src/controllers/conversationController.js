const Conversation = require("../models/Conversation");

const Message = require("../models/Message");


// CREATE CONVERSATION
const createConversation = async (req, res) => {
    try {

        const conversation = await Conversation.create({
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            conversation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// GET ALL CONVERSATIONS
const getConversations = async (req, res) => {
    try {

        const conversations = await Conversation.find({
            user: req.user.id
        }).sort({
            updatedAt: -1
        });

        res.status(200).json({
            success: true,
            conversations
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// RENAME CONVERSATION
const renameConversation = async (req, res) => {
    try {

        const { title } = req.body;

        const conversation = await Conversation.findById(
            req.params.id
        );

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found"
            });
        }

        if (
            conversation.user.toString() !==
            req.user.id.toString()
        ) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        conversation.title = title;

        await conversation.save();

        res.status(200).json({
            success: true,
            conversation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// DELETE CONVERSATION
const deleteConversation = async (req, res) => {
    try {

        const conversation = await Conversation.findById(
            req.params.id
        );


        // Delete Messages
        await Message.deleteMany({
            conversation: conversation._id
        });

        // Delete Conversation
        await conversation.deleteOne();

        res.status(200).json({
            success: true,
            message: "Conversation deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    createConversation,
    getConversations,
    renameConversation,
    deleteConversation
};