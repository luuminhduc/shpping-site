import * as actions from '../action/orderAction/actionTypes';

const initialState = {
    orderList:""
}

export default function orderReducer(state=initialState,action) {
    const {type, payload} = action;
    switch(type){
        case actions.FETCH_ORDER_LIST:return {...state,orderList:payload}
    default: return state;
    }
}