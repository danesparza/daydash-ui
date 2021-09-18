import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class CalendarActions {
    
    recieveCalendarData(calData, calurl, caltimezone) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECEIVE_RAW_CALENDAR_EVENTS,
            data: calData.data,
            calurl: calurl,
            caltimezone: caltimezone
        });
    }
}

export default new CalendarActions();