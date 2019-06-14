import * as types from './actionTypes';
import * as _ from 'lodash';
import * as axios from 'axios';

const baseUri = 'http://localhost:3001';

export function setOrderSuccess(order){
    return {type: types.SET_ORDER_SUCCESS, order};
}

export function setOrderFailure(order){
    return {type: types.SET_ORDER_FAILURE, order};
}

export function placeOrder(_order){
    let url = `${baseUri}/api/placeOrder`;
    let options = {
        params:{
            order: _order
        }
    };
    
    return function(dispatch){
        return new Promise((resolve, reject)=>{
            axios.post(url, options)
            .then(res => {
                let _data = res.data;
                if(_data.error){
                    dispatch(setOrderFailure(_data.error));
                    reject(_data.error);
                }else{
                    dispatch(setOrderSuccess(_data));
                    resolve(_data);
                }
            }).catch(e => {
                dispatch(setOrderSuccess(e.message));
                reject(e.message);
            });
        });
    }
}

export function getOrder(_orderId){
    let url = `${baseUri}/api/getOrder`;
    let options = {
        params:{
            orderId: `order_${_orderId}`
        }
    };
    
    return function(dispatch){
        return new Promise((resolve, reject)=>{
            axios.post(url, options)
            .then(res => {
                let _data = res.data;
                if(_data.error){
                    dispatch(setOrderSuccess(_data.error));
                    reject(_data.error);
                }else{
                    dispatch(setOrderSuccess(_data));
                    resolve(_data);
                }
            }).catch(e => {
                dispatch(setOrderSuccess(e.message));
                reject(e.message);
            });
        });
    }
}

export function updateOrderStatus(steps, stepId, isUnFilled){
    return function(dispatch){      
        let step = _.find(steps, {'id': stepId});
        step.isPending = false;
        step.isFilled = isUnFilled ? false : true;
        step.timestamp = new Date().getTime();
        dispatch(updateOrderStatusSuccess(steps));
    }
}

export function updateOrderStatusSuccess(steps){
    return {type: types.UPDATE_ORDER_STATUS_SUCCESS, steps};
}