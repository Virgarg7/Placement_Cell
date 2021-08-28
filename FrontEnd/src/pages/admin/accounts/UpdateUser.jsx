import React, { useState, useEffect } from "react";
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
import { useHistory } from "react-router-dom";
import Header from "../header";
function UpdateUser(props) {
  const history = useHistory();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    stream: "",
  });

  const [streams, setStreams] = useState(undefined);

  useEffect(() => {
    const getStreams = async () => {
      let response = await fetch(`http://localhost:6700/stream/all`);
      response = await response.json();
      if (response.statusCode !== 200) {
        alert("Something went wrong... Please try again");
        history.push("/admin/allStudents");
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

  useEffect(() => {
    const getData = async () => {
      let response = await fetch(
        `http://localhost:6700/student/${props.match.params.id}`
      );
      response = await response.json();
      if (response.statusCode === 200) setData(response.data);
      else {
        alert(response.error);
        history.push("/admin/allStudents");
        return;
      }
    };
    getData();
  }, [props.match.params.id, history]);
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = async () => {
    let response = await fetch(
      `http://localhost:6700/student/${props.match.params.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ ...data }),
        headers: { "content-type": "application/json" },
      }
    );
    response = await response.json();
    if (response.statusCode === 200) {
      history.push("/admin/allStudents");
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
        {data && (<Header breadcrumbs={[{ text: "Students", href: "/admin/allStudents" },{ text: "Update Student" },{ text: data.email }]} />)}

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
          <EuiButton fill onClick={handleSubmit}>Update Student</EuiButton>
        </EuiPanel>
      </div>
    </div>
  );
}

export default UpdateUser;
