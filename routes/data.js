const router = require('express').Router();
const City = require('../models/city');

router.get('/data', async function(req, res){
    try{

        redisInstance.get('a').then(function(value){
            console.log(value);
        });

        const data = await City.find({});

        res.send(data);
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;