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
                    dispatch(setOrderFailure(_data.error));
                    reject(_data.error);
                }else{
                    dispatch(setOrderSuccess(_data));
                    resolve(_data);
                }
            }).catch(e => {
                dispatch(setOrderFailure(e.message));
                reject(e.message);
            });
        });
    }
}

export function updateOrderStatus(steps){
    return function(dispatch){      
        dispatch(updateOrderStatusSuccess(steps));
    }
}

export function updateOrderStatusSuccess(steps){
    return {type: types.UPDATE_ORDER_STATUS_SUCCESS, steps};
}

export function downloadICS(_order){
    let url = `${baseUri}/api/downloadICS`;
    let options = {};
    return function(dispatch){
        axios.get(url, options)
        .then(res => {
            let _data = res.data;
            console.log(_data)
        }).catch(e => {
            console.log(e)
        });
    }
}

export function createICS(_order, _date){
    let url = `${baseUri}/api/createICS`;
    let options = {
        params:{
            order: _order,
            date: _date
        }
    };
    return function(dispatch){
        return new Promise((resolve, reject)=>{
            axios.post(url, options)
            .then(res => {
                let _data = res.data;
                console.log(_data)
                if(_data.error){
                    reject(_data.error);
                }else{
                    resolve(_data);
                }
            }).catch(e => {
                reject(e.message);
            });
        })
    }
}