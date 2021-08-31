
function WeatherRadar(props) {

    //  Get the radar location:
    const radarLocation = "csg";

    //  Format the url
    const imageHash = Date.now();
    const radarUrl = `https://s.w-x.co/staticmaps/wu/wxtype/county_loc/${radarLocation}/animate.png?${imageHash}`
    
    //  If we have a chance of rain > 10% in the next two hours, show the radar image.  Otherwise, show nothing
    let radarImage = "";
    let showRadar = false;

    if(props.hourlyweather.length > 0 && /* We have items in the array AND */ 
        ((props.hourlyweather[0] !== undefined && props.hourlyweather[0].precipProbability > .20 && props.hourlyweather[0].precipAccumulation > 0) /* The first hour has precipitation */ 
        || /* or ... */
        (props.hourlyweather[1] !== undefined && props.hourlyweather[1].precipProbability > .20 && props.hourlyweather[1].precipAccumulation > 0))){ /* The second hour has precipitation */
        showRadar = true; // Show the radar image
    }

    if(showRadar){
        radarImage = (<div className="column"><img className="radarImage" alt="" src={radarUrl}/></div>);
    }
    
    return radarImage;
}

export default WeatherRadar;