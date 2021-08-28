import React, { useState, useEffect } from "react";
import {
  EuiPanel,
  EuiButton,
  EuiFormRow,
  EuiFilePicker,
  EuiSpacer,
  EuiSelect,
} from "@elastic/eui";
import SidebarNew from "../sidebar/SidebarNew";
import { useHistory } from "react-router-dom";
import Header from "../header";
import * as XLSX from "xlsx";

function CreatebulkUsers() {
  const history = useHistory();
  const [data, setData] = useState();

  const [streams, setStreams] = useState(undefined);

  useEffect(() => {
    const getStreams = async () => {
      let response = await fetch(`http://localhost:6700/stream/all`);
      response = await response.json();
      const allStreams = response.data.map((stream) => {
        return {
          value: stream._id,
          text: `${stream.degree}-${stream.major}-${stream.sem}`,
        };
      });
      setStreams(allStreams);
      setData({ ...data, stream: allStreams[0].value });
    };
    getStreams();
  }, [setData]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setData({ id: event.target.value });
  };

  const [csvData, setCSVData] = useState([]);

  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    setCSVData(list);
  };

  const handleFileUpload = (e) => {
    const file = e[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    const mainData = [];
    csvData.forEach((dt) => mainData.push({ ...dt, stream: data.id }));
    console.log(mainData);
    const sendData = {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(mainData),
    };
    let response = await fetch("http://localhost:6700/student/bulk", sendData);
    response = await response.json();
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
        <Header
          breadcrumbs={[
            { text: "Students", href: "/admin/allStudents" },
            { text: "Add Bulk Students" },
          ]}
        />

        <EuiPanel style={{ height: "85%" }}>
          <EuiFormRow label="Add .csv File">
            <EuiFilePicker
              id="file"
              initialPromptText="Select or drag and drop .csv File"
              name="file"
              onChange={handleFileUpload}
            />
          </EuiFormRow>

          <EuiFormRow label="Stream">
            <EuiSelect
              id="stream"
              name="stream"
              options={streams}
              onChange={handleChange}
              aria-label="Stream"
            />
          </EuiFormRow>
          <EuiSpacer size="l" />
          <EuiButton onClick={handleSubmit}>Add Users</EuiButton>
        </EuiPanel>
      </div>
    </div>
  );
}

export default CreatebulkUsers;
