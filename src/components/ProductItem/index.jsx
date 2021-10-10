import React from "react";
import { NavLink } from "react-router-dom";

const ProductItem = ({ item }) => {
  console.log(item);
  const { photo, price, title, id } = item;
  return (
    <div>
      <NavLink to={`/products/${id}`}>
        <img src={photo} alt="" />
      </NavLink>

      <button className="bg-blue-600 transform -translate-y-4 text-white px-4 py-2 rounded-3xl">
        Add
      </button>
      <div className="mt-3">
        <p className="font-bold">${price}</p>
        <p className="font-light">{title}</p>
      </div>
    </div>
  );
};

export default ProductItem;
