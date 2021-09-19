import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class ConfigActions {
    
    recieveConfigData(configData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECEIVE_SYSTEM_CONFIG,
            data: configData.data
        });
    }
}

export default new ConfigActions();