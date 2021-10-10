import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviewList,
  showReviewModal,
} from "../../redux/action/reviewAction/actions";
import ReviewItem from "../ReviewItem";
import Stars from "../Stars";
import WriteReview from "../WriteReview";
const Reviews = ({ productId }) => {
  const { reviewList } = useSelector((state) => state.reviewReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) dispatch(fetchReviewList(productId));
  }, [productId]);

  const getRating = () => {
    let num = 0;
    if (reviewList.length > 0) {
      const all = reviewList.map((el) => +el.rating).reduce((a, b) => (a += b));
      num = Math.round(all / reviewList.length);
    }
    return num;
  };

  const renderNumber = () => {
    return (
      <div className="">
        <p className="font-bold text-7xl">
          {getRating()} <span className="text-base">Out of</span> 5
        </p>
        <div className="mt-5">
          <Stars rating={getRating()} />
        </div>
      </div>
    );
  };

  const renderChart = () => {
    const arr = [5, 4, 3, 2, 1];

    return <div>{arr.map((el) => chartItem(el))}</div>;
  };

  const chartItem = (el) => {
    let percent = 0;
    let ratingArr = [];
    if (reviewList.length > 0) {
      const ratingArr = reviewList.map((e) => e.rating).filter((e) => e == el);
      percent = (ratingArr.length / reviewList.length) * 100;
    }

    return (
      <div className="flex flex-row justify-between items-center mb-3" key={el}>
        <div className="w-14 text-sm">{el} stars</div>
        <div className="flex-grow relative h-1 bg-gray-100 rounded">
          <div
            style={{ width: `${percent}%` }}
            className="absolute top-0 left-0 rounded h-full bg-gray-700"
          ></div>
        </div>
        <div className="w-5 text-right text-sm">{ratingArr.length}</div>
      </div>
    );
  };

  return (
    <div className="mt-5 md:w-3/4">
      <WriteReview productId={productId} reviewList={reviewList} />
      <h3 className="font-bold text-xl mb-3">Customer reviews and ratings</h3>

      <div className="md:grid gap-10 grid-cols-2">
        {renderNumber()}
        {renderChart()}
      </div>

      <button
        onClick={() => dispatch(showReviewModal())}
        className="bg-blue-600 font-semibold mt-5 text-white px-4 py-1 text-sm rounded-3xl"
      >
        Write a review
      </button>

      <div className="mt-10 text-sm grid md:grid-cols-3 grid-cols-2 gap-10">
        {reviewList.map((el, i) => (
          <ReviewItem key={i} item={el} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
