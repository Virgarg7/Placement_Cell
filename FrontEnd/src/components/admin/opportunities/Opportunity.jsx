import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiMarkdownEditor,
  EuiText,
  EuiSpacer,
} from "@elastic/eui";
import { Badge } from "reactstrap";
import "./custom.scss";
function Opportunity({ data }) {
  console.log(data);
  const history = useHistory();
  const basicData = [
    {
      title: "Preplacement Talk",
      meta: (
        <Badge color="light-primary" pill>
          26-04-2021
        </Badge>
      ),
    },
    {
      title: "Apptitude Test",
      meta: (
        <Badge color="light-primary" pill>
          26-04-2021
        </Badge>
      ),
      color: "secondary",
    },
    {
      title: "Interview Round 1",
      meta: (
        <Badge color="light-primary" pill>
          27-04-2021
        </Badge>
      ),
      color: "success",
    },
    {
      title: "HR Round",
      meta: (
        <Badge color="light-primary" pill>
          29-04-2021
        </Badge>
      ),
      color: "warning",
    },
    {
      title: "Final Selections",
      meta: (
        <Badge color="light-primary" pill>
          01-05-2021
        </Badge>
      ),
      color: "danger",
    },
  ];
  return (
    <>
      <EuiPanel style={{ marginTop: "1rem" }}>
        <EuiFlexGroup justifyContent="flexStart" alignItems="flexStart">
          <EuiFlexItem>
            <h4 className="opportunity-panel-title">{data.companyName}</h4>
            <h5 style={{ color: "black", fontWeight: "bold" }}>
              {data.roleName}
            </h5>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <span
              style={{
                backgroundColor: "#3f37c942",
              }}
              className="opportunity-main-panel-tag"
            >
              Posted At : {moment(data.postedAt).format("DD/MM/YYYY")}
            </span>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <span
              style={{
                backgroundColor: "#7bf1a842",
              }}
              className="opportunity-main-panel-tag"
            >
              CTC : {data.CTC}
            </span>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <span
              style={{
                backgroundColor: "#e6394642",
              }}
              className="opportunity-main-panel-tag"
            >
              Registration Ends On :{" "}
              {moment(data.registrationLastDate).format("DD/MM/YYYY")}
            </span>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <span
              style={{
                backgroundColor: "#69a3ff",
              }}
              className="opportunity-main-panel-tag"
              onClick={() => {
                history.replace(`/admin/applicants/${data._id}`);
              }}
            >
              {data.applicants.length} Applicants
            </span>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
        <hr />
        <EuiText>
          <h4 className="opportunity-panel-title">Description</h4>
        </EuiText>
        <EuiSpacer />
  
        <EuiMarkdownEditor
          style={{ width: "100%", minWidth: "100%" }}
          value={data.description}
          onChange={() => alert("Description can not change")}
          initialViewMode="viewing"
        />
      </EuiPanel>

      <EuiPanel style={{ marginTop: "1rem" }}>
        <EuiText>
          <h4 className="opportunity-panel-title">Eligible Streams</h4>
        </EuiText>
        <EuiSpacer />
        <EuiText>
          {data.eligibleStreams.map((stream, index) => {
            return (
              <p key={index}>
                {stream.degree}-{stream.major}-{stream.sem}
              </p>
            );
          })}
        </EuiText>
      </EuiPanel>

      <EuiPanel style={{ marginTop: "1rem" }}>
        <EuiText>
          <h4 className="opportunity-panel-title">Eligibility Criteria</h4>
        </EuiText>
        <EuiSpacer />
        <EuiText>
          <p>{data.eligibilityCriteria}</p>
        </EuiText>
      </EuiPanel>

      {data.selectionProcess.length > 0 && (
        <EuiPanel style={{ marginTop: "1rem" }}>
          <EuiText>
            <h4 style={{ color: "#045F9D", fontWeight: "bold" }}>
              Selection Process
            </h4>
          </EuiText>
          <EuiSpacer />
          {data.selectionProcess.map((process,index)=>{
            return(
                  <EuiText key={index}>
                    <h4>
                      {process.name} {process.selected.length > 0 && (<a href={`http://localhost:3000/admin/opportunity/${data._id}/selectionProcess/${process._id}/selected`}>- {process.selected.length} selected </a>)}
                    </h4>
                  </EuiText>
               
            )
          })}
        </EuiPanel>
      )}

      {data.attachments.length > 0 && (
        <EuiPanel style={{ marginTop: "1rem" }}>
          <EuiText>
            <h4 style={{ color: "#045F9D", fontWeight: "bold" }}>
              Attachments
            </h4>
          </EuiText>
          <EuiSpacer />
        </EuiPanel>
      )}

      {data.placedStudents.length > 0 && (
        <EuiPanel style={{ marginTop: "1rem" }}>
          <EuiText>
            <h4 style={{ color: "#045F9D", fontWeight: "bold" }}>
              Placed Students
            </h4>
          </EuiText>      
          <EuiSpacer />
          {data.placedStudents.map((student,index)=>{
            return(
                  <EuiText key={index}>
                    <h4>
                      {student.firstName} {student.lastName} - {student.email}
                    </h4>
                  </EuiText>
               
            )
          })}
        </EuiPanel>
      )}
    </>
  );
}

export default Opportunity;
