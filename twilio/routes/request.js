const request = require('request');

const options = {
    uri : process.env.URI,
    method : 'GET',
};

const AQDeterminer = async (twiml) => {
    request(options, async function(error, response, body) {
            if(error){
                console.log(error);
            }

            let pollutants = JSON.parse(body);

            await twiml.message(`The AQI is ${pollutants.aqius}. The air quality is hazard.`);
            console.log(pollutants.data.current.pollution.aqius);
    })};

    module.exports = AQDeterminer;

