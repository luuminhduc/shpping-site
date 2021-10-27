import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import CartSummary from "../../components/CartSummary";
import EditAddress from "../../components/EditAddress";

const Shipping = () => {
  const { cartList } = useSelector((state) => state.cartReducer);
  const { currentUser } = useSelector((state) => state.loginReducer);
  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;
  const history = useHistory();

  useEffect(() => {
    if (cartList.length <= 0) history.push("/");
  }, [history, cartList]);

  useEffect(() => {
    if (!uid) history.push("/login");
  }, [uid, history]);

  return (
    <div className="md:grid gap-10 grid-cols-12">
      <div className="col-span-8">
        <h2 className="text-xl font-bold mb-5">Shipping</h2>
        {currentUser && <EditAddress checkout={true} />}
      </div>
      <CartSummary />
    </div>
  );
};

export default Shipping;
