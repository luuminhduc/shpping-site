import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const CartIcon = () => {
  const { cartList } = useSelector((state) => state.cartReducer);

  return (
    <NavLink to="/cart">
      <div className="ml-3 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <p className="absolute -top-4 h-6 w-6 flex justify-center items-center rounded-full text-sm bg-yellow-500 text-black -right-3">
          {cartList.length}
        </p>
      </div>
    </NavLink>
  );
};

export default CartIcon;
