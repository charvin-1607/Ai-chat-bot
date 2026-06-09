const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const sanitizeInput =require("./middlewares/sanitizeMiddleware");

const authRoutes = require('./routes/authRoutes');
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");



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
    origin: [
       
        "http://localhost:5173",  // frontend URL
    ],
    credentials: true
  }));
app.use(express.json());
app.use(sanitizeInput);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



//Routes

app.use('/api/auth',authRoutes);
app.use("/api/conversation",conversationRoutes);
app.use("/api/message", messageRoutes);




module.exports = app;