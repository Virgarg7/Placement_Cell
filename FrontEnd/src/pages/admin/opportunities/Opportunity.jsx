import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SidebarNew from "../sidebar/SidebarNew";
import Header from "../header";
import SingleOpportunity from "../../../components/admin/opportunities/Opportunity";

function Opportunity(props) {
  const history = useHistory();
  const [data, setData] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      console.log(props.match.params.id);
      let response = await fetch(
        `http://localhost:6700/opportunity/${props.match.params.id}`
      );
      response = await response.json();
      console.log(response);
      if (response.statusCode === 200) {
        setData(response.data);
      } else {
        alert(response.error);
        history.push("/dashboard");
        return;
      }
    };
    fetchData();
  }, [history, props.match.params.id]);
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
        {data &&  (<Header
          breadcrumbs={[
            {
              text: "Opportunities",
              onClick: () => history.push("/admin/allOpportunities"),
            },
            {
              text: data.companyName,
            },
          ]}
        />)}
        {console.log(data)}
        {data && <SingleOpportunity data={data}></SingleOpportunity>}
      </div>
    </div>
  );
}

export default Opportunity;
