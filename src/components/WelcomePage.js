import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
// import Register from "./Register";
// import Login from "./Login";
import background_image from "../bg-3.jpg";

function WelcomePage() {
  const [data, setData] = useState([
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
      setData((prevData) => {
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

  const [data1, setData1] = useState([
    { value: 326, name: "Mon" },
    { value: 175, name: "Tue" },
    { value: 60, name: "Wed" },
    { value: 47, name: "Thur" },
    { value: 245, name: "Fri" },
    { value: 125, name: "Sat" },
    { value: 50, name: "Sun" },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData1((prevData) => {
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
    legend: {},
    xAxis: {
      data: data.map((d) => d.name),
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
        data: data.map((d) => d.value),
        itemStyle: {
          normal: {
            barBorderColor: "rgb(25, 183, 207, 0.7)",
            color: "rgb(25, 183, 207, 0.7)",
          },
        },
      },
      {
        name: "Expense",
        type: "line",
        smooth: true,
        areaStyle: {},
        data: data1.map((d) => d.value),
        itemStyle: {
          normal: {
            barBorderColor: "rgb(245, 140, 143, 0.7)",
            color: "rgb(245, 140, 143, 0.7)",
          },
        },
      },
    ],
  };

  return (
    <div>
      <section className="welcomeHeader">
        <div className="container">
          <div className="headerContent">
            <div className="logo">Transaction Management</div>
            <div>
              <Link to="/register">Sign up</Link>
              <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </section>
      <section
        className="welcomePage"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.116), rgba(0, 0, 0, 0.075)), url(${background_image})`,
        }}
      >
        <div className="container">
          <div className="pageContent">
            <div className="leftdiv">
              <h1>Your Transaction Report</h1>
              <ReactEcharts option={option1} className="echart" />
            </div>
            <div className="rightdiv">
              <Routes>
                {/* <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
