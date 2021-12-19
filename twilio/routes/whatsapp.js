const router = require('express').Router();
const twilio = require('twilio');
require('dotenv').config();

const User = require('../models/user');
const City = require('../models/city');

const findCity = require('../functions/find-city');
// const findState = require('../functions/find-state');
const getUpdates = require('../functions/getupdates');
const changeCapitalisation = require('../functions/change-capitalisation');
const { findLocation, checkLocation } = require('../functions/find-location');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

let scam = {};


twilio(accountSid, authToken);

const messagingResponse  = require('twilio').twiml.MessagingResponse;

router.post('/recieve',  async (req, res) => { 
     const twiml = new messagingResponse();
   //   console.log(req.body);

     const whatsappNumber = req.body.From;
     const name = req.body.ProfileName || 'Anonymous';
     let messageBody = req.body.Body;
    
     try{
         const isUser = await User.findOne({ phone: whatsappNumber });
      
         if(isUser === null || undefined){
            const user = new User({
                  name,
                  phone: whatsappNumber,
            });
      
            await user.save();
         }
     }
     catch(err){
         console.log(err);
     }
    
     
     if(messageBody.toLowerCase().trim() === 'hello') {
         twiml.message(`Hello ${name}!, To get your air quality, send your location.`);
     }

     else if(findLocation(messageBody) !== "404" || findCity(messageBody)) {
        let state = findLocation(messageBody);

        state = changeCapitalisation(state);

        try{
             const data = await City.findOne( { state });
             console.log(data);

             if(data){
                  data._id = undefined;
                
                  let Data = getUpdates(data);
                  
                  scam = { ...Data };
                  messageBody = changeCapitalisation(messageBody);
                  twiml.message(`The aqi is ${Data.aqi} for ${messageBody}. The PM25 PM10 and Ozone level are ${Data.pm25}, ${Data.pm10} and ${Data.o3}. If you want to know more type "/more"`);
             }

             else{
                twiml.message(`Sorry, we could not find ${state} in our database.`);
             }    
        }
        catch(err){
            console.log(err);
        }
     }

     else if(messageBody.toLowerCase().trim() === '/more') {
         if(scam){
            twiml.message(`pm25: ${scam.pm25} pm10: ${scam.pm10} o3: ${scam.o3} so2: ${scam.so2} no2: ${scam.no2} pm25min: ${scam.pm25min} pm25max: ${scam.pm25max} pm10min: ${scam.pm10min} pm10max: ${scam.pm10max} so2min: ${scam.so2min} so2max: ${scam.so2max} no2min: ${scam.no2min} no2max: ${scam.no2max})`); 
            scam.shift; 
         }
         else{
            twiml.message('First, enter location');
         }
     }

     else{
         twiml.message('Invalid Location. Please input correct location!');
     }

     res.set('Content-Type', 'text/xml');
     return res.status(201).send(twiml.toString());
});

module.exports = router;