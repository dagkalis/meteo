import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";


function getAPIData(url) {
  return axios.get(url).then((response) => response.data);
}


const API_URL = "http://localhost:3000/api/v1/forecasts";

function ForecastsView(props) {
  const [forecasts, setforecasts] = useState([]);

  useEffect(() => {
  let mounted = true;
  getAPIData(API_URL).then((items) => {
    if (mounted) {
      setforecasts(items);
    }
  });
  return () => (mounted = false);
  }, []);

  return (
    <div>
      <table>
          <thead>
              <th>time</th>
              <th>date</th>
              <th>hour</th>
              <th>temperature</th>
              <th>rain</th>
              <th>showers</th>
              <th>cloudcover</th>
          </thead>
          <tbody>
      {forecasts.map((forecast) => {
        return (
          <tr>
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