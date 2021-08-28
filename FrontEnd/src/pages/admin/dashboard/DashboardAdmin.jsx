import React, { useState, useEffect } from "react";
import SidebarNew from "../sidebar/SidebarNew";

import Header from "../header";
import Charts from "./Charts";
import BranchWiseChart from "./BranchWiseChart";

function DashboardAdmin() {
  const [busy, setBusy] = useState(true);
  const [data, setData] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(`http://localhost:6700/admin/dashboard`);
      response = await response.json();
      setData(response.data);
      setBusy(false);
    };
    fetchData();
  }, []);
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
        <SidebarNew current="dashboard" />
      </div>
      <div
        className="main-container"
        style={{ margin: "1rem", width: "100%", maxWidth: "100vw" }}
      >
        <Header breadcrumbs={[{ text: "Dashboard" }]} />
        {!busy && (
          <>
            <Charts data={data} />
            <div
              style={{
                display: "flex",
                margin: "0.4rem 0 0 0",
                maxHeight: "55vh",
              }}
            >
              <BranchWiseChart data={data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardAdmin;
