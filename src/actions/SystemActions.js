import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class SystemActions {
    
    recieveEndpointData(endpointData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECEIVE_SYSTEM_ENDPOINT,
            data: endpointData.data
        });
    }

    recieveWIFIData(wifiData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECEIVE_SYSTEM_WIFIAPS,
            data: wifiData.data
        });
    }
}

export default new SystemActions();