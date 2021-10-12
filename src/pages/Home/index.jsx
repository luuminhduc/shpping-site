import React from "react";
import { useSelector } from "react-redux";
import Alert from "../../components/Alert";
import Banner from "../../components/Banner";

import ProductList from "../../components/ProductList";

const Home = () => {
  const { productList } = useSelector((state) => state.productReducer);
  const { categoryList } = useSelector((state) => state.categoryReducer);

  return (
    <div className="">
      <Alert
        msg={{
          text: "The membership that helps you save more time & money.",
          status: "info",
        }}
      />
      <Banner />
      <div className="flex flex-wrap mt-14 mb-16 justify-center items-center">
        {categoryList.map((el, i) => (
          <div className="bg-gray-100 px-4 hover:bg-blue-600 hover:text-white py-2 rounded cursor-pointer mx-3">
            {el.name}
          </div>
        ))}
      </div>
      <ProductList list={productList} />
    </div>
  );
};

export default Home;
