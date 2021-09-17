import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//  API imports
import PollenAPI from './api/pollen.api';
import NewsAPI from './api/news.api';
import WeatherAPI from './api/weather.api';
import CalendarAPI from './api/calendar.api';
import QuakeAPI from './api/quake.api';
import NWSAlertsAPI from './api/nwsalerts.api';

//  Kick off API initialization
PollenAPI.getPollen("30019"); //  We could just let the API get this based on the stored zipcode
NewsAPI.getNews();
QuakeAPI.getQuakes();
WeatherAPI.getWeather("34.016410", "-83.906870"); //  We could just let the API get this based on the stored coordinates
NWSAlertsAPI.getWeatherAlerts("34.016410", "-83.906870"); //  We could just let the API get this based on the stored coordinates
CalendarAPI.getCalendarEvents("https://calendar.google.com/calendar/ical/mg8l31ag8ua059trmktgdq6v80%40group.calendar.google.com/private-342fffdc823bfcaea433775659169545/basic.ics", "America/New_York");

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

// Create WebSocket connection (for config updates).
const socket = new WebSocket('ws://10.0.1.220:3010/v1/ws');
socket.onmessage = (msg) => {
  console.log(msg);
}
