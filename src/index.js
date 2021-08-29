import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//  API imports
import PollenAPI from './api/pollen.api';
import NewsAPI from './api/news.api';

//  Kick off API initialization
PollenAPI.getPollen("30019"); //  We could just let the API get this based on the stored zipcode
NewsAPI.getNews();

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
