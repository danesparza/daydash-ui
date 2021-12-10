import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//  API imports
import SystemAPI from './api/system.api';
import ConfigAPI from './api/config.api';
import PollenAPI from './api/pollen.api';
import NewsAPI from './api/news.api';
import WeatherAPI from './api/weather.api';
import CalendarAPI from './api/calendar.api';
import QuakeAPI from './api/quake.api';
import NWSAlertsAPI from './api/nwsalerts.api';

//  Kick off API initialization
SystemAPI.getSystemEndpoints();
SystemAPI.getVersionInfo();
ConfigAPI.getConfig();
PollenAPI.getPollen();
NewsAPI.getNews();
QuakeAPI.getQuakes();
WeatherAPI.getWeather();
NWSAlertsAPI.getWeatherAlerts();
CalendarAPI.getCalendarEvents();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.body
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

