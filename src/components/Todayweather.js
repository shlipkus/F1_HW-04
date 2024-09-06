import React, { useState } from "react";
import axios from "axios";
import { API_KEY } from "../keys.js";
import Table from "react-bootstrap/Table";
import { windDir } from "./Hour.js";
import "../styles/today.css";


function TodayWeather(props) {
    let [weatherData, setWeatherData] = useState({});
    let [date, setDate] = useState('');
    let geoData = props.geoData;
    let [dataValid, setDataValid] = useState(false);
    if(geoData.length){
        let lat = geoData[0].lat;
        let lon = geoData[0].lon;
        if(Object.keys(weatherData).length === 0){
                        axios.get(`https://ru.api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=ru`).then(res => {
                setWeatherData(res.data);
                setDataValid(true);               
            });
            
        }
    }
    if(dataValid && date == ''){
        let date = new Date(weatherData.dt*1000);
        let year = date.getFullYear();
        let month = (date.getMonth()+1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        setDate(`${day}.${month}.${year}`);
    }
    
    return (
        <div className={'tab-div'}>
            {dataValid ? <Table striped bordered hover>
                <thead><tr><th>{date}</th><th></th></tr></thead>
                <tbody>
                <tr><td>Облачность:</td><td>{weatherData.weather[0].description}.</td></tr>
                <tr><td>Температура:</td><td>{weatherData.main.temp_min} - {weatherData.main.temp_max} ℃.</td></tr>
                <tr><td>Влажность:</td><td>{weatherData.main.humidity} %.</td></tr>
                <tr><td>Атмосферное давление:</td><td>{Math.round(weatherData.main.pressure*(0.750064))} мм рт.ст.</td></tr>
                <tr><td>Ветер {windDir(weatherData.wind.deg)}:</td><td>{weatherData.wind.speed} м/с.</td></tr>
                </tbody>
            </Table>
            : "Данных нет"}
         
        </div>
    )
}

export default TodayWeather;