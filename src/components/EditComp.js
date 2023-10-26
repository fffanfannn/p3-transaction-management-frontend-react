import React, { useState } from "react";
import store_csrul from "../redux/store_csurl";

function EditComp({ listData }) {
  const csURL = store_csrul.getState().csURL;

  const [date, setDate] = useState(listData.date);
  const [selectedType, setSelectedType] = useState(listData.type);
  const [createMsg, setCreateMsg] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [selectedTag, setSelectedTag] = useState(listData.tag);

  const submitUpdate = async (e) => {
    e.preventDefault();
    setCreateMsg("");

    if (!Number(amount)) {
      setCreateMsg("Amount must be a number");
      return;
    }

    const formData = {
      date,
      amount: Number(amount),
      type: selectedType,
      tag: selectedTag,
      remark,
    };

    try {
      const response = await fetch(`${csURL}api/account/edit/${listData._id}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (response.ok) {
        const data = await response.text();
        console.log(data);
      } else {
        setCreateMsg("Error updating transaction.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setCreateMsg("Error updating transaction.");
    }
  };

  return (
    <div className="createAndSearch">
      <h4>Edit transaction</h4>
      <form>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          name="date"
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          name="amount"
          placeholder={listData.amount}
        />
        <select
          id="transactionType"
          name="type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <select
          id="transactionTag"
          name="tag"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="Default">Default</option>
        </select>
        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          name="remark"
          placeholder={listData.remark}
        />
        <button type="submit" onClick={submitUpdate}>
          Update
        </button>
      </form>
      <p>{createMsg}</p>
    </div>
  );
}

export default EditComp;
