import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from '../actions/DashboardConstants';

class CalendarStore extends Store {

    constructor(){
      super(AppDispatcher);
  
      //  Set initial expected state
      this.calendardata = {};
      this.calendardata.items = [];      
    }

    GetCalendarEvents() {
      return this.calendardata;
    }

    __onDispatch(action) {
    
        switch(action.actionType) {          
    
          case DashboardConstants.RECIEVE_RAW_CALENDAR_EVENTS:
            console.log('Updating calendar store: ', action);
            this.calendardata = action.data;
            this.__emitChange();
            break;
    
          default:
            // no op
        }
      }

}

export default new CalendarStore();