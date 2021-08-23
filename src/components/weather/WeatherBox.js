import QRCode from 'qrcode.react'; // Used in the weather notification.  We can move that to its own component

function WeatherBox(props) {

    //  Render the current time
    return (
        <div>                
            
            <div className="columns">

                {/* Regular weather box starts here with the current conditions display */}
                <div className="column has-text-centered">
                    <img className="currentConditions" src="/wi/partly-cloudy-day.svg" alt=""/> <span className="currentTemp">86&deg;</span>
                </div>

                {/* Radar image, if storm is approaching */}
                {/* <div className="column"><img className="radarImage" alt="" src="https://s.w-x.co/staticmaps/wu/wxtype/county_loc/csg/animate.png"/></div>*/}
            </div>
            
            <div className="columns">

                {/* Current pollen and extra conditions information */}
                <div className="column">                    
                    <div className="currentConditionsExtra">
                        Humidity: <strong>72%</strong>  Wind: <strong>7mph SE</strong>
                    </div>
                    <div className="predomPollen">
                        Pollen: <strong>Grasses, Plantains, Lingonberries</strong>
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
                <div className="column weatherWeekCurrentDate">
                    <p className="weatherWeekDate">Tue</p>
                    <p><img alt="" src="/wi/partly-cloudy-day.svg"/></p>
                    <p className="weatherWeekTemp"><strong>77&deg;</strong></p>
                    <p className="weatherWeekTemp">70&deg;</p>
                    <div className="weatherWeekPollen pollen-low">Pollen: 3.4</div>
                </div>
                <div className="column weatherWeekday">
                    <p className="weatherWeekDate">Wed</p>
                    <p><img alt="" src="/wi/rain.svg"/></p>
                    <p className="weatherWeekTemp"><strong>77&deg;</strong></p>
                    <p className="weatherWeekTemp">70&deg;</p>
                    <div className="weatherWeekPollen pollen-warn">Pollen: 5.4</div>
                </div>
                <div className="column weatherWeekday">
                    <p className="weatherWeekDate">Thu</p>
                    <p><img alt="" src="/wi/rain.svg"/></p>
                    <p className="weatherWeekTemp"><strong>77&deg;</strong></p>
                    <p className="weatherWeekTemp">70&deg;</p>
                    <div className="weatherWeekPollen pollen-warn">Pollen 6.8</div>
                </div>
                <div className="column weatherWeekday">
                    <p className="weatherWeekDate">Fri</p>
                    <p><img alt="" src="/wi/rain.svg"/></p>
                    <p className="weatherWeekTemp"><strong>77&deg;</strong></p>
                    <p className="weatherWeekTemp">70&deg;</p>
                    <div className="weatherWeekPollen pollen-danger">Pollen: 10.2</div>
                </div>
                <div className="column weatherWeekday">
                    <p className="weatherWeekDate">Sat</p>
                    <p><img alt="" src="/wi/partly-cloudy-day.svg"/></p>
                    <p className="weatherWeekTemp"><strong>77&deg;</strong></p>
                    <p className="weatherWeekTemp">70&deg;</p>
                    <div className="weatherWeekPollen"></div>
                </div>
                <div className="column weatherWeekday">
                    <p className="weatherWeekDate">Sun</p>
                    <p><img alt="" src="/wi/cloudy.svg"/></p>
                    <p className="weatherWeekTemp"><strong>77&deg;</strong></p>
                    <p className="weatherWeekTemp">70&deg;</p>
                    <div className="weatherWeekPollen"></div>
                </div>               
                <div className="column weatherWeekday">
                    <p className="weatherWeekDate">Mon</p>
                    <p><img alt="" src="/wi/clear-day.svg"/></p>
                    <p className="weatherWeekTemp"><strong>77&deg;</strong></p>
                    <p className="weatherWeekTemp">70&deg;</p>
                    <div className="weatherWeekPollen"></div>
                </div>                
            </div> 
        </div>        
    );
}

export default WeatherBox;