import * as types from '../actions/actionTypes';
import * as _ from 'lodash';

const initialState =  {
    model: {}
}

export default function notificationsReducer(state = initialState, action){
    switch(action.type){
        case 'TEST_NOTIFICATION':
            return {
                ...state, model: {
                    ...state.model, 
                        [action.notification.notificationId]: action.notification
                }
            };

        case types.NEW_NOTIFICATION_SUCCESS:
            return{
                ...state, model: {
                    ...state.model, 
                        [action.notification.notificationId]: action.notification
                }
            }
        
        case types.DELETE_NOTIFICATION_SUCCESS:
            let clone = _.cloneDeep(state.model);
            delete clone[action.id];
            clone = action.id === -1 ? {} : clone;
            return {
                ...state, 
                model: clone
            };
        default:
            return state;
    }
}