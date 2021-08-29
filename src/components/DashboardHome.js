import React, { Component } from 'react';

//  Styles
import '../App.css';

//  Components
import Clock from './calendar/clock';
import DateDisplay from './calendar/datedisplay';
import WeatherBox from './weather/WeatherBox';
import NewsBox from './news/NewsBox';

//  Stores
import PollenStore from '../stores/PollenStore';
import NewsStore from '../stores/NewsStore';
import WeatherStore from '../stores/WeatherStore';

//  API imports
import PollenAPI from '../api/pollen.api';
import NewsAPI from '../api/news.api';
import WeatherAPI from '../api/weather.api';

class DashboardHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
        pollen: PollenStore.GetPollen(),
        news: NewsStore.GetNews(),
        weather: WeatherStore.GetWeather()        
    };
  }

  _onChange = () => {
    this.setState({
        pollen: PollenStore.GetPollen(),
        news: NewsStore.GetNews(),
        weather: WeatherStore.GetWeather()
    });
  }

  componentDidMount() {    
    //  Add an interval tick for every 1 minutes:
    this.interval = setInterval(this.tick, 60000);

    //  Add store listeners
    this.pollenListener = PollenStore.addListener(this._onChange);
    this.newsListener = NewsStore.addListener(this._onChange);
    this.weatherListener = WeatherStore.addListener(this._onChange);    
  }

  componentWillUnmount() {
    //  Clear the interval:
    clearInterval(this.interval);

    //  Remove listeners
    this.pollenListener.remove();
    this.newsListener.remove();    
    this.weatherListener.remove();
  }

  tick = () => {
    //  Replace these with either calls that let the local API figure 
    //  out what the config is, or gather the config before making 
    //  these calls here
    PollenAPI.getPollen("30019"); //  We could just let the API get this based on the stored zipcode
    NewsAPI.getNews();
    WeatherAPI.getWeather("34.016410", "-83.906870"); //  We could just let the API get this based on the stored coordinates
  }

  render() {

    return (
      <React.Fragment>
        <div className="dashboard">        
        
          <div className="container is-fluid">
    
            {/* Weather and calendar blocks  */}
            <div className="columns">
              
              {/* The weather section  */}
              <div className="column">              
                  <WeatherBox weather={this.state.weather} pollen={this.state.pollen} />
              </div>
    
              {/* The time and calendar section  */}
              <div className="column has-text-centered">
                <div className="currentTimeDisplay">
                  <Clock/>
                </div>
                <div className="currentDateDisplay">
                  <DateDisplay/>
                </div>
                <div className="calendarContainer has-text-left">
                  <table className="table calendarTable is-fullwidth">
                    <thead>
                      <tr>
                        <th>Time</th><th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>8:30am-9:30am</td>
                        <td>Mom & Dad coffee meeting</td>
                      </tr>
                      <tr>
                        <td>11:30am-2:30pm</td>
                        <td>2-to-1 meeting</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
              </div>                      
            </div>            
          </div>
          
        </div>
        <footer className="dashboardFooter">
          {/* News at the bottom  */}
          <div className="columns">
              <NewsBox news={this.state.news}/>
          </div>
        </footer>
      </React.Fragment>
      
    );    
  }   
  
}

export default DashboardHome;
