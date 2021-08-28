import React, { useState, useEffect } from "react";
import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiPageBody,
  EuiConfirmModal,
} from "@elastic/eui";
import { useHistory } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
function Dashboard() {
  const history = useHistory();
  const [busy, setBusy] = useState(true);
  return (
    <EuiPage
      paddingSize="l"
      style={{
        height: "100vh",
        overflowX: "hidden",
        overflowY: "hidden",
        // margin: 0,
        // padding: 0,
      }}
    >
      <EuiPageSideBar>
        <Sidebar />
      </EuiPageSideBar>
      <EuiPageBody>
        <EuiPageHeader
          iconType="logoElastic"
          pageTitle="Create New Users"
          // rightSideItems={}
        />
        <EuiPageContent
          hasShadow={true}
          paddingSize="l"
          color="transparent"
          borderRadius="none"
        >
          <EuiPageContentBody>asd </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}

export default Dashboard;
