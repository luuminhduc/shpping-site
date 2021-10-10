import * as actions from '../action/reviewAction/actionTypes';

const initialState = {
    reviewList:[],
    reviewModal:false
}

export default function reviewReducer(state=initialState,action){
    const {type,payload} = action;
    switch(type){
        case actions.FETCH_REVIEW_LIST: return{...state,reviewList:payload};
        case actions.SHOW_REVIEW_MODAL: case actions.HIDE_REVIEW_MODAL: return {...state,reviewModal:payload};
        default: return state;
    }
}