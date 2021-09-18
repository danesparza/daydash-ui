import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class WeatherStore extends Store {

    constructor(){
      super(AppDispatcher);
  
      //  Set initial expected state
      this.weatherdata = {};
      this.weatherdata.currently = {};
      this.weatherdata.currently.temperature = 0;
      this.weatherdata.currently.apparentTemperature = 0;
      this.weatherdata.currently.humidity = 0;
      this.weatherdata.currently.windSpeed = 0;
      this.weatherdata.currently.windBearing = 0;
      this.weatherdata.currently.icon = "";
      this.weatherdata.daily = {};
      this.weatherdata.daily.data = [];
      this.weatherdata.hourly = [];
    }

    GetWeather() {
      return this.weatherdata;
    }

    __onDispatch(action) {
    
        switch(action.actionType) {          
    
          case DashboardConstants.RECEIVE_RAW_WEATHER:
            console.log('Updating weather store: ', action);
            this.weatherdata = action.data;
            this.__emitChange();
            break;
    
          default:
            // no op
        }
      }

}

export default new WeatherStore();