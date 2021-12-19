const express = require('express');
const cors = require('cors');
const whatsappChat = require('./routes/whatsapp');
const mongoose = require('mongoose');
require('dotenv').config();

(async function keepTrying() {
    try {
        console.log("Connecting to MongoDB...");
        const connectionString = `mongodb://${process.env.DB_CONNECTION_USERNAME}:${process.env.DB_CONNECTION_PASSWORD}@${process.env.DB_CONNECTION_HOSTNAME}:${process.env.DB_CONNECTION_PORT}/smog?authSource=admin`;
        await mongoose.connect(`mongodb://${process.env.DB_CONNECTION_USERNAME}:${process.env.DB_CONNECTION_PASSWORD}@${process.env.DB_CONNECTION_HOSTNAME}:${process.env.DB_CONNECTION_PORT}/smog?authSource=admin`);
        console.log("Connected to MongoDB");
    }
    catch {
        console.log("Could not connect to MongoDB");
        keepTrying();
    }
})();


const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
    console.log('Hello World!');
}) 

app.use(whatsappChat);

app.listen(port, () => console.log(`Server is running on port ${port}`))
