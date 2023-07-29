import React from 'react'
import { useEffect, useState } from "react";

import { Chart } from "react-google-charts";


function WeatherView(props) {
	const data = [
		["Hour", "Temperature"],
	];

	props.weatherData[Object.keys(props.weatherData)[0]].forEach(element => {
		data.push([element.hour, element.temp])
	});

	const options = {
		title: "29/7/2023",
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
	



	// return (
		// Object.keys(props.weatherData).map((date) => {
		// 	return (
		// 		<>
		// 			<h2>{date}</h2>
		// 			<table>
		// 				<thead>
		// 					<tr>
		// 						<th>hour</th>
		// 						<th>temperature</th>
		// 					</tr>
		// 				</thead>
		// 				<tbody>
		// 					{props.weatherData[date].map((forecast) => {
		// 						return (
		// 							<tr key={forecast.hour}>
		// 								<td>{forecast.hour}</td>
		// 								<td>{forecast.temp}</td>
		// 							</tr>
		// 						);
		// 					})}
		// 				</tbody>
		// 			</table>
		// 		</>
		// 	)
		// })
	// )

		
	// )

	return (
		<table>
			<thead>
				<tr>
					<th>date</th>
					<th>hour</th>
					<th>temperature</th>
				</tr>
			</thead>
			<tbody>
				{props.weatherData.map((forecast) => {
					return (
						<tr key={forecast.time}>
							<td>{forecast.date}</td>
							<td>{forecast.hour}</td>
							<td>{forecast.temperature}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	)

}

export default WeatherView;