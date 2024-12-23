const mongoose = require('mongoose');

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/nudgeDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected...");
    } catch (err) {
        console.error("MongoDB connection error", err);
        process.exit(1);
    }
};

module.exports = connectDB;
