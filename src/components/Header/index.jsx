import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AccountToolkit from "../AccountToolkit";
import CartIcon from "../CartIcon";
import Logo from "../Logo";
import SearchBar from "../SearchBar";

const Header = () => {
  const [toolkit, setToolkit] = useState(true);
  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;
  return (
    <div className="w-full fixed top-0 left-0 z-20 bg-white py-4 text-gray-900 border-b border-solid border-gray-100">
      <div
        className={`mx-auto flex flex-row justify-between items-center lg:max-w-6xl bg md:max-w-3xl w-full px-3 md:px-0`}
      >
        <Logo />
        <div className="hidden md:block w-1/2">
          <SearchBar />
        </div>
        <div className="flex flex-row justify-end items-center">
          {uid ? (
            <div className="relative">
              {toolkit && <AccountToolkit setToolkit={setToolkit} />}
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
          ) : (
            <NavLink to="/login">
              <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">
                Login
              </button>
            </NavLink>
          )}

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
