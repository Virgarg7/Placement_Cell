import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  EuiButton,
  EuiFormRow,
  EuiFlexItem,
  EuiFlexGrid,
  EuiSpacer,
  EuiSelect,
  EuiPanel,
} from "@elastic/eui";
import SidebarNew from "../sidebar/SidebarNew";
import Header from "../header";

function UpdateStream(props) {
  const history = useHistory();

  const degreeOptions = [
    { value: "B.Tech", text: "B.Tech" },
    { value: "M.Tech", text: "M.Tech" },
    { value: "MCA", text: "MCA" },
  ];

  const semOptions = [
    { value: 1, text: 1 },
    { value: 2, text: 2 },
    { value: 3, text: 3 },
    { value: 4, text: 4 },
    { value: 5, text: 5 },
    { value: 6, text: 6 },
    { value: 7, text: 7 },
    { value: 8, text: 8 },
  ];

  const majorOptions = [
    { value: "CSE", text: "CSE" },
    { value: "IT", text: "IT" },
    { value: "EC", text: "EC" },
  ];

  const [data, setData] = useState({
    degree: "",
    major: "",
    sem: "",
  });

  useEffect(() => {
    const getData = async () => {
      let response = await fetch(
        `http://localhost:6700/stream/${props.match.params.id}`
      );
      response = await response.json();
      if (response.statusCode === 200) setData(response.data);
      console.log(response);
    };
    getData();
  }, [props.match.params.id]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    let response = await fetch(
      `http://localhost:6700/stream/${props.match.params.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ ...data }),
        headers: { "content-type": "application/json" },
      }
    );
    response = await response.json();
    if (response.statusCode === 200) {
      history.push("/allStreams");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <div>
        <SidebarNew current="streams" />
      </div>

      <div
        style={{
          margin: "1rem",
          width: "100%",
          maxWidth: "100vw",
          height: "100%",
        }}
      >
        {data && (<Header
          breadcrumbs={[
            { text: "Streams", href: "/admin/allStreams" },
            { text: "Update Stream" },
            { text: `${data.degree}-${data.major}-${data.sem}` },
          ]}
        />)}

        <EuiPanel style={{ height: "85%" }}>
          <EuiFlexGrid columns={3}>
            <EuiFlexItem>
              <EuiFormRow label="Degree">
                <EuiSelect
                  id="degree"
                  name="degree"
                  options={degreeOptions}
                  value={data.degree}
                  onChange={handleChange}
                  aria-label="Degree"
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="Major">
                <EuiSelect
                  id="major"
                  name="major"
                  options={majorOptions}
                  value={data.major}
                  onChange={handleChange}
                  aria-label="Major"
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="Sem">
                <EuiSelect
                  id="sem"
                  name="sem"
                  options={semOptions}
                  value={data.sem}
                  onChange={handleChange}
                  aria-label="Semester"
                />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGrid>
          <EuiSpacer size="l" />
          <EuiButton fill onClick={handleSubmit}>Update Stream</EuiButton>
        </EuiPanel>
      </div>
    </div>
  );
}

export default UpdateStream;
