import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

import * as requests from './customHooks';
import WeatherView from './weatherView';
import ForecastDatesNav from './forecastDatesNav';

function ForecastsView(props) {

  let forecastParams = {};
  const { responseData: forecastData, loading: loadingForecast, error: errorForecast, getData: getForecastData } = requests.useGetAPIWait('/api/v1/forecasts', forecastParams);

  const [currentDate, setCurrentDate] = useState("");

  let weatherDataHistoryParams = {};
  const { responseData: weatherDataPostResponse,
     loading: weatherDataPostLoading,
      error: weatherDataPostError,
       postData: postWeatherData } = requests.usePostAPI('/api/v1/weather_data_histories', weatherDataHistoryParams);

  useEffect(() => {
    let errorMsg;
    if (!navigator.geolocation){
      alert("Geolocation is not supported by this browser.");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        forecastParams.latitude = position.coords.latitude;
        forecastParams.longitude = position.coords.longitude;
        getForecastData();
      },
      (error) => {
        console.log(error);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = "Please allow the location request."
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = "Location information is unavailable."
            break;
          case error.TIMEOUT:
            errorMsg = "The request to get user location timed out."
            break;
          case error.UNKNOWN_ERROR:
            errorMsg = "An unknown error occurred."
            break;
        }
        alert(errorMsg)
      }
    )
  }, []);

  function storeWeatherData(){
    weatherDataHistoryParams.data = JSON.stringify(forecastData)
    postWeatherData(); 
  }

  if(weatherDataPostResponse){
    document.getElementById("storeWeatheDataBtn").disabled = true;
  }
  if(Object.keys(forecastData).length > 0 && currentDate === "")
    setCurrentDate(Object.keys(forecastData)[0]) // set the first date

  return (
    <div>
      {
      Object.keys(forecastData).length > 0
      ?
        (<>
          {<ForecastDatesNav dates={Object.keys(forecastData)}
                            currentDate={currentDate}
                            setCurrentDate={setCurrentDate} 
          />}
          
          {< WeatherView weatherData={forecastData}
                         currentDate={currentDate}  />}
          <button id="storeWeatheDataBtn" onClick ={storeWeatherData}>Save </button>
        </>)
      :
        (errorForecast 
        ?
          <div>Error: {errorForecast.message}</div> 
        : 
          <div>Loading...</div>
        )
      }

    </div>
  );
  


}

export default ForecastsView;


  // const { data: userData, loading: loadingUser, error: errorUser } = requests.useGetAPI('/users/current_user_data');
  // const { responseUserData, loading, error, patchData: patchUserData } = requests.usePatchAPI(`/users/${userData.id}`, forecastParams );

  // if(userData && userData.length !== 0 && firstTime){
  //   firstTime = false;
  //   forecastParams.latitude = userData.latitude;
  //   forecastParams.longitude = userData.longitude;
  //   getForecastData();
  // }

  // const handleCoSubmit = (event) => {
  //   // const formData = new FormData(event.currentTarget);
  //   let formObject = Object.fromEntries(new FormData(event.currentTarget).entries());
  //   event.preventDefault();
    
  //   // console.log(formObject);
  //   forecastParams.latitude = formObject.latitude;
  //   forecastParams.longitude = formObject.longitude;
  //   // getForecastData();
  //   patchUserData();
  // };


  {/* <div>
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
        </div>
      </div> */}