import * as types from '../actions/actionTypes';
import * as _ from 'lodash';

const initialState =  {};

export default function ordersReducer(state = initialState, action){
    switch(action.type){
        case types.SET_ORDER_SUCCESS:
            return action.order;
        case types.UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state, steps: action.steps
            }
        default:
            return state;
    }
}