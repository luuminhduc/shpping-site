import React from "react";
import Stars from "../Stars";

const ReviewItem = ({ item }) => {
  const { title, detail, rating } = item;
  return (
    <div className="shadow-lg p-3 rounded">
      <div className="flex flex-row justify-start items-start">
        <Stars rating={rating} />
        <p className="text-green-600 font-bold text-xs mb-3 ml-1">
          Verified client
        </p>
      </div>
      <p className="mb-3">{title}</p>
      <p className="tracking-wide">{detail}</p>
    </div>
  );
};

export default ReviewItem;
