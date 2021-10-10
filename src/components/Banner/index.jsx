import React, { useState } from "react";

const Banner = () => {
  const dataArr = [
    {
      src: "https://m.media-amazon.com/images/I/61CiqVTRBEL._SX3000_.jpg",
    },
    {
      src: "https://m.media-amazon.com/images/I/71qid7QFWJL._SX3740_.jpg",
    },
    {
      src: "https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg",
    },
    {
      src: "https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3000_.jpg",
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
    <div className="mt-5 relative">
      <img src={dataArr[current]?.src} className="w-full h-full" alt="" />
      <div className="absolute flex flex-col justify-between items-center top-0 left-0 h-full w-full">
        <div></div>
        <div className="flex w-full px-3  flex-row justify-between items-center">
          <svg
            onClick={toPrev}
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 cursor-pointer w-8"
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
            className="h-8 cursor-pointer w-8"
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
        <div></div>
      </div>
    </div>
  );
};

export default Banner;
