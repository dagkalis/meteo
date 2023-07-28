import React from 'react'
import { useEffect, useState } from "react";
// import axios from "axios";

// import * as requests from './customHooks';

function WeatherView(props) {

    return(
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
            {props.weatherData.map((forecast) => {
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
    )

}

export default WeatherView;