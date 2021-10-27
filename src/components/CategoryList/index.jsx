import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const CategoryList = () => {
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const query = new URLSearchParams(useLocation().search);

  const category = query.get("category");

  return (
    <div className="flex flex-wrap mt-14 mb-16 justify-center items-center">
      {categoryList.map((el, i) => (
        <NavLink key={i} to={`/search?category=${el.name}`}>
          <div
            className={`${
              category === el.name
                ? "bg-yellow-600 text-white"
                : "border border-solid border-gray-500 hover:border-yellow-600 hover:bg-yellow-600 hover:text-white"
            }  py-2 px-4 mb-3 rounded cursor-pointer mx-3`}
          >
            {el.name}
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default CategoryList;
