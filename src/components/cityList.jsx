import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "../styles/city-list.css";

export default class CityList extends React.Component {
	constructor(props) {
		super(props);
		this.clickedCityTile = this.clickedCityTile.bind(this);
	}

	clickedCityTile(cityName, cityData) {
		this.props.openCityData(cityName, cityData);	
	}
	
	CityListTile(cityName, aqiScore, key, cityData) {
		return (
			<tr className="city-list-tile" key = {key} onClick={() => { this.clickedCityTile(cityName,cityData ) }}>
				<tr className="city-tile-data">
					<td className="city-name">{cityName}</td>
					<td className="aqi-score">{aqiScore*5}</td>
				</tr>
				<FontAwesomeIcon
					icon={faChevronRight}
					className="city-list-tile right-arrow"
				/>
			</tr>
		);
	}

	render() {
		let count = 0;
		return (
			<div id="city-list-table-container">
				<table id="city-list-table">
					{this.props.cityList && this.props.cityList.map((current) => {
						count ++;
						return this.CityListTile(current.state, current.aqi, count, current);
					})}
				</table>
			</div>
		);
	}
}
