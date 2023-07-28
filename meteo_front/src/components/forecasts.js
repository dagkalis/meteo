import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

import * as requests from './customHooks';


let firstTime = true;

function ForecastsView(props) {
  const { data: userData, loading: loadingUser, error: errorUser } = requests.useGetAPI('/users/current_user_data');
  const forecastParams = {};
  
  const { responseUserData, loading, error, patchData: patchUserData } = requests.usePatchAPI(`/users/${userData.id}`, forecastParams );

  
  const { responseData, loading: loadingForecast, error: errorForecast, getData: getForecastData } = requests.useGetAPIWait('/api/v1/forecasts', forecastParams);

  if(userData && userData.length !== 0 && firstTime){
    firstTime = false;
    forecastParams.latitude = userData.latitude;
    forecastParams.longitude = userData.longitude;
    getForecastData();
  }

  const handleCoSubmit = (event) => {
    // const formData = new FormData(event.currentTarget);
    let formObject = Object.fromEntries(new FormData(event.currentTarget).entries());
    event.preventDefault();
    
    // console.log(formObject);
    forecastParams.latitude = formObject.latitude;
    forecastParams.longitude = formObject.longitude;
    // getForecastData();
    patchUserData();
  };

  // if (errorForecast) {
  //   return 
  // }
  
  return (
    <div>
      <div>
      <h1>Coordinates</h1>
      <div>
        <form onSubmit={handleCoSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="longitude"
              placeholder="longitude"
              required
              defaultValue={userData.longitude || ''}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="latitude"
              placeholder="latitude"
              defaultValue={userData.latitude || ''}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">
            {  loadingUser ? 'Loading...' : (loadingForecast ? 'Loading forecast...' : 'Load forecast') }
          </button>
        </form>
        {/* {loginErrors && <p>{loginErrors}</p>} */}
      </div>
    </div>
      { 
      loadingForecast
      ?
      <div>Loading...</div>
      :
        (errorForecast 
        ?
          <div>Error: {errorForecast.message}</div> 
        : 
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
          </table>)
      }
    </div>
  );
  


}

export default ForecastsView