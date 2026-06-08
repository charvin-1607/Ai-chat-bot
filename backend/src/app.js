const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const sanitizeInput =require("./middlewares/sanitizeMiddleware");

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require("./routes/chatRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");

const generateAIResponse = require("./services/aiService");

const app = express();



const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 100,

    message: {
        success: false,
        message: "Too many requests"
    },

    handler: (req,res) => {

        console.log(
            "RATE LIMIT HIT"
        );

        res.status(429).json({
            success:false,
            message:"Too many requests"
        });

    }

});


// Middlewares
app.use(
    helmet({
        contentSecurityPolicy: false
    })
);

app.use(limiter);

app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true
  }));
app.use(express.json());
app.use(sanitizeInput);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



//Routes

app.use('/api/auth',authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/conversation",conversationRoutes);
app.use("/api/message", messageRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "AI Chatbot Backend Running..."
    });
});

app.get("/ai", async (req, res) => {

    const response = await generateAIResponse(
        "What is JavaScript?"
    );

    res.json({
        response
    });

});


module.exports = app;