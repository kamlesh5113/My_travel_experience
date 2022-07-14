const mongoose = require('mongoose');

const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6v51z.mongodb.net/${process.env.DB_NAME}`;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB is connected");
    } catch (err) {
        console.log("Error in connecting with database!");
    }
};

module.exports = connectDB;