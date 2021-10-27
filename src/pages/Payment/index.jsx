import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import Alert from "../../components/Alert";
import CartSummary from "../../components/CartSummary";
import { timeStamp } from "../../firebase/config";
import { saveOrder } from "../../redux/action/orderAction/actions";

const Payment = () => {
  const history = useHistory();
  const { cartList } = useSelector((state) => state.cartReducer);

  const { currentUser } = useSelector((state) => state.loginReducer);

  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!uid) {
      history.push("/login");
    }

    if (currentUser) {
      if (!currentUser.address.city) history.push("/checkout/shipping");
    }
  }, [history, currentUser, uid]);

  const handleClick = () => {
    const orderList = cartList.map((el) => ({ ...el, uid, time: timeStamp() }));
    dispatch(saveOrder(orderList, history));
  };

  const renderAddressInfo = () => {
    const { address } = currentUser;
    const { city, district, ward } = address;
    return (
      <div className="mt-5">
        <h6 className="mb-3 font-bold">
          Your shipping address:{" "}
          <NavLink to="/checkout/shipping">
            <span className="bg-gray-200 font-medium text-sm ml-3 px-3 py-1">
              Change
            </span>
          </NavLink>
        </h6>
        <p className="mb-3">City: {city}</p>
        <p className="mb-3">District: {district}</p>
        <p className="mb-3">Ward: {ward}</p>
        <p className="mb-3">Address: {address.address}</p>
      </div>
    );
  };

  return currentUser && cartList.length > 0 ? (
    <div className="md:grid gap-10 grid-cols-12">
      <div className="col-span-8">
        <Alert
          msg={{ text: "Thank you for being our customer", status: "info" }}
        />
        {renderAddressInfo()}
        <button
          onClick={handleClick}
          className="bg-yellow-500 text-white px-6 py-3 rounded mt-10"
        >
          Finish payment
        </button>
      </div>
      <CartSummary />
    </div>
  ) : (
    ""
  );
};

export default Payment;
