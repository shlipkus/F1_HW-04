import React from "react";
import Table from "react-bootstrap/Table";

export function windDir(deg){
    let txt = '';
    if (deg >= 67 && deg < 114){
        txt = 'Восточный';
    }
    else if (deg >= 114 && deg < 159){
        txt = 'Юго-Восточный';
    }
    else if (deg >= 159 && deg < 203){
        txt = 'Южный';
    }
    else if (deg >= 203 && deg < 248){
        txt = 'Юго-Западный';
    }
    else if (deg >= 248 && deg < 293){
        txt = 'Западный';
    }
    else if (deg >= 293 && deg < 338){
        txt = 'Северо-Западный';
    }
    else if (deg >= 338 && deg <= 360){
        txt = 'Северный';
    }
    else if (deg >= 0 && deg < 23){
        txt = 'Северный';
    }
    else if (deg >= 23 && deg < 67){
        txt = 'Северо-Восточный';
    };
    return (txt)
};

function Hour(props) {

    let deg = props.wind.deg
    let dateList = props.date.split(' ');
    let date = dateList[0].split('-');
    date.reverse();
    let strDate = date.join('.');
    let strTime = dateList[1].slice(0,-3);

        
    
    return (
         <Table striped bordered hover>
                <thead><tr><th>{strDate}, {strTime}</th><th></th></tr></thead>
                <tbody>
                <tr><td>Облачность:</td><td>{props.weather[0].description}.</td></tr>
                <tr><td>Температура:</td><td>{props.main.temp_min} - {props.main.temp_max} ℃.</td></tr>
                <tr><td>Влажность:</td><td>{props.main.humidity} %.</td></tr>
                <tr><td>Атмосферное давление:</td><td>{Math.round(props.main.pressure*(0.750064))} мм рт.ст.</td></tr>
                <tr><td>Ветер {windDir(deg)}:</td><td>{props.wind.speed} м/с.</td></tr>
                </tbody>
        </Table>

    )
}

export default Hour;
