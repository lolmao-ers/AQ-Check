import React from "react";

import '../styles/city-data.scss';
import DonutMeter from "./donutMeter";


const TEST_CITY_DATA = {
    "aqi-score": 200,
    "aqi-data": [
        {
            "name": "pm2.5",
            "min": 0,
            "avg": 5,
            "max": 10
        },
        {
            "name": "pm10",
            "min": 0,
            "avg": 5,
            "max": 10
        },
        {
            "name": "no2",
            "min": 0,
            "avg": 5,
            "max": 10
        },
        {
            "name": "nh3",
            "min": 0,
            "avg": 5,
            "max": 10
        }, {
            "name": "so2",
            "min": 0,
            "avg": 5,
            "max": 10
        }, {
            "name": "co2",
            "min": 0,
            "avg": 5,
            "max": 10
        },
    ]
};

const CityDataTile = ({ name, min, avg, max }) =>
{
    return (
        <tr className="city-data-tile">
            <td className="pollutant-name">{name}</td>
            {/* <tr className="pollutant-data"> */}
                <td className="pollutant-min">{min}</td>
                <td className="pollutant-avg">{avg}</td>
                <td className="pollutant-max">{max}</td>
            {/* </tr> */}
        </tr>
    );
};

const CityDataTable = () =>
{
    return (
        <table id="city-data-table">
            <tr className="city-data-tile">
                <th className="pollutant-name">pollutant</th>
                {/* <tr className="pollutant-data"> */}
                    <th className="pollutant-min">min</th>
                    <th className="pollutant-avg">avg</th>
                    <th className="pollutant-max">max</th>
                {/* </tr> */}
            </tr>
            {TEST_CITY_DATA["aqi-data"].map(({ name, min, avg, max }) => { return CityDataTile({ name, min, avg, max }); })}
        </table>
    );
};

export default class CityData extends React.Component
{
    render()
    {
        return (
            <div id="city-data">
                <DonutMeter />
                <CityDataTable/>
            </div>
        );
    }
}