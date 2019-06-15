import * as types from './actionTypes';

export function setPageInfoSuccess(data){
    return {type: types.SET_PAGE_INFO_SUCCESS, data};
}

export function setPageInfo(info){
    return function(dispatch){
        dispatch(setPageInfoSuccess(info));
    }
}