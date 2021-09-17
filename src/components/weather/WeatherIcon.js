function WeatherIcon(props) {
    
    //  Set the defaults
    let imgUrl = "/wi/partly-cloudy-day.svg";
    let imgAlt = "weather icon";
    let iconClass = "";
    let icon = props.icon;

    //  If this is the current conditions icon, apply a special class
    if(props.current === "true"){
        iconClass = "currentConditions";
    }

    //  Based on the icon passed in, determine what should be shown:
    switch(icon) 
    {
        case "01d":            
            imgUrl = "/wi/clear-day.svg";            
            imgAlt = "Clear sky";
            break;
        case "01n": 
            imgUrl = "/wi/clear-night.svg";
            imgAlt = "Clear sky";
            break;
        case "02d":
            imgUrl = "/wi/partly-cloudy-day.svg";
            imgAlt = "Partly cloudy";
            break;
        case "02n":
            imgUrl = "/wi/partly-cloudy-night.svg";
            imgAlt = "Partly cloudy";
            break;                
        case "03d":
        case "03n":
        case "04d":
        case "04n":            
            imgUrl = "/wi/cloudy.svg";
            imgAlt = "Cloudy";
            break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
            imgUrl = "/wi/rain.svg";
            imgAlt = "Rain";
            break;
        case "11d":
        case "11n":
            imgUrl = "/wi/thunderstorm.svg";
            imgAlt = "Thunderstorm";
            break;
        case "13d":
        case "13n":
            imgUrl = "/wi/snow.svg";
            imgAlt = "Snow";
            break;
        case "50d":
        case "50n":
            imgUrl = "/wi/fog.svg";
            imgAlt = "Fog";
            break;
        default: 
    }
    
    return (
        <img className={iconClass} src={imgUrl} alt={imgAlt}/>        
    );
}

export default WeatherIcon;
