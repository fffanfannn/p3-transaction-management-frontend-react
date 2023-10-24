import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import WelcomePage from "../components/WelcomePage";
import MainPage from "../components/MainPage";
import UserData from "../components/UserData";
import ChartComp from "../components/ChartComp";
import AdminData from "../components/AdminData";
import Register from "../components/Register";
import Login from "../components/Login";

function RouterIndex() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<WelcomePage />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="main" element={<MainPage />}>
          {/* <Route path="account" element={<UserPage />} /> */}
          <Route path="userdata/:id" element={<UserData />} />
          <Route path="report/:id" element={<ChartComp />} />
        </Route>
        <Route path="/admin" element={<AdminData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterIndex;
