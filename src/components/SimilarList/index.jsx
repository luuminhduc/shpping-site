import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "../ProductList";

const SimilarList = ({ product }) => {
  const { productList } = useSelector((state) => state.productReducer);
  const [list, setList] = useState([]);
  useEffect(() => {
    const { subCategory } = product;

    if (productList.length > 0) {
      const similarList = productList
        .filter((el) => el.subCategory === subCategory && el.id !== product.id)
        .slice(0, 5);
      setList(similarList);
    }
  }, [product, productList]);
  return list.length > 0 ? (
    <div className="mt-20 mb-10">
      <h3 className="font-bold text-xl mb-3">You may also like</h3>
      <ProductList cols={6} list={list} />;
    </div>
  ) : (
    ""
  );
};

export default SimilarList;
