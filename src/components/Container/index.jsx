import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryList } from "../../redux/action/categoryAction/actions";
import { getCurrentUser } from "../../redux/action/loginAction/actions";
import { fetchProductList } from "../../redux/action/productAction/actions";
import Footer from "../Footer";
import Header from "../Header";
import Modal from "../Modal";

const Container = ({ children }) => {
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;

  useEffect(() => {
    if (uid) {
      dispatch(getCurrentUser(uid));
    }
  }, [dispatch, uid]);

  useEffect(() => {
    dispatch(fetchCategoryList());
    dispatch(fetchProductList());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Modal />
      <div className="md:mt-28 mt-36 pb-10">
        <div className="mx-auto text-black lg:max-w-6xl bg md:max-w-3xl w-full px-3 md:px-0">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Container;
