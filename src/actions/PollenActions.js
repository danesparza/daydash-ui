import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class PollenActions {
    
    recievePollenData(pollenData, zipcode) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECIEVE_RAW_POLLEN,
            data: pollenData.data,
            zipcode: zipcode
        });
    }
}

export default new PollenActions();