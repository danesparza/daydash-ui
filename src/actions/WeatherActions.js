import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class WeatherActions {
    
    recieveWeatherData(weatherData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECEIVE_RAW_WEATHER,
            data: weatherData.data
        });
    }
}

export default new WeatherActions();