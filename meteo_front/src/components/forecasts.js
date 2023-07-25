import React from 'react'

function ForecastsView(props) {
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
        {props.forecasts.map((forecast) => {
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