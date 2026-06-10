require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log(process.env.GEMINI_API_KEY);


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);


const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});


const generateAIResponseStream = async (message) => {

    let stream;

    try {
    
        stream = await generateAIResponseStream(message);
    
    } catch (error) {
    
        console.log(
            "Gemini Stream Error:",
            error.message
        );
    
        return res.status(503).json({
            success: false,
            message:
                "AI service is temporarily unavailable. Please try again."
        });
    
    }

};


module.exports = generateAIResponseStream;