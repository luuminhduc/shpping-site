import React from "react";

const SearchBar = () => {
  return (
    <div className="w-full border flex flex-row justify-between items-center border-solid px-3 border-gray-200 rounded-3xl">
      <input
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
    </div>
  );
};

export default SearchBar;
