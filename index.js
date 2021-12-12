const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');
const Redis = require('ioredis');
const City = require('./models/city');
const cors = require('cors');
const apicache = require('apicache');

require('dotenv').config();
app.use(morgan('dev'));
app.use(cors());

let apiCache = apicache.middleware;
let redisInstance;

(async function connectToRedis() {

    const redisOptions = {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    }

    try{
        const redis = new Redis(redisOptions);
        
        redis.on('connect', function () {
            console.log('Connected to Redis');
            redisInstance = redis;
        })

        redis.on('error', function() {
            console.log('Error connecting to Redis');
            redisInstance = null;
        })
    }
    catch(err){
        console.log(err);
    }

})();

(async function keepTrying() {
    try {
        console.log("Connecting to MongoDB...");
        const connectionString = `mongodb://${process.env.DB_CONNECTION_USERNAME}:${process.env.DB_CONNECTION_PASSWORD}@${process.env.DB_CONNECTION_HOSTNAME}:${process.env.DB_CONNECTION_PORT}/smog?authSource=admin`;
        // console.log(connectionString);
        await mongoose.connect(`mongodb://${process.env.DB_CONNECTION_USERNAME}:${process.env.DB_CONNECTION_PASSWORD}@${process.env.DB_CONNECTION_HOSTNAME}:${process.env.DB_CONNECTION_PORT}/smog?authSource=admin`);
        console.log("Connected to MongoDB");
    }
    catch {
        console.log("Could not connect to MongoDB");
        keepTrying();
    }
})();

app.get('/api/v1/data', apiCache('1 min'), async function(req, res){
    try{

        if(redisInstance !== null) {
            const data = await redisInstance.get('data');
            if(data) {
                return res.status(200).send(JSON.parse(data));
            }
        }

        let data = await City.find({});

        if(redisInstance !== null) {
            await redisInstance.set('data', JSON.stringify(data), 'EX', process.env.REDIS_EXPIRY_TIME);
        }

        res.send(data);
    }
    catch(err){
        console.log(err);
    }
})

app.listen(8000, () => {
    console.log('Server is running on port ' + 8000);
})