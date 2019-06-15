import { combineReducers } from 'redux';
import order from './ordersReducer';
import notifications from './notificationsReducer';
import page from './pageReducer';

const rootReducer = combineReducers({
    order,
    notifications,
    page
});

export default rootReducer;