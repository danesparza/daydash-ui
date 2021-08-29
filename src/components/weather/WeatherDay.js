import React from "react";
import WeatherIcon from "./WeatherIcon";

function WeatherDay(props) {

    //  Format the day of the week name for this item    
    const weekDay = new Date(props.weatherday.time * 1000).toLocaleDateString("en-US", {weekday: 'short'});
    
    //  Get the high and low temps
    let highTemp = Math.round(props.weatherday.temperatureMax);
    let lowTemp = Math.round(props.weatherday.temperature);

    //  If there is a chance of precipitation greater than 10%, show it
    let precipChanceRow = "";
    let pop = Math.round(props.weatherday.precipProbability * 100);
    if( pop > 10) {
        precipChanceRow = <p className="precipChance"><img src="/wi/raindrop.svg" alt=""/> {pop}%</p>
    }

    //  If we have a pollen item for the current day, use it
    let pollenRow = "";
    let pollenClass = "pollen-verylow";
    if(props.pollen.data.length > props.index) {
        let pollenData = props.pollen.data[props.index];
        if(pollenData > 2) {pollenClass = "pollen-low";}
        if(pollenData > 5) {pollenClass = "pollen-warn";}
        if(pollenData > 9) {pollenClass = "pollen-danger";}
        pollenClass = "weatherWeekPollen " + pollenClass;          
        pollenRow = <div className={pollenClass}>Pollen: {pollenData}</div>;
    }

    //  If this is the current day, use a special class -- otherwise use the defualt
    let itemClass = "weatherWeekday"; // The default class weekday class
    if(props.today === "true") { itemClass = "weatherWeekCurrentDate"; }  // Special sauce if this is the current day
    itemClass = "column " + itemClass; // Either way, this is also a column 

    return (
        <div className={itemClass}>
            <p className="weatherWeekDate">{weekDay}</p>
            <p><WeatherIcon current="true" icon={props.weatherday.icon} /></p>
            <p className="weatherWeekTemp"><strong>{highTemp}&deg;</strong></p>
            <p className="weatherWeekTemp">{lowTemp}&deg;</p>            
            {pollenRow}   
            {precipChanceRow}
        </div>
    );
}

export default WeatherDay;