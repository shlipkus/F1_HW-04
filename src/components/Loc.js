import React, { useState } from "react";
import axios from "axios";
import "../styles/loc.css";
import { API_KEY } from "../keys.js";
import Weather from "./weather.js";
import "../styles/today.css";

function Loc(props) {

    let [geoData, setGeoData] = useState([]);
    if(props.name==undefined){
        let geo = navigator.geolocation;
        geo.getCurrentPosition(success); 
    }else{
            if(!geoData.length){                
                axios.get(`https://ru.api.openweathermap.org/geo/1.0/direct?q=${props.name}&limit=1&appid=${API_KEY}`).then(res => {
                setGeoData(res.data);
                
            });                
        }            
    }   

    
    function success(pos) {
        let crd = pos.coords;
        
        if(!geoData.length) {            
            axios.get(`https://ru.api.openweathermap.org/geo/1.0/reverse?lat=${crd.latitude}&lon=${crd.longitude}&limit=1&appid=${API_KEY}&lang=ru`).then(res => {
                setGeoData(res.data);                
            });            
        }    
    
      };

    return (
        <div className="loc-div">
            <span>
                {geoData.length ? ((geoData[0].local_names!=undefined) ? geoData[0].local_names.ru: geoData[0].name): "Местоположение не определено."}:
            </span>
            <div>
                <Weather geoData={geoData}/>
            </div>
        </div>
    )
}

export default Loc;