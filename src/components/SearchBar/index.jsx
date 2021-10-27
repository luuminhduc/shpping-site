import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { searchingProduct } from "../../redux/action/productAction/actions";

const SearchBar = () => {
  const { searchTerm, productList } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();

  const history = useHistory();

  const [list, setList] = useState([]);

  const onSearch = (para) => {
    dispatch(searchingProduct(""));
    history.push(`/search?name=${para}`);
  };

  useEffect(() => {
    if (productList.length > 0) {
      setList(
        productList
          .filter(
            (item) =>
              item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
          )
          .slice(0, 8)
      );
    }
  }, [searchTerm, productList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchingProduct(""));
    history.push(`/search?name=${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full relative border flex flex-row justify-between items-center border-solid px-3 border-gray-200"
    >
      <input
        value={searchTerm}
        onChange={(e) => dispatch(searchingProduct(e.target.value))}
        type="text"
        placeholder="Search..."
        className="flex-grow focus:outline-none p-3 rounded-3xl"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {searchTerm && (
        <div
          // style={{ maxHeight: "400px" }}
          className="absolute top-12 overflow-y-hidden text-sm cursor-pointer bg-white shadow-2xl left-0 w-full"
        >
          {list.length > 0 &&
            list.map((el, i) => (
              <div
                key={i}
                onClick={() => onSearch(el.title)}
                className="p-5 border-b border-solid border-gray-100 hover:bg-gray-100"
              >
                <p className="w-32 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {el.title}
                </p>
              </div>
            ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
