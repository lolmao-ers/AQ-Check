const mongoose = require('mongoose');

const aqiSchema = new mongoose.Schema({
    state: {
        type: String, 
        required: true
    },
    
    city: {
        type: String, 
    },

    aqi: {
        type: String, 
        required: true
    },

    pm25: {
        type: String,
        required: true
    },

    pm25min: {
        type: String,
    },

    pm25max:{
        type: String,
    },

    pm10: {
        type: String,
        required: false
    },

    pm10max: {
        type: String,
    },

    pm10min: {
        type: String,
    },

    so2: {
        type: String,
        required: false
    },

    so2max: {
        type: String,
    },

    so2min: {
        type: String,
    },

    no2: {
        type: String,
        required: false
    },

    no2max: {
        type: String,
    },

    no2min: {
        type: String,
    },

    co: {
        type: String,
        required: false
    },

    comax: {
        type: String,
    },

    comin: {
        type: String,
    },

    nh3: {
        type: String,
        required: false
    },

    nh3max: {
        type: String,
    },

    nh3min: {
        type: String,
    },

    o3: {
        type: String,
        required: false
    },

    o3max: {
        type: String,
    },

    o3min: {
        type: String,
    },
});

const aqiModel = mongoose.model('AQIModel', aqiSchema);

module.exports = aqiModel;