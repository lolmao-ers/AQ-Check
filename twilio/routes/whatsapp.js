const router = require('express').Router();
const twilio = require('twilio');
require('dotenv').config();
const User = require('../models/model')
const getUpdates = require('../../scripts/getupdates')
const City = require('../models/city')
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;


twilio(accountSid, authToken);

const messagingResponse  = require('twilio').twiml.MessagingResponse;

router.post('/recieve',  async (req, res) => { 
     const twiml = new messagingResponse();
     console.log(req.body);

     const name = req.body.ProfileName || 'Anonymous';
     const messageBody = req.body.Body;
     const whatsappNumber = req.body.From;

     const user = new User({
            name,
            phone: whatsappNumber,
     });

     await user.save();
     
     if(messageBody.toLowerCase() === 'hello') {
         twiml.message(`Hello ${name}!, To get your air quality, send your location.`);
     }

     else {  
        try{
            const data = await City.findOne( { state: messageBody }).exec();

            if(!data){
                const AQI = getUpdates(200,300);
                console.log(AQI);

                twiml.message(`The aqi is ${AQI}. The air quality is hazardous.`);
                res.set('Content-Type', 'text/xml');
                return res.status(201).send(twiml.toString());
            }

            twiml.message(`The aqi is ${data.aqi}. The air quality is hazardous.`);
        }
        catch(e){
            console.log(e);
        }
    }

     res.set('Content-Type', 'text/xml');
     res.status(201).send(twiml.toString());
})

module.exports = router;