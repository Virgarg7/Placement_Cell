import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  EuiPanel,
  EuiButton,
  EuiFormRow,
  EuiFlexItem,
  EuiFlexGrid,
  EuiFieldText,
  EuiSpacer,
  EuiSelect,
} from "@elastic/eui";
import SidebarNew from "../sidebar/SidebarNew";
import Header from "../header";
function CreateUsers() {
  const history = useHistory();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    stream: "12",
  });

  const [streams, setStreams] = useState(undefined);

  useEffect(() => {
    const getStreams = async () => {
      let response = await fetch(`http://localhost:6700/stream/all`);
      response = await response.json();
      if (response.statusCode !== 200) {
        alert("Something went wrong... Please try again");
        history.push("/allUsers");
        return;
      }
      const allStreams = response.data.map((stream) => {
        return {
          value: stream._id,
          text: `${stream.degree}-${stream.major}-${stream.sem}`,
        };
      });
      setStreams(allStreams);
    };
    getStreams();
  }, [history]);

  const handleChange = (event) => {
    console.log("s",data);
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    console.log("Data", data);
    let response = await fetch("http://localhost:6700/student", {
      method: "POST",
      body: JSON.stringify({ ...data }),
      headers: { "content-type": "application/json" },
    });
    response = await response.json();
    console.log("response",response);
    if (response.statusCode === 200) {
      history.push("/admin/allStudents");
    } else {
      alert(response.error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <div>
        <SidebarNew current="userManagement" />
      </div>

      <div
        style={{
          margin: "1rem",
          width: "100%",
          maxWidth: "100vw",
          height: "100%",
        }}
      >
        <Header breadcrumbs={[
          { text: "Students", href: "/admin/allStudents" },
          { text: "Add Student" }
          ]} />

        <EuiPanel style={{ height: "85%" }}>
          <EuiFlexGrid columns={3}>
            <EuiFlexItem>
              <EuiFormRow label="First Name">
                <EuiFieldText
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="Second Name">
                <EuiFieldText
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="Email Address">
                <EuiFieldText
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="Stream">
                <EuiSelect
                  id="stream"
                  name="stream"
                  options={streams}
                  value={data.stream}
                  onChange={handleChange}
                  aria-label="Stream"
                />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGrid>
          <EuiSpacer size="l" />
          {/* <EuiButton onClick={handleSubmit}>Update User</EuiButton> */}
          <EuiFlexGrid>
            <EuiFlexItem>
              <EuiButton fill onClick={handleSubmit}>Add Student</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiButton fill onClick={() => history.push("addBulkStudents")}>
                Add Bulk Students
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGrid>
        </EuiPanel>
      </div>
    </div>
  );
}
export default CreateUsers;
