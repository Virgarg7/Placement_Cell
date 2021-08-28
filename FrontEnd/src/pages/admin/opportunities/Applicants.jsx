import React from "react";
import Header from "../header";
import SidebarNew from "../sidebar/SidebarNew";
import { EuiPanel } from "@elastic/eui";
function Applicants() {
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
        <SidebarNew current="opportunity" />
      </div>
      <div
        className="main-container"
        style={{ margin: "1rem", width: "100%", maxWidth: "100vw" }}
      >
        <Header breadcrumbs={[{ text: "Applicants" }]} />
        <EuiPanel></EuiPanel>
      </div>
    </div>
  );
}

export default Applicants;
