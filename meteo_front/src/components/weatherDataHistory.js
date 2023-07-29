import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useParams } from "react-router-dom"

import * as requests from './customHooks';
import WeatherView from './weatherView';

let deleteFlag = false; // whether deleteWeatherDataHistoryBtn has been clicked

function WeatherDataHistory(props) {
  const request = requests.useGetAPI(`api/v1/weather_data_histories/${useParams().id}`);
	const deleteRequest = requests.useDeleteAPI(`api/v1/weather_data_histories/${useParams().id}`);
	const navigate = useNavigate();

	function deleteWeatherDataHistory(){
		console.log(deleteRequest);
		deleteRequest.deleteData();
		deleteFlag = true;
	}

	if(deleteFlag){
		return DeleteRequestRender(deleteRequest, navigate);
	} else{
		return RequestRender(request, deleteWeatherDataHistory);
	}

	
  
}

function RequestRender(request, deleteWeatherDataHistory){
	if (request.loading) {
		return <div>Loading...</div>
	}

	if (request.error) {
		return <div>Error: {request.error}</div>
	}

	if (request.data.length != 0) {
		return <>
			<button id="deleteWeatherDataHistoryBtn" onClick ={deleteWeatherDataHistory}>Delete</button>
    	< WeatherView weatherData={JSON.parse(request.data.data)} />
    </>
        
	}
}

function DeleteRequestRender(deleteRequest, navigate){

	if (deleteRequest.loading) {
		return <div>Deleting...</div>
	}

	if (deleteRequest.error) {
		return <div>Error with delete: {deleteRequest.error}</div>
	}

	if (deleteRequest.responseData){
		console.log("deleted", deleteRequest.responseData);
		deleteFlag = false;
		navigate('/weather_data_histories');
		return "";
	}
}

export default WeatherDataHistory;