const request = require('request');
const fs = require('fs');
const checkUnderscores = require('./checkunderscores');

let mainData = {};
let finalData = {};


let x = 0;

(async function start(x = 0){
    let url = `https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=${x}&limit=500`;

    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {

            let data = JSON.parse(body);

            if(data.records.length === 0) {
                // fs.writeFileSync('data.json', JSON.stringify(mainData));
                // finalData.state = checkUnderscores(finalData.state);
                for(let obj of mainData){
                    console.log(obj);
                }
                // console.log(mainData);

                process.exit();
            }

            for(let i = 0; i < data.records.length; i++) {
                let state = data.records[i].state;

                if(!mainData[state]) {
                    mainData[state] = {};
                    finalData.state = state;
                }
                    
        
                let pollutant_id = data.records[i].pollutant_id;
                
                let pollutant_avg = data.records[i].pollutant_avg;
                let pollutant_max = data.records[i].pollutant_max;
                let pollutant_min = data.records[i].pollutant_min;

                mainData[state][pollutant_id] = {};

                if(pollutant_avg != "NA" || pollutant_max != "NA" || pollutant_min != "NA") {
                    mainData[state][pollutant_id].pollutant_avg = pollutant_avg;
                    mainData[state][pollutant_id].pollutant_max = pollutant_max;
                    mainData[state][pollutant_id].pollutant_min = pollutant_min;
                }
            }

            start(x + 50);
        }
    });
})();