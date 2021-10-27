import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/action/loginAction/actions";

const AccountToolkit = ({ setToolkit }) => {
  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;

  const dispatch = useDispatch();

  return (
    <div className="bg-white text-sm rounded z-10 border border-solid border-gray-100 shadow-sm absolute -bottom-40 w-56 -left-48">
      <div className="flex p-2 flex-row justify-between items-center">
        <p className="font-semibold">Account</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 cursor-pointer"
          onClick={() => setToolkit(false)}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <NavLink onClick={() => setToolkit(false)} to="/account/history">
        <p className="p-2 cursor-pointer hover:bg-gray-100">History</p>
      </NavLink>
      <NavLink onClick={() => setToolkit(false)} to="/account/info">
        <p className="p-2 cursor-pointer hover:bg-gray-100">Info</p>
      </NavLink>
      <div className="p-2">
        {uid ? (
          <button
            onClick={() => dispatch(logout())}
            className="p-2 rounded w-full bg-blue-600 text-white"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">
            <button className="p-2 rounded w-full bg-blue-600 text-white">
              Login
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default AccountToolkit;
