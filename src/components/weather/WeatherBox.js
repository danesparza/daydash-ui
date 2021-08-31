import QRCode from 'qrcode.react'; // Used in the weather notification.  We can move that to its own component
import WeatherIcon from './WeatherIcon';
import WeatherDay from './WeatherDay';
import WeatherRadar from './WeatherRadar';
import WeatherTemp from './WeatherTemp';
import WeatherWind from './WeatherWind';

function WeatherBox(props) {

    //  Format the current temp
    let currentTemp = Math.round(props.weather.currently.temperature);
    let currentApparentTemp = Math.round(props.weather.currently.apparentTemperature);
    let currentWindSpeed = Math.round(props.weather.currently.windSpeed);

    //  For wind direction, we can use abbreviations from the compass rose: https://en.wikipedia.org/wiki/Points_of_the_compass

    //  Get the collection of WeatherDay elements from the prop.news array
    const currentWeatherDayItem = props.weather.daily.data.slice(0,1).map((item, index) =>  <WeatherDay today="true" pollen={props.pollen} index={index} weatherday={item} key={item.time}/>);
    const weatherDayItems = props.weather.daily.data.slice(1,6).map((item, index) =>  <WeatherDay pollen={props.pollen} index={index+1} weatherday={item} key={item.time}/>);

    //  Render the weather info
    return (
        <div>                
            
            <div className="columns">

                {/* Regular weather box starts here with the current conditions display */}
                <div className="column has-text-centered">
                    <WeatherIcon current="true" icon={props.weather.currently.icon} /> <span className="currentTemp"><WeatherTemp temperature={currentTemp} /></span>                  
                </div>

                {/* Radar image, if storm is approaching */}
                <WeatherRadar hourlyweather={props.weather.hourly} currently={props.weather.currently} />
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
                
                {/* If we have a message, display it here, otherwise this is hidden */}
                {/*
                <div className="column">                                                     
                    <div className="notification is-link">                
                        <QRCode
                            value={"https://www.weather.gov/"}
                            size={40}
                            bgColor={'transparent'}
                            fgColor={"#fff"}
                            level={"L"}
                            includeMargin={false}
                            renderAs={"svg"}
                            className="weatherAlertQR"
                            />

                        <strong>Flash Flood Watch</strong>                
                    </div>                      
                </div>
                */}
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