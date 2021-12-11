import React from "react";

import "../styles/donut-meter.scss";

const AQI_SCORE = 305;

const DONUT_METER_COLORS = [
	"rgb(0, 176, 80)",
	"rgb(146, 208, 80)",
	"rgb(255, 255, 0)",
	"rgb(255, 153, 0)",
	"rgb(255, 0, 0)",
	"rgb(192, 0, 0)",
];

export default class DonutMeter extends React.Component
{
	constructor(props)
	{
		super(props);
		this.foreground = React.createRef();
	}
	setMeterBGColorAndPercentage(score)
	{
		const percentage = Math.round(score / 5); // score/500 * 100
		const angleOfRotation = 1.8 * percentage;

		let meterColor;

		if (score <= 50)
		{
			meterColor = DONUT_METER_COLORS[0];
		}
		else if (score <= 100)
		{
			meterColor = DONUT_METER_COLORS[1];
		}
		else if (score <= 200)
		{
			meterColor = DONUT_METER_COLORS[2];
		}
		else if (score <= 300)
		{
			meterColor = DONUT_METER_COLORS[3];
		}
		else if (score <= 400)
		{
			meterColor = DONUT_METER_COLORS[4];
		}
		else
		{
			meterColor = DONUT_METER_COLORS[5];
		}
		this.foreground.current.style.backgroundColor = meterColor;
		this.foreground.current.style.transform = `rotate(${-180 + angleOfRotation}deg)`;
	}
	componentDidMount()
	{
		this.setMeterBGColorAndPercentage(AQI_SCORE);
	}
	render()
	{
		return (
			<div className="donut-meter-container">
				<div className="donut-meter" data-value={AQI_SCORE}>
					<div className="donut-background"></div>
					<div className="donut-foreground" ref={this.foreground}></div>
					<div className="donut-center">
						<span className="donut-meter-score">{AQI_SCORE}</span>
					</div>
				</div>
				<div className="donut-meter-labels">
					<label className="min">0</label>
					<label className="name">aqi</label>
					<label className="max">500</label>
				</div>
			</div>
		);
	}
}
