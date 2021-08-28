import React from "react";
import SidebarNew from "../sidebar/SidebarNew";
import Header from "../header";

function addOpportunities() {
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
        <SidebarNew />
      </div>
      <div
        className="main-container"
        style={{ margin: "1rem", width: "100%", maxWidth: "100vw" }}
      >
        <Header />
        //Add Code From Here
      </div>
    </div>
  );
}

export default addOpportunities;
