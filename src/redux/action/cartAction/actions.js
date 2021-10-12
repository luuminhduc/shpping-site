import * as actions from './actionTypes';

export const addToCart = (item) => {
    const {title,price,inventory,photo,id} = item;
    const cartItem = {title,price,inventory,photo,quantity:1,productId:id};
    return{
        type: actions.ADD_TO_CART,
        payload: cartItem,
    }
}

export const removeFromCart = (id) => {
    console.log(id);
    return {
        type: actions.REMOVE_FROM_CART,
        payload:id,
    }
}

export const updateQuantity = (data) => {
    return{
        type: actions.UPDATE_QUANTITY,
        payload:data,
    }
}

