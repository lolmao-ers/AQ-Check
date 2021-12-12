import './styles/App.css';
import React from 'react';

import LeftContainer from './components/leftContainer';
import Example from "./components/map";

const DEFAULT_TITLE = "AQI Levels";

class App extends React.Component {
  
	constructor(props) {
		super(props);
		this.state = {
				title: DEFAULT_TITLE,
				currCityData: null
		};
		this.openCityData = this.openCityData.bind(this);
		this.openCityList = this.openCityList.bind(this);
	}

	openCityData(cityName, cityData) {
		console.log(cityData);
		this.setState({
			title: cityName,
			currCityData: cityData
		});
	}

	openCityList() {
		this.setState({
			title: DEFAULT_TITLE,
		});
	}

  	render() {
    	return (
			<div className="App">
				<LeftContainer cityData = {this.state.currCityData} title = {this.state.title} openCityData = {this.openCityData} openCityList = {this.openCityList}/>
				<Example openCityData = {this.openCityData} />
			</div>
		)
	}
}

export default App;
