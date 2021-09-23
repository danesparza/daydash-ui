
function WeatherRadar(props) {

    //  Get the radar location:
    const radarStation = "csg";

    //  Format the url
    const imageHash0 = new Date().toLocaleDateString("en-US", {day: 'numeric'});
    const imageHash1 = new Date().toLocaleTimeString("en-US", {hour12 : false, hour:  "numeric" });
    const imageHash2 = new Date().toLocaleTimeString("en-US", {hour12 : false, minute: "numeric" });
    const imageHash = imageHash0 + "" + imageHash1 + "" + imageHash2.substring(0, imageHash2.length -1); // We're doing this to force no image caching -- time boxed to 10 minutes
    const radarUrl = `https://s.w-x.co/staticmaps/wu/wxtype/county_loc/${radarStation}/animate.png?${imageHash}`
    
    //  If we have a chance of rain > 10% in the next two hours, show the radar image.  Otherwise, show nothing
    let radarImage = "";
    let showRadar = false;

    if( (props.currently.precipAccumulation > 1) /* We currently have a bit of precipitation */
        || /* Or this whole next statement */
        (props.hourlyweather.length > 0 /* We have items in the array */ 
        && /* AND */ 
        ((props.hourlyweather[0] !== undefined && props.hourlyweather[0].precipProbability > .50 && props.hourlyweather[0].precipAccumulation > 2.5) /* The first hour has precipitation */ 
        || /* or ... */
        (props.hourlyweather[1] !== undefined && props.hourlyweather[1].precipProbability > .50 && props.hourlyweather[1].precipAccumulation > 2.5)))) /* The second hour has precipitation */
    {
        showRadar = true; // Show the radar image
    }

    if(showRadar){
        radarImage = (<div className="column"><img className="radarImage" alt="" src={radarUrl}/></div>);
    }
    
    return radarImage;
}

export default WeatherRadar;