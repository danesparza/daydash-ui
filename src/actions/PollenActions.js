import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class PollenActions {
    
    recievePollenData(pollenData, zipcode) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECEIVE_RAW_POLLEN,
            data: pollenData.data,
            zipcode: zipcode
        });
    }
}

export default new PollenActions();