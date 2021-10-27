import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import AccountSideBar from "../../components/AccountSideBar";
import EditAddress from "../../components/EditAddress";
import History from "../../components/History";
import PersonalInfo from "../../components/PersonalInfo";

const Account = () => {
  const history = useHistory();
  const { auth } = useSelector((state) => state.firebaseReducer);
  const { currentUser } = useSelector((state) => state.loginReducer);

  const { uid } = auth;
  const params = useParams();
  const { part } = params;
  const getItem = () => {
    switch (part) {
      case "address":
        return <EditAddress />;
      case "history":
        return <History />;
      default:
        return <PersonalInfo />;
    }
  };

  useEffect(() => {
    if (!uid) history.push("/login");
  }, [uid, history]);

  return currentUser ? (
    <div className="md:grid pt-10 gap-10 grid-cols-12">
      <div className="col-span-4">
        <AccountSideBar />
      </div>
      <div className="col-span-8">{currentUser && getItem()}</div>
    </div>
  ) : (
    ""
  );
};

export default Account;
