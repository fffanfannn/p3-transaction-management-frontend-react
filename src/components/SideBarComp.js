import React, { useState } from "react";
import { Link } from "react-router-dom";

function SideBarComp() {
  const [sideBarBtn1, setSideBarBtn1] = useState(false);
  const [sideBarBtn2, setSideBarBtn2] = useState(true);
  const [sideBarBtn3, setSideBarBtn3] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("lastUserInfo"));

  const clickSideBarBtn1 = () => {
    setSideBarBtn1(true);
    setSideBarBtn2(false);
    setSideBarBtn3(false);
  };

  const clickSideBarBtn2 = () => {
    setSideBarBtn1(false);
    setSideBarBtn2(true);
    setSideBarBtn3(false);
  };

  const clickSideBarBtn3 = () => {
    setSideBarBtn1(false);
    setSideBarBtn2(false);
    setSideBarBtn3(true);
  };

  return (
    <div className="sideBar">
      {/* <Link
        to={{ pathname: `/home/${userInfo.name}` }}
        onClick={clickSideBarBtn1}
        className={sideBarBtn1 ? "sideBarBtn1" : ""}
      >
        My Account
      </Link> */}
      <Link
        to={{ pathname: `/main/userdata/${userInfo.name}` }}
        onClick={clickSideBarBtn2}
        className={sideBarBtn2 ? "sideBarBtn2" : ""}
      >
        My Data
      </Link>
      <Link
        to={{ pathname: `/main/report/${userInfo.name}` }}
        onClick={clickSideBarBtn3}
        className={sideBarBtn3 ? "sideBarBtn3" : ""}
      >
        My Report
      </Link>
    </div>
  );
}

export default SideBarComp;
