import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addToCart } from "../../redux/action/cartAction/actions";
import { checkItemInCart } from "../../utils/cartUtil";
import { convertMoney } from "../../utils/money";

const ProductItem = ({ item }) => {
  const { photo, price, title, id, inventory } = item;
  const { cartList } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const onAddToCart = () => {
    if (+inventory > 0) {
      if (cartList.length > 0) {
        checkItemInCart({ item, cartList, dispatch });
      } else {
        dispatch(addToCart(item));
      }
    }
  };

  return (
    <div
      // onClick={() => window.scrollTo(0, 0)}
      className="hover:scale-105 transform"
    >
      <NavLink to={`/products/${id}`}>
        <img src={photo} alt="" />
      </NavLink>

      <button
        onClick={onAddToCart}
        className="bg-blue-600 hover:bg-blue-700 transform -translate-y-4 text-white px-4 py-2 rounded-3xl"
      >
        Add
      </button>
      <div className="mt-3">
        <p className="font-bold">${convertMoney(price)}</p>
        <p className="font-light">{title}</p>
      </div>
    </div>
  );
};

export default ProductItem;
