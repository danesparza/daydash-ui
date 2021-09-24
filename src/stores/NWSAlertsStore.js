import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class NWSAlertsStore extends Store {

    constructor(){
      super(AppDispatcher);
  
      //  Set initial expected state
      this.alertsdata = {};
      this.alertsdata.alerts = [];
      this.loaded = false;
      this.error = false;
    }

    HasLoaded() {
      return this.loaded;
    }

    HasError() {
      return this.error;
    }

    GetAlerts() {
      return this.alertsdata;
    }

    __onDispatch(action) {
    
        switch(action.actionType) {          
    
          case DashboardConstants.RECEIVE_RAW_WEATHERALERTS:
            console.log('Updating NWS alerts store: ', action);
            this.alertsdata = action.data;
            this.loaded = true;
            this.__emitChange();
            break;
    
          default:
            // no op
        }
      }

}

export default new NWSAlertsStore();