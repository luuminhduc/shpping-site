import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Alert from "../../components/Alert";
import {
  removeFromCart,
  updateQuantity,
} from "../../redux/action/cartAction/actions";
import { convertMoney } from "../../utils/money";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const controlQuantity = (item) => {
    return (
      <div>
        <div className="border w-28 border-solid border-gray-200 rounded-xl px-3 py-1 flex flex-row justify-between items-center">
          <svg
            onClick={() =>
              dispatch(
                updateQuantity({ isAdd: false, productId: item.productId })
              )
            }
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
          <p>{item.quantity}</p>
          <svg
            onClick={() =>
              dispatch(
                updateQuantity({ isAdd: true, productId: item.productId })
              )
            }
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <p
          onClick={() => dispatch(removeFromCart(item.productId))}
          className="text-xs mt-2 underline cursor-pointer"
        >
          Remove
        </p>
      </div>
    );
  };

  const renderCart = () => {
    return (
      <div className="col-span-8">
        {cartList.length > 0 ? (
          cartList.map((item, idx) => (
            <div
              className="flex mb-5 w-full border-b border-solid border-gray-100 pb-5 text-sm flex-row justify-between items-start"
              key={idx}
            >
              <div className="flex flex-row justify-start items-start">
                <img src={item.photo} className="mr-3 w-32" alt="" />
                <div className="w-44">
                  <p className="mb-1">{item.title}</p>
                  <p className="text-gray-600 mb-1">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-gray-600">Price: {item.price}</p>
                  <div className="block mt-3 md:hidden">
                    {controlQuantity(item)}
                  </div>
                </div>
              </div>
              <div className="md:block hidden">{controlQuantity(item)}</div>
              <p className="font-semibold text-xl">
                {+item.price * item.quantity}$
              </p>
            </div>
          ))
        ) : (
          <div>
            <Alert msg={{ text: "You have no item", status: "info" }} />
            <NavLink to="/">
              <button className="mt-5 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
                Back to shopping
              </button>
            </NavLink>
          </div>
        )}
      </div>
    );
  };

  const getTotal = () => {
    let result = 0;
    if (cartList.length > 0)
      result = cartList
        .map((e) => +e.price * +e.quantity)
        .reduce((a, b) => (a += b));
    return convertMoney(result);
  };

  const renderSummary = () => {
    return (
      <div className="col-span-4">
        <div className="p-5 rounded bg-gray-100">
          <p className="font-bold text-2xl">Estimated total : {getTotal()}$</p>
          <NavLink to="/checkout/shipping">
            <button className="bg-blue-600 text-white p-3 w-full mt-3">
              Checkout
            </button>
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-44">
      <div className="md:grid gap-10 grid-cols-12">
        {renderCart()}
        {cartList.length > 0 && renderSummary()}
      </div>
    </div>
  );
};

export default Cart;
