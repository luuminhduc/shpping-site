import { addToCart, updateQuantity } from "../redux/action/cartAction/actions";

export const checkItemInCart = ({item,cartList,dispatch}) => {
    const {id} = item;
    const result = cartList.map(el => el.productId).includes(id);
    if(result) {
        dispatch(updateQuantity({isAdd:true,productId:id}))
    }else{
        dispatch(addToCart(item))
    }
}