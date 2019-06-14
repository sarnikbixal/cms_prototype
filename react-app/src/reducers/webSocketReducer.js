import * as types from '../actions/actionTypes';

const initialState =  {
    isInit: null,
    subscribedFeeds: {}
}

export default function webSocketReducer(state = initialState, action){
    switch(action.type){
        case types.CONNECT_SOCKET_SUCCESS:
            return {...state, isInit: true};

        case types.CONNECT_SOCKET_FAILURE:
            return {...state, isInit: false};

        case types.SOCKET_SUBSCRIBE_SUCCESS:
            return {
                ...state.subscribedFeeds, 
                    subscribedFeeds: {
                        ...state.subscribedFeeds,
                         [action.topic]: action.data
                    }
                };

        case types.SOCKET_SUBSCRIBE_FAILURE:
            return state;
            // let removed = {...state.subscribedFeeds}
            // delete removed[action.topic];
            // return {
            //     ...state.subscribedFeeds, 
            //         subscribedFeeds: removed
            //     };

        default:
            return state;
    }
}