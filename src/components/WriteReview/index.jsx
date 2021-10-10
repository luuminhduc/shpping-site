import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addNewReview,
  hideReviewModal,
} from "../../redux/action/reviewAction/actions";
import { timeStamp } from "../../firebase/config";
import Alert from "../Alert";

const WriteReview = ({ productId }) => {
  const { register, handleSubmit, reset } = useForm();
  const { reviewModal, reviewList } = useSelector(
    (state) => state.reviewReducer
  );

  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;

  const [rating, setRating] = useState(3);
  const arr = [1, 2, 3, 4, 5];

  const [err, setErr] = useState("");

  const done = () => {
    reset();
    setErr("");
  };

  const submit = (data) => {
    if (uid) {
      if (reviewList.map((el) => el.uid).includes(uid)) {
        setErr("You have already rated this product");
      } else {
        const newReview = {
          ...data,
          rating,
          time: timeStamp(),
          productId,
          uid,
        };
        dispatch(addNewReview(newReview, done));
      }
    } else {
      setErr("You have to login to rate this product");
    }
  };

  return reviewModal ? (
    <div className="fixed z-40 px-3 text-black top-0 left-0 h-screen w-screen bg-gray-900 bg-opacity-30 flex justify-center items-center">
      <div className="w-full md:max-w-xl bg-white shadow-lg p-10 rounded-md relative">
        <svg
          onClick={() => {
            setErr("");
            dispatch(hideReviewModal());
          }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-700 absolute top-3 right-3 cursor-pointer"
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
        <form onSubmit={handleSubmit((data) => submit(data))}>
          {err && <Alert msg={{ text: err, status: "err" }} />}
          <div className="mb-4 mt-4 flex flex-row justify-center items-center">
            {arr.map((el) => (
              <svg
                key={el}
                onClick={() => setRating(el)}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-7 mr-1 w-7 cursor-pointer ${
                  el <= rating ? "text-yellow-600" : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="flex mb-4 flex-col justify-start items-start">
            <label className="text-sm font-semibold">Title</label>
            <input
              {...register("title", { required: false })}
              placeholder="Sum up your review"
              type="text"
              className="w-full p-2 rounded border border-solid border-gray-200"
            />
          </div>
          <div className="flex mb-4 flex-col justify-start items-start">
            <label className="text-sm font-semibold">Detail</label>
            <textarea
              rows="5"
              {...register("detail", { required: false })}
              placeholder="What did you like or dislike?"
              type="text"
              className="w-full p-2 rounded border border-solid border-gray-200"
            />
          </div>
          <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default WriteReview;
