import React, { useState } from "react";
import axios from "axios";
import { API_KEY } from "../keys.js";
import Table from "react-bootstrap/Table";
import Hour from "./Hour.js";
import "../styles/today.css";

function Fivedays(props) {
    let [weatherData, setWeatherData] = useState({});
    let geoData = props.geoData;
    let [dataValid, setDataValid] = useState(false);

    if(geoData.length){
        let lat = geoData[0].lat;
        let lon = geoData[0].lon;
        if(Object.keys(weatherData).length === 0){
                        axios.get(`https://ru.api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=ru`).then(res => {
                setWeatherData(res.data);
                setDataValid(true);               
            });
            
        }
    }

    return (
        <div className={'tab-div'}>
            {dataValid ? weatherData.list.map((hour, index) => <Hour key={index} date={hour.dt_txt} main={hour.main} weather={hour.weather} wind={hour.wind}/>):
            "Нет данных"}
        </div>
    )
}

export default Fivedays;