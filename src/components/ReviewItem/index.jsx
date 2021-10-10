import React, { useEffect, useState } from "react";
import { getUser } from "../../utils/getUser";
import Stars from "../Stars";

const ReviewItem = ({ item }) => {
  const { title, detail, rating, uid, time } = item;
  const [user, setUser] = useState("");

  useEffect(() => {
    if (uid)
      getUser(uid).then((res) => {
        setUser(res);
      });
  }, [uid]);

  const getTime = () => {
    const date = time.toDate();
    return (
      <span className="text-xs">
        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
      </span>
    );
  };

  return (
    <div className="shadow-2xl p-3 rounded-lg">
      <div className="flex flex-row justify-between items-start">
        <Stars rating={rating} />
        <p className="text-green-600 font-bold text-xs mb-3 ml-1">
          Verified client
        </p>
      </div>
      <p className="mb-3">{title}</p>
      <p className="tracking-wide mb-3">{detail}</p>
      {user && (
        <div className="mt-5 text-gray-700">
          <p className="mb-1">{user.email}</p>
          {getTime()}
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
