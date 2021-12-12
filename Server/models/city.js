const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    state: { type: String, required: true },
    city: { type: String, required: true },
    aqi: {type: String, required: true},
    pm25: {type: String, required: true},
    pm25min: {type: String, required: true},
    pm25max: {type: String, required: true},
    pm10: {type: String, required: true},
    pm10min: {type: String, required: true},
    pm10max: {type: String, required: true},
    so2: {type: String, required: true},
    so2min: {type: String, required: true},
    so2max: {type: String, required: true},
    no2: {type: String, required: true},
    no2min: {type: String, required: true},
    no2max: {type: String, required: true},
    co: {type: String, required: true},
    comin: {type: String, required: true},
    comax: {type: String, required: true},
    o3: {type: String, required: true},
    o3min: {type: String, required: true},
    o3max: {type: String, required: true},
    nh3: {type: String, required: true},
    nh3min: {type: String, required: true},
    nh3max: {type: String, required: true},
});

module.exports = mongoose.model('aqimodels', citySchema);