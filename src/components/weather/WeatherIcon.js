import {Fragment} from 'react';

function WeatherIcon(props) {
    
    //  Set the defaults
    let imgUrl = "/wi/partly-cloudy-day.svg";
    let imgAlt = "weather icon";
    let iconClass = "";

    //  If this is the current conditions icon, apply a special class
    if(props.current === "true"){
        iconClass = "currentConditions";
    }

    //  Based on the icon passed in, determine what should be shown:
    switch(props.icon) 
    {
        case "01d":
            imgUrl = "/wi/clear-day.svg";
            imgAlt = "Clear sky";
            break;
        case "02d":
            imgUrl = "/wi/partly-cloudy-day.svg";
            imgAlt = "Partly cloudy";
            break;
        case "03d":
        case "04d":
            imgUrl = "/wi/cloudy.svg";
            imgAlt = "Cloudy";
            break;
        case "09d":
        case "10d":
            imgUrl = "/wi/rain.svg";
            imgAlt = "Rain";
            break;
        case "11d":
            imgUrl = "/wi/thunderstorm.svg";
            imgAlt = "Thunderstorm";
            break;
        case "13d":
            imgUrl = "/wi/snow.svg";
            imgAlt = "Snow";
            break;
        case "50d":
            imgUrl = "/wi/fog.svg";
            imgAlt = "Fog";
            break;
        default: 
    }
    
    return (
        <Fragment>
            <img className={iconClass} src={imgUrl} alt={imgAlt}/>      
        </Fragment>
    );
}

export default WeatherIcon;
