import React, { useState } from "react";
import "../styles/main.css";
import Loc from "./Loc";
import Button from "react-bootstrap/Button";
const cities = require("../cities.json");

function Main() {
    const [checked, changeCheck] = useState(false);
    const [onlist, changeOnList] = useState('');
    const [chois, changeChois] = useState(false)


    function setValue(e) {
        changeOnList(e.target.value);
    }

    function resetAll() {
        changeCheck(false);
        changeChois(false);
        changeOnList('');
    }

    return (
        <main>
            {chois || checked ? <Button className='geo-button' variant="primary" onClick={resetAll}>Сбросить</Button>: null}            
            {!chois && !checked ?
                <div className="inp-div">
                <p><span>Выберите город из списка </span></p>
                <input type="text" list="options" onInput={setValue}/>
                <datalist id="options">
                    {cities.city.map(cit => <option key={cit.city_id} value={cit.name} >{cit.name}</option>)}
                </datalist>
                <Button type="submit" className='main-button' variant="primary" onClick={() => changeChois(true)}>Выбрать</Button>
                </div>:
                null
            }
            {(chois) ? 
                <Loc name={onlist} chois={chois}/>: null
            }
            {!checked && !chois ?
                <div>
                <Button className='geo-button' variant="primary" onClick={() => changeCheck(true)}>Определить местоположение</Button>
                </div>:
                 (!chois) ? <Loc />: null
            }

        </main>
    )
}

export default Main;