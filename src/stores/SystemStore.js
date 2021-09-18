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
    }

    GetEndpoints() {
      return this.endpoints;
    }

    __onDispatch(action) {
    
        switch(action.actionType) {          
    
          case DashboardConstants.RECEIVE_SYSTEM_ENDPOINT:
            console.log('Updating system store: ', action);
            this.endpoints = action.data;
            this.__emitChange();
            break;
    
          default:
            // no op
        }
      }

}

export default new SystemStore();