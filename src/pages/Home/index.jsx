import React from "react";
import { useSelector } from "react-redux";
import Alert from "../../components/Alert";
import Banner from "../../components/Banner";
import CategoryList from "../../components/CategoryList";

import ProductList from "../../components/ProductList";

const Home = () => {
  const { productList } = useSelector((state) => state.productReducer);

  return (
    <div className="">
      <Alert
        msg={{
          text: "The membership that helps you save more time & money.",
          status: "info",
        }}
      />
      <Banner />
      <CategoryList />
      <ProductList cols={6} list={productList} />
    </div>
  );
};

export default Home;
