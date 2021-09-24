import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class PollenStore extends Store {

    constructor(){
      super(AppDispatcher);
  
      //  Set initial expected state
      this.pollendata = {};
      this.pollendata.data = [];
      this.pollendata.predominant_pollen = "...";
      this.loaded = false;
      this.error = false;
    }

    HasLoaded() {
      return this.loaded;
    }

    HasError() {
      return this.error;
    }

    GetPollen() {
      return this.pollendata;
    }

    __onDispatch(action) {
    
        switch(action.actionType) {          
    
          case DashboardConstants.RECEIVE_RAW_POLLEN:
            console.log('Updating pollen store: ', action);
            this.pollendata = action.data;
            this.loaded = true;
            this.__emitChange();
            break;
    
          default:
            // no op
        }
      }

}

export default new PollenStore();