const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/wow-chars';

const connect = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`Connected to database ${DB_URL}.`);
    } catch (error) {
        console.log(`Error connecting to database ${DB_URL}`);
    }
};

module.exports = { DB_URL, connect };