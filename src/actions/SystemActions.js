import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class SystemActions {
    
    recieveEndpointData(endpointData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECEIVE_SYSTEM_ENDPOINT,
            data: endpointData.data
        });
    }
}

export default new SystemActions();