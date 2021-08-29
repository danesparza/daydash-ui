import AppDispatcher from '../dispatcher/AppDispatcher';
import DashboardConstants from './DashboardConstants';

class NewsActions {
    
    recieveNewsData(newsData) {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.RECIEVE_RAW_NEWS_EVENTS,
            data: newsData.data
        });
    }
}

export default new NewsActions();