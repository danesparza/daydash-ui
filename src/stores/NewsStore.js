import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class NewsStore extends Store {

    constructor(){
      super(AppDispatcher);
  
      this.newsdata = {};
      this.newsdata.items = [];
      this.loaded = false;
      this.error = false;
    }

    HasLoaded() {
      return this.loaded;
    }

    HasError() {
      return this.error;
    }

    GetNews() {
      return this.newsdata;
    }

    __onDispatch(action) {
    
        switch(action.actionType) {          
    
          case DashboardConstants.RECEIVE_RAW_NEWS_EVENTS:
            console.log('Updating news store: ', action);
            
            //  Only update the data array if we have more than 1 item
            if(action.data.items.length > 1){
              this.newsdata = action.data;
            }

            //  Either way, indicate that we got something back.
            //  This means that:  If it's the initial load and we're getting
            //  only a single item back (for whatever reason) news won't show initially
            this.loaded = true;
            this.__emitChange();
            break;
    
          default:
            // no op
        }
      }

}

export default new NewsStore();