const mongoose = require('mongoose');
const dotenv = require('dotenv');
const city = require('./models/city');

dotenv.config();

const cityIds = {
    'Andhra Pradesh': 'AP',
    'Arunachal Pradesh': 'AR',
    'Assam': 'AS',
    'Bihar': 'BR',
    'Chhattisgarh': 'CT',
    'Goa': 'GA',
    'Gujarat': 'GJ',
    'Haryana': 'HR',
    'Himachal Pradesh': 'HP',
    'Jharkhand': 'JH',
    'Karnataka': 'KA',
    'Kerala': 'KL',
    'Madhya Pradesh': 'MP',
    'Maharashtra': 'MH',
    'Manipur': 'MN',
    'Meghalaya': 'ML',
    'Mizoram': 'MZ',
    'Nagaland': 'NL',
    'Odisha': 'OR',
    'Punjab': 'PB',
    'Rajasthan': 'RJ',
    'Sikkim': 'SK',
    'Tamil Nadu': 'TN',
    'Telangana': 'TG',
    'Tripura': 'TR',
    'Uttarakhand': 'UT',
    'Uttar Pradesh': 'UP',
    'West Bengal': 'WB',
    'AndamanandNicobarIslands': 'AN',
    'Chandigarh': 'CH',
    'Dadra and Nagar Haveli': 'DN',
    'Daman and Diu': 'DD',
    'Delhi': 'DL',
    'Jammu and Kashmir': 'JK',
    'Ladakh': 'LA',
    'Lakshadweep': 'LD',
    'Puducherry': 'PY'
} 

async function addMapIDS() {
    try {
        const cities = await city.find({});
        
        for(const city of cities) {
            // let mapId = cityIds[city.state]

            // if(city.state === 'Jammu & Kashmir') {
            //     mapId = 'JK'
            // }

            // if(city.state === 'TamilNadu') {
            //     mapId = 'TN'
            // }

            // city.mapId = mapId;

            // city['value'] = city.aqi;

            console.log(city)
            // await city.save();
            // console.log(city.value)

            // console.log(mapId);
        }

        process.exit();
    }
    catch (err){
        console.log('Error: ', err);
    }
}

(async function() {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('Connected to database.');
        addMapIDS();
    }
    catch {
        console.log('Failed to connect to database.');
    }
})();