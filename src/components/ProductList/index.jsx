import React from "react";
import ProductItem from "../ProductItem";

const ProductList = ({ list, cols }) => {
  return (
    <div className="my-10">
      {list.length > 0 ? (
        <div
          className={`grid gap-10 lg:grid-cols-${cols} md:grid-cols-${
            cols - 1
          } sm:grid-cols-${cols - 2} grid-cols-2`}
        >
          {list.map((item, idx) => (
            <ProductItem key={idx} item={item} />
          ))}
        </div>
      ) : (
        <p>No product</p>
      )}
    </div>
  );
};

export default ProductList;
