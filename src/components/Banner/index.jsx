import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Banner = () => {
  const dataArr = [
    {
      src: "https://m.media-amazon.com/images/I/71qid7QFWJL._SX3740_.jpg",
      url: `Beauty`,
    },
    {
      src: "https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg",
      url: `Toy`,
    },
    {
      src: "https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3000_.jpg",
      url: `Furniture`,
    },
    {
      src: "https://m.media-amazon.com/images/I/61CiqVTRBEL._SX3000_.jpg",
      url: `Electronic`,
    },
  ];

  const [current, setCurrent] = useState(0);

  const toNext = () => {
    if (current < dataArr.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
    }
  };

  const toPrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      setCurrent(dataArr.length - 1);
    }
  };

  return (
    <div style={{ height: "420px" }} className="mt-5 w-full relative">
      <NavLink
        onClick={() => window.scrollTo(0, 0)}
        to={`/search?category=${dataArr[current].url}`}
      >
        <img
          src={dataArr[current]?.src}
          className="absolute top-0 left-0 z-0 h-full w-full"
          alt=""
        />
      </NavLink>

      <div className="cursor-pointer pb-5 flex flex-col justify-between items-center w-full h-full">
        <div></div>
        <div className="flex w-full relative z-10 px-3 flex-row justify-between items-center">
          <svg
            onClick={toPrev}
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 text-gray-700 hover:text-gray-900 cursor-pointer w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <svg
            onClick={toNext}
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 text-gray-700 hover:text-gray-900 cursor-pointer w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div className="flex relative z-10 flex-row justify-center items-center">
          {dataArr.map((el, i) => (
            <div
              onClick={() => setCurrent(i)}
              key={i}
              className={`mx-3 cursor-pointer h-2 w-2 ${
                current === i ? "bg-blue-600" : "bg-gray-200"
              } rounded-full`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
