import React from "react";
import WeatherIcon from "./WeatherIcon";
import WeatherTemp from './WeatherTemp';
import WeatherPollen from './WeatherPollen';

function WeatherDay(props) {

    //  Format the day of the week name for this item    
    const weekDay = new Date(props.weatherday.time * 1000).toLocaleDateString("en-US", {weekday: 'short'});
    
    //  Get the high and low temps
    let highTemp = Math.round(props.weatherday.temperatureMax);
    let lowTemp = Math.round(props.weatherday.temperatureMin);

    //  If there is a chance of precipitation greater than 10%, 
    //  AND we'll get more than .05 of an inch, show both chance of rain and quantity
    let precipChanceRow = "";
    let pop = Math.round(props.weatherday.precipProbability * 100);
    let rainInInches = (props.weatherday.precipAccumulation / 25.4).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });  // Inches = mm / 25.4
    if( pop > 10 && rainInInches > .05) {
        precipChanceRow = <p className="precipChance"><img src="/wi/raindrop.svg" alt=""/> {pop}% / {rainInInches}in</p>
    }

    //  If we have a pollen item for the current day, use it
    let pollenRow = "";
    if(props.pollen.data.length > props.index) {
        let pollenCount = props.pollen.data[props.index];          
        pollenRow = <WeatherPollen count={pollenCount} />;
    }

    //  If this is the current day, use a special class -- otherwise use the defualt
    let itemClass = "weatherWeekday"; // The default class weekday class
    if(props.today === "true") { itemClass = "weatherWeekCurrentDate"; }  // Special sauce if this is the current day
    itemClass = "column " + itemClass; // Either way, this is also a column 

    return (
        <div className={itemClass}>
            <p className="weatherWeekDate">{weekDay}</p>
            <p><WeatherIcon latitude={props.latitude} longitude={props.longitude} icon={props.weatherday.icon} /></p>
            <p className="weatherWeekTemp"><strong><WeatherTemp temperature={highTemp} /></strong></p>
            <p className="weatherWeekTemp"><WeatherTemp temperature={lowTemp} /></p>            
            {pollenRow}   
            {precipChanceRow}
        </div>
    );
}

export default WeatherDay;