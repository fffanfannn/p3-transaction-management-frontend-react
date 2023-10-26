import React, { useState } from "react";
import store_csrul from "../redux/store_csurl";

function CreateComp() {
  const csURL = store_csrul.getState().csURL;

  const [createMsg, setCreateMsg] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");

  const submitCreate = async (e) => {
    e.preventDefault();

    setCreateMsg(""); // Clear any previous messages

    if (!Number(amount)) {
      setCreateMsg("Amount must be a number");
      return;
    }

    const selectedType = document.querySelector("#transactionType").value;
    const selectedTag = document.querySelector("#transactionTag").value;

    const formData = {
      date,
      amount: Number(amount),
      type: selectedType,
      tag: selectedTag,
      remark,
      userid: JSON.parse(localStorage.getItem("lastUserInfo"))._id,
    };

    try {
      const response = await fetch(`${csURL}api/account/add`, {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (response.ok) {
        const data = await response.text();
        console.log(data);
        // location.reload();
      } else {
        setCreateMsg("Error creating transaction.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setCreateMsg("Error creating transaction.");
    }
  };

  return (
    <div className="createAndSearch">
      <h4>Create transaction</h4>
      <form>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          name="date"
          placeholder="Date"
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          name="amount"
          placeholder="Amount"
        />
        <select id="transactionType" name="type">
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <select id="transactionTag" name="tag">
          <option value="Default">Default</option>
        </select>
        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          name="remark"
          placeholder="Remark"
        />
        <button type="submit" onClick={submitCreate}>
          Create
        </button>
      </form>
      <p>{createMsg}</p>
    </div>
  );
}

export default CreateComp;
