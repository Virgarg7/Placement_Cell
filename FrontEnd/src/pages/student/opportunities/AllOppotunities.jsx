import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldSearch,
} from "@elastic/eui";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header";
import OpportunityTile from "./GeneralOpportunityTile";
const AllOppotunities = (props) => {
  const history = useHistory();

  const [data, setData] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("http://localhost:6700/opportunity/all");
      response = await response.json();
      if (response.statusCode === 200) {
        setData(response.data);
      } else {
        alert(response.error);
        history.push("/dashboard");
        return;
      }
    };
    fetchData();
  }, [history]);
  const onChange = async (event) => {
    let response = await fetch(
      `http://localhost:6700/opportunity/search?term=${event.target.value}`
    );
    response = await response.json();
    if (response.statusCode === 200) {
      setData(response.data);
    } else {
      alert(response.error);
      history.push("/dashboard");
      return;
    }
  };
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
        <Sidebar/>
      </div>
      <div
        className="main-container"
        style={{ margin: "1rem", width: "100%", maxWidth: "100vw" }}
      >
        <Header
          breadcrumbs={[
            {
              text: "Opportunities",
            },
            {
              text: "All Opportunities",
            },
          ]}
        />
        <EuiPanel style={{ margin: "0.5rem 0" }}>
          <EuiFieldSearch
            onChange={onChange}
            fullWidth
            placeholder="Search Opportuniites"
          />
        </EuiPanel>
        {data &&
          data.length > 0 &&
          data.map((opportunity) => {
            return (
              <EuiFlexGroup justifyContent="center" alignItems="center">
                <EuiFlexItem>
                  <OpportunityTile
                    key={opportunity._id}
                    companyName={opportunity.companyName}
                    registrationEndMessage={opportunity.registrationEndMessage}
                    CTC={opportunity.CTC}
                    applicants={opportunity.applicants}
                    id={opportunity._id}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            );
          })}
      </div>
    </div>
  );
};

export default AllOppotunities;
