import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class PollenActions {
    
    recievePollenData(pollenData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECEIVE_RAW_POLLEN,
            data: pollenData.data
        });
    }
}

export default new PollenActions();