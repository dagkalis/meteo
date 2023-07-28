import React, { useState } from 'react'
import { useNavigate } from 'react-router';


import * as requests from './customHooks';
import WeatherView from './weatherView';

let firstTime = true;
let weatherDataHisIDPrev = 0;

function WeatherDataHistories(props) {
    const navigate = useNavigate();

    const { data, loading, error } = requests.useGetAPI('api/v1/weather_data_histories');

    const [weatherDataHisID, setWeatherDataHisID] = useState(0);
    const {
        responseData: weatherDataHisResponse,
        loading: weatherDataHisLoading,
        error: weatherDataHisError,
        getData: getWeatherDataHis } = requests.useGetAPIWait(`/api/v1/weather_data_histories/${weatherDataHisID}`, {});


    function handleClick(weatherDataHistoryID){
        setWeatherDataHisID(weatherDataHistoryID);
    }

    if(weatherDataHisID != weatherDataHisIDPrev){
        weatherDataHisIDPrev = weatherDataHisID;
        firstTime = false;
        getWeatherDataHis();
    }

    // todo move to other file and path
    if(weatherDataHisResponse.length != 0){
        console.log(weatherDataHisResponse)
        return < WeatherView weatherData={JSON.parse(weatherDataHisResponse.data)} />
    }


    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Error: {error.message}</div>
    }

    return(
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {data.map((weatherDataHistory) => {
                    return (
                    <tr onClick= {() => handleClick(weatherDataHistory.id) } key={weatherDataHistory.id}>
                        <td>{weatherDataHistory.id}</td>
                        <td>{weatherDataHistory.created_at}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    )

}

export default WeatherDataHistories;