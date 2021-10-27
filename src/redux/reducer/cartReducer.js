import *  as actions from '../action/cartAction/actionTypes';

const initialState = {
    cartList: JSON.parse(localStorage.getItem("cartList"))? JSON.parse(localStorage.getItem("cartList")):[]
}

const updateToLocalStorage = (list) => {
    localStorage.setItem("cartList",JSON.stringify(list));
}

export default function cartReducer(state=initialState,action) {
    const {type,payload} = action;
    switch(type) {
        case actions.ADD_TO_CART: {
            const newList = [...state.cartList];
            newList.push(payload);
            updateToLocalStorage(newList);
            return {...state,cartList:newList};
        }
        case actions.REMOVE_FROM_CART:{
            const newList = [...state.cartList].filter(el => el.productId !== payload);
        
            updateToLocalStorage(newList);
            return {...state,cartList:newList};   
        }
        case actions.UPDATE_QUANTITY:{
            const {isAdd,productId} = payload;
            const newList = [...state.cartList];
            const index = newList.findIndex(el => el.productId === productId);
            if(isAdd) {
                if(newList[index].inventory - +newList[index].quantity > 0) newList[index].quantity++;
            }else{
                if(newList[index].quantity > 1) {
                    newList[index].quantity--;
                }
            }
            updateToLocalStorage(newList);
            return {...state,cartList:newList}
        }
        case actions.REMOVE_ALL:{
            const newList = [];
            updateToLocalStorage(newList);
            return{...state,cartList:newList}
        }
        default: return state;
    }
}