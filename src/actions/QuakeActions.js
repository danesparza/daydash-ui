import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class QuakeActions {
    
    recieveQuakeData(quakeData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECIEVE_QUAKE_INFO,
            data: quakeData.data
        });
    }
}

export default new QuakeActions();