import * as actions from '../action/productAction/actionTypes';

const initialState = {
    productList:[],
    isAdd:false,
    searchTerm:""
}

export default function productReducer(state=initialState,action) {
    const {type, payload} = action;
    switch(type) {
        case actions.FETCH_PRODUCT_LIST: return {...state,productList:payload};
        case actions.SEARCHING_PRODUCT:return{...state,searchTerm:payload}
        default: return state;
    }
}