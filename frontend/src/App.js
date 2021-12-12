import './styles/App.css';
import React from 'react';
import axios from 'axios';

import LeftContainer from './components/leftContainer';
import Example from "./components/map";

const DEFAULT_TITLE = "AQI Levels";

class App extends React.Component {
  
	constructor(props) {
		super(props);
		this.state = {
				title: DEFAULT_TITLE,
				currCityData: null,
				cityList: null
		};
		this.openCityData = this.openCityData.bind(this);
		this.openCityList = this.openCityList.bind(this);
		this.getCityList = this.getCityList.bind(this);
	}

	async getCityList() {
		const connectionString = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_PORT}/api/v1/data`;
		const response = await axios.get(connectionString);
		this.setState({
			cityList: response.data
		});
		console.log(response.data);
	}

	openCityData(cityName, cityData) {
		this.setState({
			title: cityName,
			currCityData: cityData,
		});
	}

	openCityList() {
		this.setState({
			title: DEFAULT_TITLE,
		});
	}

	componentDidMount() {
		this.getCityList();
	}

  	render() {
    	return (
			<div className="App">
				<LeftContainer cityList = {this.state.cityList} cityData = {this.state.currCityData} title = {this.state.title} openCityData = {this.openCityData} openCityList = {this.openCityList}/>
				<Example openCityData = {this.openCityData} cityList = {this.state.cityList} />
			</div>
		)
	}
}

export default App;
