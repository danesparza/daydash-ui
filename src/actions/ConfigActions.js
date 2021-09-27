import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class ConfigActions {
    
    recieveConfigData(configData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECEIVE_SYSTEM_CONFIG,
            data: configData.data
        });
    }

    recieveConfigError(configError) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECEIVE_SYSTEM_CONFIG_ERROR,
            error: configError
        });
    }
}

export default new ConfigActions();