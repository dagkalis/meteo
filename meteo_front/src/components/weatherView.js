import React from 'react'
import { useEffect, useState } from "react";

import { Chart } from "react-google-charts";

export const ViewType = Object.freeze({
	CHART: "Chart",
	TABLE: "Table",
});


function WeatherView(props) {

	if(props.currentViewType === ViewType.CHART)
		return chartRender(props);
	else
		return tableRender(props);
}

function chartRender(props){
	const data = [
		["Hour", "Temperature"],
	];

	props.weatherData[props.currentDate].forEach(element => {
		data.push([`${element.hour}:00`, element.temp])
	});

	const options = {
		title: props.currentDate,
		curveType: "function",
		legend: { position: "bottom" },
	};

	return (
		<Chart
			chartType="LineChart"
			width="100%"
			height="400px"
			data={data}
			options={options}
		/>
	);
}

function tableRender(props){
	return (
		// <div className='container'>
		// 	<div style={{ margin: "5em 8em" }}>
		<div class="table-responsive wrapper_for_table wrapper_for_weather_table">
			<table
				className="table-bordered table-hover w-auto mw-100"
				style={{ minWidth: "100%" }}>
				<thead >
					<tr>
						<th style={{ textAlign: "center" }} colSpan={24}><h2>{props.currentDate}</h2></th>
					</tr>
					<tr>
						{props.weatherData[props.currentDate].map(element => {
							return (<th>{`${element.hour}:00`}</th>)
							// data.push([`${element.hour}:00`, element.temp])
						})}
					</tr>
				</thead>
				<tbody>
					<tr key={"tr"}>
						{props.weatherData[props.currentDate].map(element => {
							return (<td>{element.temp}</td>)
							// data.push([`${element.hour}:00`, element.temp])
						})}
					</tr>
				</tbody>
			</table>
		</div>
		// </div>
	)
}

export default WeatherView;