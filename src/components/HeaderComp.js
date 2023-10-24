import React from "react";
import store_csrul from "../redux/store_csurl";
import { useNavigate } from "react-router-dom";

function HeaderComp() {
  const csURL = store_csrul.getState().csURL;
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
  const submitLogout = async () => {
    try {
      await fetch(`${csURL}api/user/logout`, {
        method: "get",
      });
      localStorage.removeItem("lastUserInfo");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mainPageHeaderContent">
      <div className="container">
        <div className="mainPageHeaderContent">
          <div className="logo">Transaction Management</div>
          <div className="userHeader">
            <p>
              Welcome {userInfo.userType}:{userInfo.name}{" "}
              {userInfo.isVip ? "VIP" : ""}
            </p>
            <button onClick={submitLogout}>Log out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderComp;
