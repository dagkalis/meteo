import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import * as requests from './customHooks';
import Loader from './loading';

import Container from 'react-bootstrap/Container';



function WeatherDataHistories(props) {
	const navigate = useNavigate();

	const { data, loading, error } = requests.useGetAPI('api/v1/weather_data_histories');


	function handleClick(weatherDataHistoryID) {
		navigate(weatherDataHistoryID.toString());
	}


	if (loading) {
		return <Loader />
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<div className='container wrapper_for_table' style={{}}>
			<div style={{ margin: "5em 8em" }}>
				<table className="table table-bordered table-hover">
					<thead >
						<tr>
							<th style={{textAlign: "center"}} colSpan={2}><h2>Stored Weather Data</h2></th>
						</tr>
						<tr>
							<th >#</th>
							<th >Date</th>
						</tr>
					</thead>
					<tbody>
						{data.map((weatherDataHistory) => {
							return (
								<tr style={{ cursor: "pointer" }} onClick={() => handleClick(weatherDataHistory.id)} key={weatherDataHistory.id}>
									<td>{weatherDataHistory.id}</td>
									<td>{weatherDataHistory.created_at}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
		
	)

}

export default WeatherDataHistories;