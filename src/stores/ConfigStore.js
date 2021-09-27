import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class ConfigStore extends Store {

    constructor(){
      super(AppDispatcher);
  
      //  Set initial expected state
      this.configdata = {        
          zipcode: 0,
          useZipcodeForLocation: true,
          radarStation: "usa",
          location: "",
          calendarUrl: "",
          calendarTimezone: ""        
      };
      this.loaded = false;
      this.error = false;      
    }

    HasLoaded() {
      return this.loaded;
    }

    HasError() {
      return this.error;
    }

    GetConfig() {
      return this.configdata;
    }

    __onDispatch(action) {
    
        switch(action.actionType) {          
    
          case DashboardConstants.RECEIVE_SYSTEM_CONFIG:
            console.log('Updating config store: ', action);
            this.configdata = action.data;
            this.loaded = true;
            this.error = false;
            this.__emitChange();
            break;

          case DashboardConstants.RECEIVE_SYSTEM_CONFIG_ERROR:
            console.log('Updating config store: ', action);
            this.loaded = true;
            this.error = true;
            this.__emitChange();
            break;
    
          default:
            // no op
        }
      }

}

export default new ConfigStore();