import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";


import { useGetAPI } from './customHooks';



// function getAPIData(url) {
//   return axios.get(url).then((response) => response.data);
// }



function ForecastsView(props) {
  const { data, loading, error } = useGetAPI('/api/v1/forecasts');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
          {data.map((forecast) => {
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