import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class PollenActions {
    
    recievePollenData(pollenData, zipcode) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECIEVE_RAW_POLLEN,
            pollenData: pollenData,
            zipcode: zipcode
        });
    }
}

export default new PollenActions();