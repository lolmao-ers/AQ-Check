const loopFunc = (data, rohiniData) => {
    for(const obj of data){
        switch(obj.name)
        {
            case "PM2.5":
                rohiniData.pm25 = obj.avg;
                rohiniData.pm25min = obj.min;
                rohiniData.pm25max = obj.max;
                break;

            case "PM10":
                rohiniData.pm10 = obj.avg;
                rohiniData.pm10min = obj.min;
                rohiniData.pm10max = obj.max;
                break;

            case "OZONE":
                rohiniData.o3 = obj.avg;
                rohiniData.o3min = obj.min;
                rohiniData.o3max = obj.max;
                break;
            
            case "NO2":
                rohiniData.no2 = obj.avg;
                rohiniData.no2min = obj.min;
                rohiniData.no2max = obj.max;
                break;
            
            case "CO":
                rohiniData.co = obj.avg;
                rohiniData.comin = obj.min;
                rohiniData.comax = obj.max;
                break;

            case "SO2":
                rohiniData.so2 = obj.avg;
                rohiniData.so2min = obj.min;
                rohiniData.so2max = obj.max;
                break;

            case "NH3":
                rohiniData.nh3 = obj.avg;
                rohiniData.nh3min = obj.min;
                rohiniData.nh3max = obj.max;
                break;

            default:
                break;
        }
    }
}

module.exports = loopFunc;