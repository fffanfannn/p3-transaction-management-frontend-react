import React, { useState, useEffect } from "react";
import store_csrul from "../redux/store_csurl";
import CreateComp from "./CreateComp";
import EditComp from "./EditComp";
import DetailsComp from "./DetailsComp";

function UserData() {
  const [dataNote, setDataNote] = useState("");
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [listData, setListData] = useState(null);

  const [incomeTotalAmount, setIncomeTotalAmount] = useState(0);
  const [expenseTotalAmount, setExpenseTotalAmount] = useState(0);
  const [data, setData] = useState([]);

  const renderCreateComp = createDialog ? <CreateComp /> : null;

  const csURL = store_csrul.getState().csURL;
  const loginUserState = JSON.parse(localStorage.getItem("lastUserInfo"))._id;
  console.log("userID", loginUserState);
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${csURL}api/account/user/${loginUserState}`
      );
      const data = await response.json();
      if (data.msg) {
        setDataNote("Please create new data");
      } else {
        console.log(data);
        setData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateTotalAmount = () => {
    const incomeArray = data.filter((user) => user.type === "Income");
    const expenseArray = data.filter((user) => user.type === "Expense");

    const incomeAmount = incomeArray.reduce(
      (total, user) => total + user.amount,
      0
    );
    const expenseAmount = expenseArray.reduce(
      (total, user) => total + user.amount,
      0
    );

    setIncomeTotalAmount(Math.round(incomeAmount * 100) / 100);
    setExpenseTotalAmount(Math.round(expenseAmount * 100) / 100);
  };

  useEffect(() => {
    fetchUserData();
    calculateTotalAmount();
  }, []);

  const addBtn = () => {
    setCreateDialog(!createDialog);
  };

  const editBtn = (user) => {
    setEditDialog(!editDialog);
    setListData(user);
  };

  const submitDelete = (e) => {
    const csURL = store_csrul.getState().csURL;

    fetch(`${csURL}api/account/delete/${e.target.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          console.log("Account item deleted successfully");
        } else {
          console.error("Failed to delete account item");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const submitDetailLink = (user) => {
    setDetailsDialog(!detailsDialog);
    setListData(user);
  };

  return (
    <div className="userDataList">
      <div className="userDataListHolder">
        <div className="titleAndButton">
          <h2>My Transaction List</h2>
          <div>
            <button onClick={addBtn} data-testid="create-button">
              Create
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>$</th>
              <th>Type</th>
              <th>Tag</th>
              <th className="notDisplayInMobile">Remark</th>
              <th>Update</th>
              <th>Delete</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr
                key={user._id}
                className={user.type === "Income" ? "styleGreen" : "styleRed"}
              >
                <td>{user.date}</td>
                <td>{user.amount}</td>
                <td>{user.type}</td>
                <td>{user.tag}</td>
                <td className="notDisplayInMobile">{user.remark}</td>
                <td>
                  <button
                    id={user._id}
                    onClick={() => editBtn(user)}
                    data-testid="update-button"
                  >
                    update
                  </button>
                </td>
                <td>
                  <button id={user._id} onClick={submitDelete}>
                    delete
                  </button>
                </td>
                <td>
                  <button id={user._id} onClick={() => submitDetailLink(user)}>
                    details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>*Please refresh the page after create, update or delete</p>
        <p>{dataNote}</p>
        {renderCreateComp}
        {editDialog && <EditComp listData={listData} />}
        {detailsDialog && <DetailsComp listData={listData} />}
      </div>
    </div>
  );
}

export default UserData;
