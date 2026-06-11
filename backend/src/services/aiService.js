require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log(process.env.GEMINI_API_KEY);


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);


const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash"
});


const generateAIResponseStream = async (message) => {

    try {

        const result = await model.generateContentStream(message);

        return result.stream;

    } catch (error) {

        console.log("Gemini Error:", error.message);

        throw error;

    }

};


module.exports = generateAIResponseStream;