import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import axios from "axios";
import "../styles/box-container.css";
import "../styles/left-container.scss";
import CityData from "./cityData";
import CityList from "./cityList";

const Title = (props) => {
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

export default class LeftContainer extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div id="left-container" className="box-container">
				<div id="left-container-header">
					<BackButton className={this.props.title === DEFAULT_TITLE ? "hide" : ""} onClick={this.props.openCityList} />
					<Title title={this.props.title} />
					<div className="header-buttons"></div>
				</div>
				<hr />

				{this.props.title === DEFAULT_TITLE ? (
					<CityList cityList = {this.props.cityList} openCityData={this.props.openCityData} />
				) : (
					<CityData cityName={this.props.title} cityData={this.props.cityData} />
				)}
			</div>
		);
	}
}
