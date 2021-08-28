import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldSearch,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiGlobalToastList,
  EuiButton,
  EuiSelect,
} from "@elastic/eui";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header";
import OpportunityTile from "./OpportunityTile";
const EligibleOpportunities = () => {
  const history = useHistory();
  const [resumes, setResumes] = useState(undefined);
  const [selectedResume, setSelectedResume] = useState(undefined);
  const [data, setData] = useState(undefined);
  const onSelectedResumeChange = (event) => {
    console.log(event.target.value);
    setSelectedResume(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        `http://localhost:6700/student/${localStorage.getItem(
          "placement-tracker-student-id"
        )}/opportunities`
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
    fetchData();
    const fetchResumes = async () => {
      let response = await fetch(
        `http://localhost:6700/student/${localStorage.getItem(
          "placement-tracker-student-id"
        )}/resumes/`
      );
      response = await response.json();
      const newArray = [];
      response.data.forEach((dt) =>
        newArray.push({ text: dt.name, value: dt.id })
      );
      setResumes(newArray);
      setSelectedResume(response.data[0].id);
    };
    fetchResumes();
  }, [history]);

  const applyToOpportunity = async () => {
    const sendData = {
      body: JSON.stringify({
        studentId: localStorage.getItem("placement-tracker-student-id"),
        resumeId: selectedResume,
      }),
      method: "POST",
      headers: { "content-type": "application/json" },
    };
    let response = await fetch(
      `http://localhost:6700/opportunity/${modalId}/apply
    `,
      sendData
    );
    response = await response.json();
    if (response.statusCode === 200) {
      setData(response.data);
      addToastHandler(toApplyOpportunityName);
    } else {
      alert(response.error);
    }
    closeModal();
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalId, setModalId] = useState(undefined);
  const [toApplyOpportunityName, setToApplyOpportunityName] =
    useState(undefined);
  const closeModal = () => setIsModalVisible(false);
  const showModal = async (id, name) => {
    setModalId(id);
    setToApplyOpportunityName(name);

    //get student resumes

    setIsModalVisible(true);
  };

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>Select Resume To Send</h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiSelect options={resumes} onChange={onSelectedResumeChange} />
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={closeModal} fill color="danger">
            Close
          </EuiButton>
          <EuiButton fill onClick={applyToOpportunity}>
            Apply
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }
  const [toasts, setToasts] = useState([]);
  const addToastHandler = (opportunityName) => {
    const toast = {
      title: `Successfully Applied to ${opportunityName}`,
      color: "success",
    };
    setToasts(toasts.concat(toast));
  };

  const removeToast = (removedToast) => {
    setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
  };
  const onChange = async (event) => {
    let response = await fetch(
      `http://localhost:6700/student/${localStorage.getItem(
        "placement-tracker-student-id"
      )}/opportunities/search?term=${event.target.value}`
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
        <Sidebar current="opportunity" />
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
              text: "Eligible Opportunities",
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
                    applied={opportunity.applied}
                    registrationAllowed={opportunity.registrationAllowed}
                    openModal={showModal}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            );
          })}
        {modal}
      </div>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
    </div>
  );
};

export default EligibleOpportunities;
