import React from "react";
import '../styles/city-data.scss';
import DonutMeter from "./donutMeter";

const CityDataTile = ({ name, min, avg, max }) =>
{
    return (
        <tr className="city-data-tile">
            <td className="pollutant-name">{name}</td>
            <td className="pollutant-min">{min}</td>
            <td className="pollutant-avg">{avg}</td>
            <td className="pollutant-max">{max}</td>
        </tr>
    );
};

const CityDataTable = ({cityData}) =>
{
    return (
        <table id="city-data-table">
            <tr className="city-data-tile">
                <th className="pollutant-name">pollutant</th>
                    <th className="pollutant-min">min</th>
                    <th className="pollutant-avg">avg</th>
                    <th className="pollutant-max">max</th>
            </tr>
            { CityDataTile({ name: "pm2.5", min: cityData.pm25min , avg: cityData.pm25, max: cityData.pm25max }) }
            { CityDataTile({ name: "pm10", min: cityData.pm10min , avg: cityData.pm10, max: cityData.pm10max }) }
            { CityDataTile({ name: "no2", min: cityData.no2min , avg: cityData.no2, max: cityData.no2max }) }
            { CityDataTile({ name: "nh3", min: cityData.nh3min , avg: cityData.nh3, max: cityData.nh3max }) }
            { CityDataTile({ name: "so2", min: cityData.so2min , avg: cityData.so2, max: cityData.so2max }) }
            { CityDataTile({ name: "co", min: cityData.comin , avg: cityData.co, max: cityData.comax }) }
            { CityDataTile({ name: "o3", min: cityData.o3min , avg: cityData.o3, max: cityData.o3max }) }
        </table>
    );
};

export default class CityData extends React.Component
{
    render() {
        return (
            <div id="city-data">
                <DonutMeter AQI_SCORE={this.props.cityData.aqi} />
                <CityDataTable cityData = {this.props.cityData}/>
            </div>
        );
    }
}