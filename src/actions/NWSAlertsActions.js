import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class NWSAlertsActions {
    
    recieveAlertsData(alertsData, lat, long) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECEIVE_RAW_WEATHERALERTS,
            data: alertsData.data,
            lat: lat,
            long: long
        });
    }
}

export default new NWSAlertsActions();