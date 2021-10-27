import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchOrderList } from "../../redux/action/orderAction/actions";
import { convertMoney } from "../../utils/money";
import Alert from "../Alert";

const History = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.firebaseReducer);
  const { uid } = auth;

  useEffect(() => {
    if (uid) dispatch(fetchOrderList(uid));
  }, [uid, dispatch]);

  const getDate = (time) => {
    const date = time.toDate();
    return (
      <p className="text-gray-500 mb-1">
        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
      </p>
    );
  };

  const getTotal = () => {
    return convertMoney(
      orderList.map((el) => +el.quantity * el.price).reduce((a, b) => (a += b))
    );
  };

  const { orderList } = useSelector((state) => state.orderReducer);
  return (
    <div>
      {orderList.length > 0 ? (
        <div>
          {orderList.map((item, idx) => (
            <div
              className="flex mb-5 text-sm bg-gray-100 p-5 rounded flex-row justify-between items-center"
              key={idx}
            >
              <div className="flex flex-start flex-row items-start">
                <img src={item.photo} className="w-14 mr-3" alt="" />
                <div>
                  {item.time && getDate(item.time)}
                  <p className="overflow-ellipsis overflow-hidden whitespace-nowrap w-36">
                    {item.title}
                  </p>
                </div>
              </div>
              <p>
                {convertMoney(item.price)}$ * {item.quantity}
              </p>
            </div>
          ))}
          <div className="mt-10 flex flex-row justify-end items-center">
            <p className="font-bold">
              You have spent a total of: {getTotal()} $
            </p>
          </div>
        </div>
      ) : (
        <Alert msg={{ text: "You have no item", status: "info" }} />
      )}
    </div>
  );
};

export default History;
