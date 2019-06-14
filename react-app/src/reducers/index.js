import { combineReducers } from 'redux';
import order from './ordersReducer';
import notifications from './notificationsReducer';

const rootReducer = combineReducers({
    order,
    notifications
});

export default rootReducer;