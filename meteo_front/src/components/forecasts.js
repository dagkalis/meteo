import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";


import { useGetAPI, useGetAPIWait } from './customHooks';

let firstTime = true;

function ForecastsView(props) {
  const { data: userData, loading: loadingUser, error: errorUser } = useGetAPI('/users/current_user_data');
  const forecastParams = {}
  const { responseData, loading: loadingForecast, error: errorForecast, getData: getForecastData } = useGetAPIWait('/api/v1/forecasts', forecastParams);

  if(userData && userData.length !== 0 && firstTime){
    firstTime = false;
    console.log(userData)
    forecastParams.latitude = userData.latitude;
    forecastParams.longitude = userData.longitude;
    console.log(forecastParams)
    console.log("calling it")
    getForecastData();
  }

  if (errorForecast) {
    return <div>Error: {errorForecast.message}</div>;
  }

  if (loadingForecast) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>time</th>
            <th>date</th>
            <th>hour</th>
            <th>temperature</th>
            <th>rain</th>
            <th>showers</th>
            <th>cloudcover</th>
          </tr>
        </thead>
        <tbody>
          {responseData.map((forecast) => {
            return (
              <tr key={forecast.time}>
                  <td>{forecast.time}</td>
                  <td>{forecast.date}</td>
                  <td>{forecast.hour}</td>
                  <td>{forecast.temperature}</td>
                  <td>{forecast.rain}</td>
                  <td>{forecast.showers}</td>
                  <td>{forecast.cloudcover}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  


}

export default ForecastsView