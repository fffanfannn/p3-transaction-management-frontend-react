import React from "react";

function DetailsComp({ listData }) {
  return (
    <div className="itemDetail">
      <h4>Transaction Detail</h4>
      <p>Date: {listData.date}</p>
      <p>Amount: {listData.amount}</p>
      <p>Type: {listData.type}</p>
      <p>Tag: {listData.tag}</p>
      <p>Remark: {listData.remark}</p>
    </div>
  );
}

export default DetailsComp;
