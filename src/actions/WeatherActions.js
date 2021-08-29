import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class WeatherActions {
    
    recieveWeatherData(weatherData, lat, long) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECIEVE_RAW_WEATHER,
            data: weatherData.data,
            lat: lat,
            long: long
        });
    }
}

export default new WeatherActions();