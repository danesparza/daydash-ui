import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class QuakeStore extends Store {

    constructor(){
      super(AppDispatcher);
  
      this.quakedata = {};
      this.quakedata.features = [];
    }

    GetQuakes() {
      return this.quakedata;
    }

    __onDispatch(action) {
    
        switch(action.actionType) {          
    
          case DashboardConstants.RECIEVE_QUAKE_INFO:
            console.log('Updating quake store: ', action);
            this.quakedata = action.data;
            this.__emitChange();
            break;
    
          default:
            // no op
        }
      }

}

export default new QuakeStore();