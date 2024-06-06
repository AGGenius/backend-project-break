const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected with success.");
    } catch (error) {
        console.error(error);
        throw new Error('Error on database startup.');
    }
};

module.exports = dbConnection;