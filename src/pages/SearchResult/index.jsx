import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import CategoryList from "../../components/CategoryList";
import ProductList from "../../components/ProductList";
import SubCategoryList from "../../components/SubCategoryList";

const SearchResult = () => {
  const query = new URLSearchParams(useLocation().search);

  const { productList } = useSelector((state) => state.productReducer);

  const category = query.get("category");
  const name = query.get("name");

  const subCategory = query.get("subCategory")
    ? query.get("subCategory")
    : "all";

  const [list, setList] = useState([]);

  useEffect(() => {
    if (productList.length > 0) {
      let arr = [];
      if (category) {
        arr = productList.filter((el) => el.category === category);
        if (subCategory.toLocaleLowerCase() === "all") {
        } else {
          arr = arr.filter(
            (el) =>
              el.subCategory.toLocaleLowerCase() ===
              subCategory.toLocaleLowerCase()
          );
        }
      }
      if (name) {
        arr = productList.filter(
          (item) => item.title.toLowerCase().indexOf(name.toLowerCase()) > -1
        );
      }
      setList(arr);
    }
  }, [category, productList, subCategory, name]);

  return (
    <div className="md:pt-0 py-5">
      {category && !name && <CategoryList />}
      {category && !name && <SubCategoryList category={category} />}
      <ProductList cols={6} list={list} />
    </div>
  );
};

export default SearchResult;
