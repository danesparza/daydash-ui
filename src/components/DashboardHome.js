import React, { Component } from 'react';

//  Styles
import '../App.css';

//  Components
import Clock from './calendar/clock';
import DateDisplay from './calendar/datedisplay';
import WeatherBox from './weather/WeatherBox';
import NewsBox from './news/NewsBox';
import CalendarBox from './calendar/CalendarBox';

//  Stores
import SystemStore from '../stores/SystemStore';
import ConfigStore from '../stores/ConfigStore';
import PollenStore from '../stores/PollenStore';
import NewsStore from '../stores/NewsStore';
import WeatherStore from '../stores/WeatherStore';
import CalendarStore from '../stores/CalendarStore';
import QuakeStore from '../stores/QuakeStore';
import NWSAlertsStore from '../stores/NWSAlertsStore';

//  API imports
import PollenAPI from '../api/pollen.api';
import NewsAPI from '../api/news.api';
import WeatherAPI from '../api/weather.api';
import CalendarAPI from '../api/calendar.api';
import QuakeAPI from '../api/quake.api';
import NWSAlertsAPI from '../api/nwsalerts.api';
import ConfigAPI from '../api/config.api';
import SystemAPI from '../api/system.api';


class DashboardHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
        pollen: PollenStore.GetPollen(),
        news: NewsStore.GetNews(),
        weather: WeatherStore.GetWeather(),
        calendar: CalendarStore.GetCalendarEvents(),
        quakes: QuakeStore.GetQuakes(),
        alerts: NWSAlertsStore.GetAlerts(),
        endpoints: SystemStore.GetEndpoints(),
        config: ConfigStore.GetConfig(),
        pollenLoaded: PollenStore.HasLoaded(),
        newsLoaded: NewsStore.HasLoaded(),
        weatherLoaded: WeatherStore.HasLoaded(),
        calendarLoaded: CalendarStore.HasLoaded(),
        quakesLoaded: QuakeStore.HasLoaded(),
        alertsLoaded: NWSAlertsStore.HasLoaded(),
        systemLoaded: SystemStore.HasLoaded(),
        configLoaded: ConfigStore.HasLoaded(),
        configError: ConfigStore.HasError()
    };

    this.socketSet = false;    
  }

  _onChange = () => {
    this.setState({
        pollen: PollenStore.GetPollen(),
        news: NewsStore.GetNews(),
        weather: WeatherStore.GetWeather(),
        calendar: CalendarStore.GetCalendarEvents(),
        quakes: QuakeStore.GetQuakes(),
        alerts: NWSAlertsStore.GetAlerts(),
        endpoints: SystemStore.GetEndpoints(),
        config: ConfigStore.GetConfig(),
        pollenLoaded: PollenStore.HasLoaded(),
        newsLoaded: NewsStore.HasLoaded(),
        weatherLoaded: WeatherStore.HasLoaded(),
        calendarLoaded: CalendarStore.HasLoaded(),
        quakesLoaded: QuakeStore.HasLoaded(),
        alertsLoaded: NWSAlertsStore.HasLoaded(),
        systemLoaded: SystemStore.HasLoaded(),
        configLoaded: ConfigStore.HasLoaded(),
        configError: ConfigStore.HasError()
    });

    //  If we've loaded and we have a config error, load the settings page:
    if(this.state.configLoaded && this.state.configError){
      window.location.href = "/settings";
    }

    //  Check to see if 
    //  - the system information is available 
    //  and 
    //  - the socket hasn't been set already
    if(this.socketSet === false && this.state.endpoints.service !== "") {
      
      //  Format the socket url:
      const socketUrl = `ws://${this.state.endpoints.service}/v1/ws`;

      // Create WebSocket connection (for config updates).      
      this.socket = new WebSocket(socketUrl);
      this.socketSet = true;

      //  Add our socket listener
      this.socket.addEventListener('message', this._onSocket);
      console.log("Added config websocket listener");
    }

  }

  _onSocket = (e) => {
    //  When we get something from the socket...
    //  emit it
    //  refresh data
    console.log(e);   
    this.tick();
  }

  componentDidMount() {    
    //  Add an interval tick for every 1 minutes:
    this.interval = setInterval(this.tick, 60000);

    //  Add store listeners
    this.pollenListener = PollenStore.addListener(this._onChange);
    this.newsListener = NewsStore.addListener(this._onChange);
    this.weatherListener = WeatherStore.addListener(this._onChange);    
    this.calendarListener = CalendarStore.addListener(this._onChange);
    this.quakeListener = QuakeStore.addListener(this._onChange);
    this.alertsListener = NWSAlertsStore.addListener(this._onChange);
    this.systemListener = SystemStore.addListener(this._onChange);
    this.configListener = ConfigStore.addListener(this._onChange);
  }  

  componentWillUnmount() {
    //  Clear the interval:
    clearInterval(this.interval);

    //  Remove listeners
    this.pollenListener.remove();
    this.newsListener.remove();    
    this.weatherListener.remove();
    this.calendarListener.remove();
    this.quakeListener.remove();
    this.alertsListener.remove();
    this.systemListener.remove();
    this.configListener.remove();
  }

  tick = () => {
    //  Replace these with either calls that let the local API figure 
    //  out what the config is, or gather the config before making 
    //  these calls here
    PollenAPI.getPollen();
    NewsAPI.getNews();
    QuakeAPI.getQuakes();
    WeatherAPI.getWeather(); 
    NWSAlertsAPI.getWeatherAlerts(); 
    CalendarAPI.getCalendarEvents();    
    ConfigAPI.getConfig();
    SystemAPI.getSystemEndpoints();  // This should never change, but there might be a problem on initialization
  }

  render() {

    //  If we're not done loading, show the loading indicator
    if(!(this.state.pollenLoaded 
      && this.state.newsLoaded 
      && this.state.weatherLoaded 
      && this.state.calendarLoaded 
      && this.state.quakesLoaded 
      && this.state.alertsLoaded 
      && this.state.systemLoaded 
      && this.state.configLoaded)){        
      return(
        <div className="loadContainer">
            <div className="loading">
              <i className="fab fa-cloudversify"/>Daydash   
              <p className="lc"><i className={`${this.state.weatherLoaded ? "far fa-check-square loadOK" : "fas fa-spinner fa-spin"}`}/> Scanning Weather</p>
              <p className="lc"><i className={`${this.state.alertsLoaded ? "far fa-check-square loadOK" : "fas fa-spinner fa-spin"}`}/> Getting Weather alerts</p>                       
              <p className="lc"><i className={`${this.state.newsLoaded ? "far fa-check-square loadOK" : "fas fa-spinner fa-spin"}`}/> Reading News</p>
              <p className="lc"><i className={`${this.state.quakesLoaded ? "far fa-check-square loadOK" : "fas fa-spinner fa-spin"}`}/> Fetching Quakes</p>
              <p className="lc"><i className={`${this.state.calendarLoaded ? "far fa-check-square loadOK" : "fas fa-spinner fa-spin"}`}/> Opening Calendar</p>
            </div>              
        </div>
      );
    }

    //  Otherwise, show the dashboard
    return (
      <React.Fragment>       
        <div className="dashboard is-hidden-mobile">        
        
          <div className="container is-fluid">
    
            {/* Weather and calendar blocks  */}
            <div className="columns">
              
              {/* The weather section  */}
              <div className="column">                                                       
                  <WeatherBox weather={this.state.weather} pollen={this.state.pollen} alerts={this.state.alerts} config={this.state.config}/>
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
                  <CalendarBox events={this.state.calendar} config={this.state.config}/>
                </div>
                
              </div>                      
            </div>            
          </div>
          
        </div>
        
        {/* News at the bottom  */}
        <footer className="dashboardFooter is-hidden-mobile">          
          <div className="columns">
              <NewsBox quakes={this.state.quakes} news={this.state.news}/>
          </div>
        </footer>
      </React.Fragment>
      
    );    
  }   
  
}

export default DashboardHome;
