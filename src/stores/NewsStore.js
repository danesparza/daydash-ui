import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class NewsStore extends Store {

    constructor(){
      super(AppDispatcher);
  
      this.newsdata = {};
      this.newsdata.items = [];
    }

    GetNews() {
      return this.newsdata;
    }

    __onDispatch(action) {
    
        switch(action.actionType) {          
    
          case DashboardConstants.RECIEVE_RAW_NEWS_EVENTS:
            console.log('Updating news store: ', action);
            this.newsdata = action.data;
            this.__emitChange();
            break;
    
          default:
            // no op
        }
      }

}

export default new NewsStore();