function getUpdates(data) { 
    let modifiedData = {};

    for(const key in data){
        const max = parseInt(data[key]);
        const min = parseInt(data[key]) + 20;
        let value = data[key];

        if(max !== NaN || min !== NaN){
            value =  Math.floor(Math.random() * (max - min + 1) + min);
        }
        
        modifiedData[key] = value;
    }

    return modifiedData;
}

module.exports = getUpdates