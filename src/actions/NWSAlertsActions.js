import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class NWSAlertsActions {
    
    recieveAlertsData(alertsData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECEIVE_RAW_WEATHERALERTS,
            data: alertsData.data
        });
    }
}

export default new NWSAlertsActions();