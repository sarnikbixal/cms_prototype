import * as types from '../actions/actionTypes';

const initialState =  {
    title: '',
    status: ''
};

export default function pageReducer(state = initialState, action){
    switch(action.type){
        case types.SET_PAGE_INFO_SUCCESS:
            return action.data;
        default:
            return state;
    }
}