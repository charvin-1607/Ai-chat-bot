const Conversation = require("../models/Conversation");

const Message = require("../models/Message");

const generateAIResponseStream = require("../services/aiService");


// SEND MESSAGE


// SEND MESSAGE
const sendMessage = async (req, res) => {
    try {

        const { conversationId, message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        const conversation = await Conversation.findById(
            conversationId
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

        // Save User Message
        await Message.create({
            conversation: conversationId,
            role: "user",
            content: message
        });

        // Streaming Headers
        res.setHeader(
            "Content-Type",
            "text/plain; charset=utf-8"
        );

        res.setHeader(
            "Transfer-Encoding",
            "chunked"
        );

      

        let fullResponse = "";

        // const stream =
        //     await generateAIResponseStream(message);

        let stream;

        try {

            stream =
                await generateAIResponseStream(message);

        } catch (error) {

            console.log("Gemini Stream Error:",error.message);

            return res.status(503).json({
                success: false,
                message:"AI service is temporarily unavailable. Please try again."
            });

        }


        let isAborted = false;

        res.on("close", () => {

            console.log("Client Disconnected");

            isAborted = true;

        });

        console.log("Stream Started");

        try {

            for await (const chunk of stream) {

                if (isAborted) {

                    console.log(
                        "Generation Stopped By User"
                    );

                    break;
                }

                const text = chunk.text();

                console.log(
                    "Chunk Received:",
                    text
                );

                fullResponse += text;

                if (!res.writableEnded) {
                    res.write(text);
                }
            }

        } catch (streamError) {

            console.log(
                "Stream Error:",
                streamError.message
            );

            // User Stop kare tyare ahiya aavse
            // Process crash nahi thay

        }

        console.log("Stream Ended");

        // Save AI Message only if some content exists
        if (fullResponse.trim()) {

            await Message.create({
                conversation: conversationId,
                role: "assistant",
                content: fullResponse
            });

            conversation.updatedAt = Date.now();

            await conversation.save();
        }

        // End response only if still open
        if (!res.writableEnded) {
            res.end();
        }

    } catch (error) {

        console.log(
            "Send Message Error:",
            error
        );

        if (!res.headersSent) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
};


// GET ALL MESSAGES
const getMessages = async (req, res) => {
    try {

        const conversation = await Conversation.findById(
            req.params.conversationId
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

        const messages = await Message.find({
            conversation: req.params.conversationId
        }).sort({
            createdAt: 1
        });

        res.status(200).json({
            success: true,
            messages
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    sendMessage,
    getMessages
};