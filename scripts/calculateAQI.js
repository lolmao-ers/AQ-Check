const ifElse = (mainData) => {
    if(mainData.pm25 == "NA" && mainData.pm10 == "NA"){
        mainData.aqi = "NA";
    }

    else if(mainData.pm25 == "NA"){
       mainData.aqi = Math.floor(mainData.pm10) / 5;
    }

    else if(mainData.pm10 == "NA"){
        mainData.aqi = Math.floor(mainData.pm25 / 5);
    }

    else{
        mainData.aqi = Math.floor(Math.max(mainData.pm25, mainData.pm10) / 5);
    }
};

module.exports = ifElse;