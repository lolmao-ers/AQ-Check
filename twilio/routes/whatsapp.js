const router = require('express').Router();
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

twilio(accountSid, authToken);

const messagingResponse  = require('twilio').twiml.messagingResponse();

router.post('/recieve',  (req, res) => { 
     const twiml = new messagingResponse();

     const name = req.body.profileName || 'Anonymous';
     const messageBody = req.body.Body;
     const whatsappNumber = req.body.From;
     
     if(messageBody.toLowerCase() === 'Hello!') {
         twiml.message(`Hello ${name}!, To get your air quality, send your location.`);
     }

     else if()

    //  res.set('Content-Type', 'text/xml');
    //  res.status(201).send(message.toString());
})

module.exports = router;