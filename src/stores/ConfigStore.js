import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class ConfigStore extends Store {

    constructor(){
      super(AppDispatcher);
  
      //  Set initial expected state
      this.configdata = [];
    }

    GetAllConfigs() {
      return this.configdata;
    }

    HasConfigData() {
      return this.configdata.length > 0;
    }

    GetZipcode() {
      let retval = "";

      try {
        const foundItem = this.configdata.find(item => item.name === "zipcode");
        retval = foundItem.value;
      } catch {}

      return retval;
    }

    GetLatitude() {
      let retval = "";

      try {
        const foundItem = this.configdata.find(item => item.name === "location");
        retval = foundItem.value.split(",")[0];
      } catch {}

      return retval;
    }

    GetLongitude() {
      let retval = "";

      try {
        const foundItem = this.configdata.find(item => item.name === "location");
        retval = foundItem.value.split(",")[1];
      } catch {}

      return retval;
    }

    GetRadarLocation() {
      // Default to all of usa
      let retval = "usa"; 

      try {
        const foundItem = this.configdata.find(item => item.name === "radarLocation");
        retval = foundItem.value;
      } catch {}

      return retval;
    }

    __onDispatch(action) {
    
        switch(action.actionType) {          
    
          case DashboardConstants.RECEIVE_SYSTEM_CONFIG:
            console.log('Updating config store: ', action);
            this.configdata = action.data;
            this.__emitChange();
            break;
    
          default:
            // no op
        }
      }

}

export default new ConfigStore();