import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class SystemStore extends Store {

    constructor(){
      super(AppDispatcher);
  
      //  Set initial expected state
      this.endpoints = {};
      this.endpoints.service = "";
      this.endpoints.ui = "";
      this.loaded = false;
      this.error = false;
      this.wifiaps = [];
    }

    HasLoaded() {
      return this.loaded;
    }

    HasError() {
      return this.error;
    }

    GetEndpoints() {
      return this.endpoints;
    }

    GetWifiAPs() {
      return this.wifiaps;
    }

    GetHighestQualityAP() {
      let retval = "";

      //  Find the ap with the highest signal quality
      const qualitySortedAps = this.wifiaps.sort(function (a, b) {
        return a.signal_quality - b.signal_quality;
      });

      //  If there is at least one ap, return the first ESSID:
      if(qualitySortedAps.length > 0){
        retval = qualitySortedAps[0].essid;
      }       

      return retval;
    }

    __onDispatch(action) {
    
        switch(action.actionType) {          
    
          case DashboardConstants.RECEIVE_SYSTEM_ENDPOINT:
            console.log('Updating system store: ', action);
            this.endpoints = action.data;
            this.loaded = true;
            this.__emitChange();
            break;

          case DashboardConstants.RECEIVE_SYSTEM_WIFIAPS:
              console.log('Updating system store: ', action);
              this.wifiaps = action.data;              
              this.__emitChange();
              break;
    
          default:
            // no op
        }
      }

}

export default new SystemStore();