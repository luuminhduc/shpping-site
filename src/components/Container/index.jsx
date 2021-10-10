import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoryList } from "../../redux/action/categoryAction/actions";
import { fetchProductList } from "../../redux/action/productAction/actions";
import Header from "../Header";

const Container = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryList());
    dispatch(fetchProductList());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="mt-5 pb-10">
        <div className="mx-auto text-black lg:max-w-6xl bg md:max-w-3xl w-full px-3 md:px-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Container;
