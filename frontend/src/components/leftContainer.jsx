import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "../styles/box-container.css";
import "../styles/left-container.scss";
import CityData from "./cityData";
import CityList from "./cityList";
// import SearchBar from "./searchBar";

const Title = (props) =>
{
	return <span id="title">{props.title}</span>;
};

const BackButton = ({ onClick, className }) =>
{
	return <div id="back-button" className={"header-buttons " + className} onClick={onClick}>
		<FontAwesomeIcon
			icon={faChevronLeft}
			id="left-arrow"
		/>
	</div>;
};

const DEFAULT_TITLE = "AQI Levels";

export default class LeftContainer extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	openCityData(cityName)
	{
		console.log(cityName)
		this.setState({
			title: cityName,
		});
	}

	openCityList()
	{
		this.setState({
			title: DEFAULT_TITLE,
		});
	}

	render()
	{
		return (
			<div id="left-container" className="box-container">
				<div id="left-container-header">
					<BackButton className={this.state.title === DEFAULT_TITLE ? "hide" : ""} onClick={this.openCityList} />
					<Title title={this.state.title} />
					<div className="header-buttons"></div>	{/* <SearchBar/> */}
				</div>
				<hr />

				{this.state.title === DEFAULT_TITLE ? (
					<CityList openCityData={this.openCityData} />
				) : (
					<CityData cityName={this.state.title} />
				)}
			</div>
		);
	}
}
