import React from "react";
import Sidebar from "../sidebar/Sidebar";

import Header from "../header";
import Charts from "./Charts";
import BranchWiseChart from "./BranchWiseChart";

function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100vw",
        maxWidth: "100%",
      }}
    >
      <div>
        <Sidebar current="dashboard" />
      </div>
      <div
        className="main-container"
        style={{ margin: "1rem", width: "100%", maxWidth: "100vw" }}
      >
        <Header breadcrumbs={[{ text: "Dashboard" }]} />
        <Charts />
        <div
          style={{ display: "flex", margin: "0.4rem 0 0 0", maxHeight: "55vh" }}
        >
          <BranchWiseChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
