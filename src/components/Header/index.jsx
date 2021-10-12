import React, { useState } from "react";
import AccountToolkit from "../AccountToolkit";
import CartIcon from "../CartIcon";
import Logo from "../Logo";
import SearchBar from "../SearchBar";

const Header = () => {
  const [toolkit, setToolkit] = useState(false);
  return (
    <div className="w-full fixed top-0 left-0 z-10 bg-white py-4 text-gray-900 border-b border-solid border-gray-100">
      <div
        className={`mx-auto flex flex-row justify-between items-center lg:max-w-6xl bg md:max-w-3xl w-full px-3 md:px-0`}
      >
        <Logo />
        <div className="hidden md:block w-1/3">
          <SearchBar />
        </div>
        <div className="flex flex-row justify-end items-center">
          <div className="relative">
            {toolkit && <AccountToolkit />}
            <svg
              onClick={() => setToolkit(!toolkit)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-purple-600 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <CartIcon />
        </div>
      </div>
      <div className="md:hidden px-3 mt-3 block w-full">
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
