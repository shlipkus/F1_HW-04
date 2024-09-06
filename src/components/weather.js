import React, { useState } from "react";
import axios from "axios";
import { API_KEY } from "../keys.js";
import TodayWeather from "./Todayweather.js";
import Fivedays from "./Fivedays.js";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Weather (props) {
    let [weatherData, setWeatherData] = useState({});
    let geoData = props.geoData;
    if(geoData.length){
        let lat = geoData[0].lat;
        let lon = geoData[0].lon;
        if(Object.keys(weatherData).length === 0){
                        axios.get(`https://ru.api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=ru`).then(res => {
                setWeatherData(res.data);                
            });
            
        }
    }   
     
    
    return (
        <Tabs defaultActiveKey="today"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
            <Tab eventKey="today" title="Погода на сегодня">
                <TodayWeather geoData={geoData}/>
            </Tab>
            <Tab eventKey="fivedays" title="Погода на 5 дней.">
                <Fivedays geoData={geoData}/>
            </Tab>
        </Tabs>
    )
}

export default Weather;