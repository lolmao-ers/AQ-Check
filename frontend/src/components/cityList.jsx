import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "../styles/city-list.css";

// dummy
const CITY_LIST_TEST_DATA = {
	Wakanda: 0,
	Delhi: 500,
	Latveria: 350,
	Mirzapur: 200,
};

const CITY_LIST_TEST_DATA1 = [
	{
		cityName: "Wakanda",
		aqiScore: 0,
	},
	{
		cityName: "Delhi",
		aqiScore: 500,
	},
	{
		cityName: "Latveria",
		aqiScore: 350,
	},
	{
		cityName: "Mirzapur",
		aqiScore: 200,
	},
	{
		cityName: "Wakanda",
		aqiScore: 0,
	},
	{
		cityName: "Delhi",
		aqiScore: 500,
	},
	{
		cityName: "Latveria",
		aqiScore: 350,
	},
	{
		cityName: "Mirzapur",
		aqiScore: 200,
	},
	{
		cityName: "Wakanda",
		aqiScore: 0,
	},
	{
		cityName: "Delhi",
		aqiScore: 500,
	},
	{
		cityName: "Latveria",
		aqiScore: 350,
	},
	{
		cityName: "Mirzapur",
		aqiScore: 200,
	},
	{
		cityName: "Wakanda",
		aqiScore: 0,
	},
	{
		cityName: "Delhi",
		aqiScore: 500,
	},
	{
		cityName: "Latveria",
		aqiScore: 350,
	},
	{
		cityName: "Mirzapur",
		aqiScore: 200,
	},
	{
		cityName: "Wakanda",
		aqiScore: 0,
	},
	{
		cityName: "Delhi",
		aqiScore: 500,
	},
	{
		cityName: "Latveria",
		aqiScore: 350,
	},
	{
		cityName: "Mirzapur",
		aqiScore: 200,
	},
	{
		cityName: "Wakanda",
		aqiScore: 0,
	},
	{
		cityName: "Delhi",
		aqiScore: 500,
	},
	{
		cityName: "Latveria",
		aqiScore: 350,
	},
	{
		cityName: "Mirzapur",
		aqiScore: 200,
	},
	{
		cityName: "Wakanda",
		aqiScore: 0,
	},
	{
		cityName: "Delhi",
		aqiScore: 500,
	},
	{
		cityName: "Latveria",
		aqiScore: 350,
	},
	{
		cityName: "Mirzapur",
		aqiScore: 200,
	},
	{
		cityName: "Wakanda",
		aqiScore: 0,
	},
	{
		cityName: "Delhi",
		aqiScore: 500,
	},
	{
		cityName: "Latveria",
		aqiScore: 350,
	},
	{
		cityName: "Mirzapur",
		aqiScore: 200,
	},
	{
		cityName: "Wakanda",
		aqiScore: 0,
	},
	{
		cityName: "Delhi",
		aqiScore: 500,
	},
	{
		cityName: "Latveria",
		aqiScore: 350,
	},
	{
		cityName: "Mirzapur",
		aqiScore: 200,
	},
];

export default class CityList extends React.Component {
	constructor(props) {
		super(props);
		this.clickedCityTile = this.clickedCityTile.bind(this);
	}
	clickedCityTile(cityName)
	{
		this.props.openCityData(cityName);	
	}
	CityListTile(cityName, aqiScore) {
		return (
			<tr className="city-list-tile" onClick={() => { this.clickedCityTile(cityName) }}>
				<tr className="city-tile-data">
					<td className="city-name">{cityName}</td>
					<td className="aqi-score">{aqiScore}</td>
				</tr>
				<FontAwesomeIcon
					icon={faChevronRight}
					className="city-list-tile right-arrow"
				/>
			</tr>
		);
	}

	render() {
		return (
			<div id="city-list-table-container">
				<table id="city-list-table">
					{CITY_LIST_TEST_DATA1.map(({ cityName, aqiScore }) => {
						return this.CityListTile(cityName, aqiScore);
					})}
				</table>
			</div>
		);
	}
}
