import React, { useState, useEffect } from "react";
import store_csrul from "../redux/store_csurl";
import ReactEcharts from "echarts-for-react";

function ChartComp() {
  const userInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
  const userInfoID = JSON.parse(localStorage.getItem("lastUserInfo"))._id;
  const csURL = store_csrul.getState().csURL;

  const [reportData, setReportData] = useState([]);
  const [dataNote, setDataNote] = useState([]);
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${csURL}api/account/user/${userInfoID}`);
      const data = await response.json();
      if (data.msg) {
        setDataNote("Please create new data");
      } else {
        console.log(data);
        setReportData(data);
        console.log("reportData", reportData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  reportData.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  console.log("reportDatabydate", reportData);
  let incomeArray = reportData.filter((user) => user.type === "Income");
  let expenseArray = reportData.filter((user) => user.type === "Expense");
  let incomeAmount = incomeArray.reduce(
    (total, user) => total + user.amount,
    0
  );

  let expenseAmount = expenseArray.reduce(
    (total, user) => total + user.amount,
    0
  );

  let balanceAmount = incomeAmount - expenseAmount;

  const option6 = {
    animationDuration: 2000,
    title: {
      text: "Amount by Date",
    },

    yAxis: {
      data: [],
    },
    xAxis: {
      type: "value",
    },
    series: [
      {
        name: "By date",
        type: "bar",
        itemStyle: {
          normal: {
            barBorderColor: "rgb(25, 183, 207)",
            color: "rgb(25, 183, 207)",
          },
        },
        data: [],
      },
    ],
  };

  option6.yAxis.data = reportData.map((user) => user.date);
  option6.series[0].data = reportData.map((user) => {
    if (user.type === "Income") {
      return user.amount;
    } else {
      return -user.amount;
    }
  });

  const option7 = {
    animationDuration: 2000,
    title: {
      text: "Income/Expense Line",
    },
    legend: { left: "right" },
    xAxis: {
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Income",
        type: "line",
        smooth: true,
        areaStyle: {},
        data: [],
        markPoint: {
          data: [{ type: "max", name: "max" }],
        },
        itemStyle: {
          normal: {
            barBorderColor: "rgb(25, 183, 207)",
            color: "rgb(25, 183, 207)",
          },
        },
      },
      {
        name: "Expense",
        type: "line",
        smooth: true,
        areaStyle: {},
        data: [],
        markPoint: {
          data: [{ type: "max", name: "max" }],
        },
        itemStyle: {
          normal: {
            barBorderColor: "rgb(245, 140, 143)",
            color: "rgb(245, 140, 143)",
          },
        },
      },
    ],
  };

  option7.xAxis.data = reportData.map((user) => user.date);
  option7.series[0].data = reportData.map((user) => {
    if (user.type === "Income") {
      return user.amount;
    } else {
      return 0;
    }
  });
  option7.series[1].data = reportData.map((user) => {
    if (user.type === "Expense") {
      return user.amount;
    } else {
      return 0;
    }
  });

  const option5 = {
    animationDuration: 3000,
    title: {
      text: "Income/Expense Total Pie",
    },
    legend: {
      orient: "vertical",
      left: "right",
    },

    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        data: [],
        color: ["rgb(25, 183, 207)", "rgb(245, 140, 143)"],
      },
    ],
  };

  option5.series[0].data = [
    { value: incomeAmount, name: "Income" },
    { value: expenseAmount, name: "Expense" },
  ];

  const [sampleData1, setSampleData1] = useState([
    { value: 150, name: "Mon" },
    { value: 185, name: "Tue" },
    { value: 245, name: "Wed" },
    { value: 147, name: "Thur" },
    { value: 130, name: "Fri" },
    { value: 105, name: "Sat" },
    { value: 126, name: "Sun" },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSampleData1((prevData) => {
        return prevData.map((item) => ({
          ...item,
          value: Math.random() * 100,
        }));
      });
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [sampleData2, setSampleData2] = useState([
    { value: 50, name: "Mon" },
    { value: 125, name: "Tue" },
    { value: 245, name: "Wed" },
    { value: 147, name: "Thur" },
    { value: 260, name: "Fri" },
    { value: 105, name: "Sat" },
    { value: 326, name: "Sun" },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSampleData2((prevData) => {
        return prevData.map((item) => ({
          ...item,
          value: Math.random() * 100,
        }));
      });
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const option1 = {
    title: {
      text: "Sample Chart",
    },
    legend: {},
    xAxis: {
      data: sampleData1.map((d) => d.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        smooth: true,
        areaStyle: {},
        data: sampleData1.map((d) => d.value),
        itemStyle: {
          normal: {
            barBorderColor: "rgb(25, 183, 207, 0.7)",
            color: "rgb(25, 183, 207, 0.7)",
          },
        },
      },
      {
        type: "line",
        smooth: true,
        areaStyle: {},
        data: sampleData2.map((d) => d.value),
        itemStyle: {
          normal: {
            barBorderColor: "rgb(245, 140, 143, 0.7)",
            color: "rgb(245, 140, 143, 0.7)",
          },
        },
      },
    ],
  };

  const option2 = {
    title: {
      text: "Sample Chart",
      left: "center",
    },

    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        type: "pie",
        data: sampleData1.map((d) => ({
          value: d.value,
          name: d.name,
        })),
        radius: ["20%", "70%"],
        roseType: "area",
      },
    ],
  };

  return (
    <div className="reportPage">
      <h4>{userInfo.name} transaction report</h4>
      <p className="noteInfo">{dataNote}</p>
      {userInfo.isVip ? (
        <div>
          <p>Total Income: ${incomeAmount}</p>
          <p>Total Expense: ${expenseAmount}</p>
          <p>My Balance: ${balanceAmount}</p>
          <div className="allecharts">
            <div>
              <ReactEcharts option={option6} className="echart" />
              <ReactEcharts option={option7} className="echart" />
            </div>
            <div>
              <ReactEcharts option={option5} className="echart" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="noteInfo">Please join us as a VIP user</p>
          <ReactEcharts option={option1} className="echart" />
          <ReactEcharts option={option2} className="echart" />
        </div>
      )}
    </div>
  );
}

export default ChartComp;
