import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const SubCategoryList = ({ category }) => {
  const query = new URLSearchParams(useLocation().search);

  const subCategory = query.get("subCategory")
    ? query.get("subCategory")
    : "all";
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const [list, setList] = useState([]);
  useEffect(() => {
    if (categoryList.length > 0 && category) {
      const arr = categoryList.find(
        (el) => el.name === category
      )?.subCategories;
      setList(arr);
    }
  }, [category, categoryList]);
  return (
    <div className="flex flex-row justify-start item-center capitalize">
      {list?.length > 0 &&
        [...list, "all"].map((el, i) => (
          <NavLink
            key={i}
            to={`/search?category=${category}&&subCategory=${el}`}
          >
            <div
              className={` ${
                el === subCategory ? "bg-black text-white" : "bg-gray-100"
              } text-sm lf px-3 py-1 rounded-xl cursor-pointer mr-3`}
            >
              #{el}
            </div>
          </NavLink>
        ))}
    </div>
  );
};

export default SubCategoryList;
