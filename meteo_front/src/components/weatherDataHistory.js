import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useParams } from "react-router-dom";

import * as requests from './customHooks';
import WeatherView from './weatherView';
import ForecastDatesNav from './forecastDatesNav';
import * as Icon from 'react-bootstrap-icons';
import Loader from './loading';
import * as Messages from './message';
import { ViewType } from './weatherView';


let deleteFlag = false; // whether deleteWeatherDataHistoryBtn has been clicked

function WeatherDataHistory(props) {
	const request = requests.useGetAPI(`api/v1/weather_data_histories/${useParams().id}`);
	const deleteRequest = requests.useDeleteAPI(`api/v1/weather_data_histories/${useParams().id}`);
	const navigate = useNavigate();

	function deleteWeatherDataHistory() {
		console.log(deleteRequest);
		if (window.confirm("Are you sure you want to delete the record?")) {
			deleteRequest.deleteData();
			deleteFlag = true;
		}
	}

	const [currentDate, setCurrentDate] = useState("");
	const [currentViewType, setCurrentViewType] = useState(ViewType.CHART);


	if (deleteFlag) {
		return DeleteRequestRender(deleteRequest, navigate);
	} else {
		return RequestRender(request,
			 deleteWeatherDataHistory,
			 currentDate,
			 setCurrentDate,
			 currentViewType,
			 setCurrentViewType);
	}



}

let jsonData;
function RequestRender(request, deleteWeatherDataHistory, currentDate, setCurrentDate, currentViewType, setCurrentViewType) {
	if (request.loading) {
		return <Loader />
	}

		if (request.error) {
		return <div className='container'>
							<Messages.DangerMsg children={request.error.response?.data} />
						</div>
	}

	if (request.data.length != 0) {
		if (!jsonData)
			jsonData = JSON.parse(request.data.data);

		if (Object.keys(jsonData).length > 0 && currentDate === "")
			setCurrentDate(Object.keys(jsonData)[0]) // set the first date

		return <>
			<div style={{ margin: "1em" }}>
				{<ForecastDatesNav dates={Object.keys(jsonData)}
					currentDate={currentDate}
					setCurrentDate={setCurrentDate}
					currentViewType={currentViewType}
          setCurrentViewType={setCurrentViewType}
				/>}

				{< WeatherView weatherData={jsonData}
					currentDate={currentDate}
					currentViewType={currentViewType}
				 />}

				<br></br><br></br>
				<button style={{ float: "right" }} onClick={deleteWeatherDataHistory} id='deleteWeatherDataHistoryBtn' className="float-right btn-danger btn btn-lg">
					<Icon.Trash fill="white" size="20" /> | Delete
				</button>
			</div>
		</>

	}
}


function DeleteRequestRender(deleteRequest, navigate) {

	if (deleteRequest.loading) {
		return <Loader />
	}

	if (deleteRequest.error) {
		return <div className='container'>
							<Messages.DangerMsg children={deleteRequest.error.response?.data} />
						</div>
	}

	if (deleteRequest.responseData) {
		console.log("deleted", deleteRequest.responseData);
		deleteFlag = false;
		navigate('/weather_data_histories');
		return "";
	}
}

export default WeatherDataHistory;