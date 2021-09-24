import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class CalendarActions {
    
    recieveCalendarData(calData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECEIVE_RAW_CALENDAR_EVENTS,
            data: calData.data
        });
    }
}

export default new CalendarActions();