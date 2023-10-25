import React from "react";
import HeaderComp from "./HeaderComp";
import SideBarComp from "./SideBarComp";
import UserData from "./UserData";
import ChartComp from "./ChartComp";
import { Route, Routes } from "react-router-dom";

function MainPage() {
  return (
    <div className="mainPage">
      <header>
        <HeaderComp />
      </header>
      <section className="mainBody">
        <div className="container">
          <div className="mainContent">
            <aside>
              <SideBarComp />
            </aside>
            <div className="userData">
              <Routes>
                <Route path="/userdata/:id" element={<UserData />} />
                <Route path="/report/:id" element={<ChartComp />} />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainPage;
