import { addToCart, updateQuantity } from "../redux/action/cartAction/actions";

export const checkItemInCart = ({item,cartList,dispatch}) => {
        const {id} = item;
        const result = cartList.find(el => el.productId === id);
        if(result) {
            if(+item.inventory - +result.quantity >= 0) {
                dispatch(updateQuantity({isAdd:true,productId:id}))
            }
        }else{
                dispatch(addToCart(item))
            
        }
    

}