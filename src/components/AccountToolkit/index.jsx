import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/action/loginAction/actions";

const AccountToolkit = () => {
  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;

  const dispatch = useDispatch();

  return (
    <div className="bg-white text-sm rounded z-10 border border-solid border-gray-100 shadow-sm absolute -bottom-40 w-56 -left-48">
      <p className="p-2 font-semibold">Account</p>
      <p className="p-2 cursor-pointer hover:bg-gray-100">History</p>
      <p className="p-2 cursor-pointer hover:bg-gray-100">Profile</p>
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
