import React from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";

const AccountSideBar = () => {
  const arr = ["address", "info", "history"];
  const params = useParams();
  const { part } = params;
  return (
    <div className="w-full text-sm h-full border-r border-solid border-gray-200">
      <div className="border-b border-solid border-gray-200 pb-5 mb-5">
        <h3 className="text-xl font-semibold mb-3">Hi there</h3>
        <p>Thank you for being our customer</p>
      </div>
      <div className="border-b border-solid border-gray-200 pb-5 mb-5">
        <h3 className="text-xl font-semibold mb-3">Manage account</h3>
        {arr.map((el) => (
          <NavLink to={`/account/${el}`} key={el}>
            <p
              className={`capitalize p-3 mb-3 ${
                el === part
                  ? "bg-blue-50 border-l-2 border-blue-600 border-solid"
                  : "hover:text-blue-600"
              } `}
            >
              {el}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AccountSideBar;
