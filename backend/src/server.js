const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");


// Load ENV
dotenv.config();


// PORT
const PORT = process.env.PORT || 5000;


//  console.log(process.env.GEMINI_API_KEY);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");


    // Server Start AFTER DB Connection
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})

.catch((error) => {

    console.log("MongoDB Error:", error.message);

});