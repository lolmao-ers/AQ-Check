const checkUnderscores = require('./modifyStatenames');
const request = require("request");
const ifElse = require('./calculateAQI')
const AQI = require("./pollutantsModel");
const fs = require('fs');

require('./db')

let mainData = {};
let j = 0;

const uniqueCities = new Set();

(async function start(x = 0) {
  let url = `https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=${x}&limit=500`;

  request(url, async function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let data = JSON.parse(body);

      if (data.records.length === 0) {
          process.exit();
      }

      for (let i = 0; i < data.records.length; i++) {
        let state = data.records[i].state;
        
        state = checkUnderscores(state);

        if (!mainData.state) {
          if(uniqueCities.has(state)){
            continue;
          }
          uniqueCities.add(state);
          mainData.state = state;
        }

        let pollutant_id = data.records[i].pollutant_id;

        let pollutant_avg = data.records[i].pollutant_avg;
        let pollutant_max = data.records[i].pollutant_max;
        let pollutant_min = data.records[i].pollutant_min;

        if(pollutant_avg == "NA" || pollutant_max == "NA" || pollutant_min == "NA") {
                continue;
        }

        switch (pollutant_id) {
          case "PM2.5":
            mainData.pm25 = pollutant_avg;;
            mainData.pm25min = pollutant_min;
            mainData.pm25max = pollutant_max;
            break;

          case "PM10":
            mainData.pm10 = pollutant_avg;
            mainData.pm10min = pollutant_min;
            mainData.pm10max = pollutant_max;
            break;

          case "OZONE":
            mainData.o3 = pollutant_avg;
            mainData.o3min = pollutant_min;
            mainData.o3max = pollutant_max;
            break;

          case "NO2":
            mainData.no2 = pollutant_avg;
            mainData.no2min = pollutant_min;
            mainData.no2max = pollutant_max;
            break;

          case "CO":
            mainData.co = pollutant_avg;
            mainData.comin = pollutant_min;
            mainData.comax = pollutant_max;
            break;

          case "SO2":
            mainData.so2 = pollutant_avg;
            mainData.so2min = pollutant_min;
            mainData.so2max = pollutant_max;
            break;

          case "NH3":
            mainData.nh3 = pollutant_avg;
            mainData.nh3min = pollutant_min;
            mainData.nh3max = pollutant_max;
            break;

          default:
            break;
        };

        if(mainData.pm25 !== undefined && mainData.pm25min !== undefined && mainData.pm25max !== undefined && mainData.pm10 !== undefined && mainData.pm10max !== undefined && mainData.pm10min !== undefined && mainData.o3 !== undefined && mainData.o3min !== undefined && mainData.o3max !== undefined && mainData.no2 !== undefined && mainData.no2min !== undefined && mainData.no2max !== undefined && mainData.co !== undefined && mainData.comin !== undefined && mainData.comax !== undefined && mainData.so2 !== undefined && mainData.so2min !== undefined && mainData.so2max !== undefined && mainData.nh3 !== undefined && mainData.nh3min !== undefined && mainData.nh3max !== undefined){
            console.log("hello");
            try{
                ifElse(mainData); //aqi calculation
                
                const aqi = new AQI(mainData);

                console.log(++j);
                await aqi.save();
                // fs.appendFile('data.json', JSON.stringify(mainData), function (err) {
                //   if(err) throw err;
                //   console.log('Saved!');
                // });

                mainData = {};
                
            }
            catch(e){
                console.log(e);
            }
        }
      }

      start(x + 1);
    }
  });
})();
