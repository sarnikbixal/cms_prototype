import * as types from './actionTypes';
import axios from 'axios';
import * as io from 'socket.io-client';

const baseApiUri = 'localhost:3001';
let ws = null,
socket = null;

export function connectToSocketSuccess(socket, msg){
    return {type: types.CONNECT_SOCKET_SUCCESS, socket, msg};
}

export function connectToSocketFailure(error){
    return {type: types.CONNECT_SOCKET_FAILURE, error};
}

export function subscribeSuccess(topic, data){
    return {type: types.SOCKET_SUBSCRIBE_SUCCESS, topic, data};
}

export function subscribeFailure(topic){
    return {type: types.SOCKET_SUBSCRIBE_FAILURE, topic};
}

export function subscribe(){
    return (dispatch) => {
        socket.on('message', (data) => {
            try{
                let parsed = JSON.parse(data);
                dispatch(subscribeSuccess(parsed.topic, parsed.message));
            }catch(ex){
                dispatch(subscribeFailure('topic', ex));
            }
        }).on('error', (e)=>{
            dispatch(subscribeFailure('topic', e));
        });
    }
}

export function connectToSocket(userModel){
    let url = `${baseApiUri}/api/getServerPath`;

    return function(dispatch){
        return new Promise((resolve, reject)=>{
            if(socket) return resolve('Websocket connection already initilialized');
            
            axios.get(url)
            .then(res => {
                let _data = res.data;
                let serverDNS = _data.serverDNS;
                let socketIoOptions = {
                    path: "/socket.io",
                    transport: "websocket, flashsocket, polling",
                    query: {clientInfo: userModel.username}
                }

                socket = io(serverDNS, socketIoOptions);
        
                socket.on("success", (msg) => {
                    console.log('Connected to cryptrack socket server')
                    dispatch(connectToSocketSuccess(msg));
                    resolve(socket);
                });
        
                socket.on("connect_error", (error) =>{
                    dispatch(connectToSocketFailure(error));
                    reject(error);
                });

            }).catch(e => {
                dispatch(connectToSocketFailure(e.message));
                reject(e.message);
            });
        });
    }
}

export function openSocketStream(_symbol){
    return function(dispatch){
        let _topic = `ticker_${_symbol.toLowerCase()}`;
        let socketPath = `wss://stream.binance.com:9443/ws/${_symbol.toLowerCase()}@ticker`;
        try{
            if(ws) ws.close();
            ws = new WebSocket(socketPath);
            ws.topic = _topic;

            ws.onopen = (event) =>{

            };

            ws.onerror = (event) => {
                dispatch(subscribeFailure(_topic, null));
            };

            ws.onmessage = (event) => {
                let _data = {
                    topic: _topic,
                    message: JSON.parse(event.data)
                }
                dispatch(subscribeSuccess(_data.topic, _data.message));
            };

            ws.onclose = (event) =>{
                dispatch(subscribeFailure(event.target.topic, null));
                console.log(event)
            };

        }catch(ex){
            dispatch(subscribeFailure(_topic, null));
        }
    }
}

export function getTicker(_symbol){
    let url = `${baseApiUri}/api/getCurrentPrices`,
    options = {
        params:{
            symbol: _symbol
        }
    };
    return function(dispatch){
        return new Promise((resolve, reject) =>{
            axios.post(url, options)
            .then(res => {
                let _data = res.data;
                resolve(_data)
            }).catch(e => {
                reject(e.message);
            });
        });
    }
}