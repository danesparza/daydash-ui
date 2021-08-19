import '../../App.css';
import QRCode from 'qrcode.react';

function WeatherBox(props) {

    //  Render the current time
    return (
        <div>

            {/* If we have a message, display it here, otherwise this is hidden */}            
            <article className="message is-warning">
                <div className="message-body weatherAlertMessageBody">
                    <QRCode
                        value={"https://www.weather.gov/"}
                        size={40}
                        bgColor={'transparent'}
                        fgColor={"#946c00"}
                        level={"L"}
                        includeMargin={false}
                        renderAs={"svg"}
                        className="weatherAlertQR"
                        />

                    <strong>Flash Flood Watch</strong>
                </div>
            </article>      

            {/* Regular weather box starts here with the current conditions display */}
            <div className="currentConditions">
                Mostly Cloudy
            </div>            

            {/* Radar image, if storm is approaching */}
            {/*<div className="columns"><div className="column">Storm approaching</div><div className="column"><img alt="" src="https://s.w-x.co/staticmaps/wu/wxtype/county_loc/csg/animate.png"/></div></div> */}           

            {/* Current and hourly conditions */}
            <div className="columns has-text-centered">                
                <div className="column">
                    <p className="weatherHourlyCurrentTime">12pm</p>
                    <p><img alt="" src="/wi/partly-cloudy-day.svg"/></p>
                    <p className="weatherHourlyCurrentTemp">81&deg;</p>
                </div>
                <div className="column">
                    <p className="weatherHourlyTime">3pm</p>
                    <p><img alt="" src="/wi/cloudy.svg"/></p>
                    <p className="weatherHourlyTemp">81&deg;</p>
                    <p class="weatherHourlyPOP"><img alt="" src="/wi/raindrop.svg"/> 20%</p>
                </div>
                <div className="column">
                    <p className="weatherHourlyTime">6pm</p>
                    <p><img alt="" src="/wi/rain.svg"/></p>
                    <p className="weatherHourlyTemp">81&deg;</p>
                    <p class="weatherHourlyPOP"><img alt="" src="/wi/raindrop.svg"/> 40%</p>
                </div>
                <div className="column">
                    <p className="weatherHourlyTime">9pm</p>
                    <p><img alt="" src="/wi/rain.svg"/></p>
                    <p className="weatherHourlyTemp">81&deg;</p>
                    <p class="weatherHourlyPOP"><img alt="" src="/wi/raindrop.svg"/> 30%</p>
                </div>
                <div className="column">
                    <p className="weatherHourlyTime">12am</p>
                    <p><img alt="" src="/wi/rain.svg"/></p>
                    <p className="weatherHourlyTemp">81&deg;</p>
                    <p class="weatherHourlyPOP"><img alt="" src="/wi/raindrop.svg"/> 20%</p>
                </div>
                <div className="column">
                    <p className="weatherHourlyTime">3am</p>
                    <p><img alt="" src="/wi/rain.svg"/></p>
                    <p className="weatherHourlyTemp">81&deg;</p>
                    <p class="weatherHourlyPOP"><img alt="" src="/wi/raindrop.svg"/> 20%</p>
                </div>               
                <div className="column">
                    <p className="weatherHourlyTime">6am</p>
                    <p><img alt="" src="/wi/rain.svg"/></p>
                    <p className="weatherHourlyTemp">81&deg;</p>
                    <p class="weatherHourlyPOP"><img alt="" src="/wi/raindrop.svg"/> 20%</p>
                </div>                
            </div> 

            {/* Current pollen and extra conditions information */}
            <div className="predomPollen">
                Pollen: <strong>Grasses, Plantains, Lingonberries</strong>
            </div>
            <div className="currentConditionsExtra">
                Humidity: <strong>72%</strong>  Wind: <strong>7mph SE</strong>
            </div>

            {/* Current and daily conditions */}
            <div className="columns weatherWeek">                
                <div className="column">
                    <p>Tue</p>
                    <p>icon</p>
                    <p><strong>77&deg;</strong></p>
                    <p>70&deg;</p>
                </div>
                <div className="column weatherWeekday">
                    <p>Wed</p>
                    <p>icon</p>
                    <p><strong>77&deg;</strong></p>
                    <p>70&deg;</p>
                </div>
                <div className="column weatherWeekday">
                    <p>Thu</p>
                    <p>icon</p>
                    <p><strong>77&deg;</strong></p>
                    <p>70&deg;</p>
                </div>
                <div className="column weatherWeekday">
                    <p>Fri</p>
                    <p>icon</p>
                    <p><strong>77&deg;</strong></p>
                    <p>70&deg;</p>
                </div>
                <div className="column weatherWeekday">
                    <p>Sat</p>
                    <p>icon</p>
                    <p><strong>77&deg;</strong></p>
                    <p>70&deg;</p>
                </div>
                <div className="column weatherWeekday">
                    <p>Sun</p>
                    <p>icon</p>
                    <p><strong>77&deg;</strong></p>
                    <p>70&deg;</p>
                </div>               
                <div className="column weatherWeekday">
                    <p>Mon</p>
                    <p>icon</p>
                    <p><strong>77&deg;</strong></p>
                    <p>70&deg;</p>
                </div>                
            </div>    
        </div>        
    );
}

export default WeatherBox;