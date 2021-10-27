import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const CartSummary = () => {
  const { cartList } = useSelector((state) => state.cartReducer);

  const getTotal = () => {
    let result = 0;
    if (cartList.length > 0)
      result = cartList
        .map((e) => +e.price * +e.quantity)
        .reduce((a, b) => (a += b));
    return result;
  };

  return (
    <div className="col-span-4">
      <div className="p-5 rounded shadow-2xl">
        <div className="flex flex-row justify-between items-center">
          <p className="font-bold text-2xl">Sub total : {getTotal()}$</p>
          <NavLink to="/cart" className="text-sm p-1 hover:bg-gray-100">
            Change
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
