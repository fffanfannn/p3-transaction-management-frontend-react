import React, { useEffect, useState } from "react";
import HeaderComp from "./HeaderComp";
import store_csrul from "../redux/store_csurl";

function AdminData() {
  const [dataNote, setDataNote] = useState("");
  const [dataAll, setDataAll] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const csURL = store_csrul.getState().csURL;
      try {
        const response = await fetch(`${csURL}api/user/list`);
        const data = await response.json();
        if (data.msg) {
          setDataNote("No Users Found");
        } else {
          console.log(data);
          setDataAll(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <header>
        <HeaderComp />
      </header>
      <section className="adminPage">
        <p>{dataNote}</p>
        <table>
          <thead>
            <tr>
              <th className="notDisplayInMobile">User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Type</th>
              <th>VIP</th>
            </tr>
          </thead>
          <tbody>
            {dataAll.map((user) => (
              <tr
                key={user._id}
                className={`${user.isVip ? "styleGreen" : "styleRed"}`}
              >
                <td className="notDisplayInMobile">{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>{user.isVip ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminData;
