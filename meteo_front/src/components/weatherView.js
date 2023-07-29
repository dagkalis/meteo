import React from 'react'
import { useEffect, useState } from "react";

import { Chart } from "react-google-charts";


function WeatherView(props) {
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
		// backgroundColor: "white", //
		// hAxis: {
		// 	textStyle: {
		// 	  color: '#000'
		// 	}
		//   },
		// vAxis: {
		// textStyle: {
		// 	color: '#000'
		// }  
		// },
		// colors: ['cyan'],
		// titleTextStyle: {
		// 	color: '#000'
		//   },

		//   backgroundColor: {
		// 	fill: window.getComputedStyle(document.body, null).getPropertyValue('background-color'),
		//   },

		// opacity: '0.3'
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