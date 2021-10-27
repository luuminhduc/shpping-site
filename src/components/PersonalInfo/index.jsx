import React from "react";
import { useSelector } from "react-redux";

const PersonalInfo = () => {
  const { currentUser } = useSelector((state) => state.loginReducer);
  const { email } = currentUser;
  return (
    <div>
      <p>Email: {email}</p>
    </div>
  );
};

export default PersonalInfo;
