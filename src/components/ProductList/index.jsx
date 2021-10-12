import React from "react";
import ProductItem from "../ProductItem";

const ProductList = ({ list }) => {
  return (
    <div className="my-10">
      <div className="grid gap-10 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {list.map((item, idx) => (
          <ProductItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
