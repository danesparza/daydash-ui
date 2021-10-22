import WeatherIcon from './WeatherIcon';
import WeatherDay from './WeatherDay';
import WeatherRadar from './WeatherRadar';
import WeatherTemp from './WeatherTemp';
import WeatherWind from './WeatherWind';
import WeatherAlert from './WeatherAlert';

function WeatherBox(props) {

    //  Format the current temp
    let currentTemp = Math.round(props.weather.currently.temperature);
    let currentApparentTemp = Math.round(props.weather.currently.apparentTemperature);
    let currentWindSpeed = Math.round(props.weather.currently.windSpeed);

    //  Get the collection of WeatherDay elements from the prop.news array
    const currentWeatherDayItem = props.weather.daily.data.slice(0,1).map((item, index) =>  <WeatherDay today="true" pollen={props.pollen} index={index} weatherday={item} latitude={props.weather.latitude} longitude={props.weather.longitude} key={item.time}/>);
    const weatherDayItems = props.weather.daily.data.slice(1,6).map((item, index) =>  <WeatherDay pollen={props.pollen} index={index+1} weatherday={item} latitude={props.weather.latitude} longitude={props.weather.longitude} key={item.time}/>);

    //  Render the weather info
    return (
        <div>                
            
            <div className="columns">

                {/* Regular weather box starts here with the current conditions display */}
                <div className="column has-text-centered">
                    <WeatherIcon current="true" icon={props.weather.currently.icon} latitude={props.weather.latitude} longitude={props.weather.longitude} /> <span className="currentTemp"><WeatherTemp temperature={currentTemp} /></span>                               

                    {/* Display next hour precipitation */}
                    {/* 
                    <div style="text-align: left;">    
                        <span>Next hour:</span>
                        <img src="/wi/rainpixel.png" alt="" style="height: 17px;max-width: 5px;"/>
                        <img src="/wi/rainpixel.png" alt="" style="height: 10px;max-width: 5px;"/>
                        <img src="/wi/rainpixel.png" alt="" style="height: 8px;max-width: 5px;"/>
                    </div>
                    */}
                </div>

                {/* Radar image, if storm is approaching */}
                <WeatherRadar hourlyweather={props.weather.hourly} currently={props.weather.currently} config={props.config} alerts={props.alerts} />
            </div>
            
            <div className="columns">

                {/* Current pollen and extra conditions information */}
                <div className="column">
                    <div className="currentConditionsExtra">
                        Feels like <strong><WeatherTemp temperature={currentApparentTemp} /></strong>
                    </div>                    
                    <div className="currentConditionsExtra">                    
                        Humidity: <strong>{props.weather.currently.humidity}%</strong> / Wind: <strong><WeatherWind speed={currentWindSpeed} direction={props.weather.currently.windBearing} /></strong> 
                    </div>                    
                    <div className="predomPollen">
                        Pollen: <strong>{props.pollen.predominant_pollen}</strong>
                    </div>
                </div>
                
                {/* If we have a weather alert, display it here.  Otherwise this is hidden */}
                <WeatherAlert alerts={props.alerts} />
            </div>            

            {/* Current and daily conditions */}
            <div className="columns weatherWeek has-text-centered">                                
                {currentWeatherDayItem}                
                {weatherDayItems}
            </div> 
        </div>        
    );
}

export default WeatherBox;