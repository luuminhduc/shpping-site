import React from "react";

const Alert = ({ msg }) => {
  const { text, status } = msg;
  return (
    <div
      className={`w-full font-semibold p-3 text-sm rounded-sm ${
        status === "err"
          ? "bg-red-100 text-red-600"
          : "bg-green-100 text-green-600"
      }`}
    >
      {text}
    </div>
  );
};

export default Alert;
