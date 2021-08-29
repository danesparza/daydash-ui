import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class PollenStore extends Store {

    constructor(){
      super(AppDispatcher);
  
      this.pollendata = {};
    }

    GetPollen() {
      return this.pollendata;
    }

    __onDispatch(action) {
    
        switch(action.actionType) {          
    
          case DashboardConstants.RECIEVE_RAW_POLLEN:
            console.log('Updating pollen store: ', action);
            this.pollendata = action.data;
            this.__emitChange();
            break;
    
          default:
            // no op
        }
      }

}

export default new PollenStore();