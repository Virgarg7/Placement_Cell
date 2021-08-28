import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldSearch,
  EuiConfirmModal,
  EuiModal,
  EuiModalHeader,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeaderTitle,
  EuiButton,
  EuiFieldText,
  EuiFormRow,
  EuiMarkdownEditor,
} from "@elastic/eui";
import SidebarNew from "../sidebar/SidebarNew";
import Header from "../header";
import OpportunityTile from "../../../components/admin/opportunities/OpportunityTile";
const AllOppotunities = (props) => {
  const history = useHistory();

  const [isDestroyModalVisible, setIsDestroyModalVisible] = useState(false);
  const [currentDeleteId, setcurrentDeleteId] = useState(null);

  const handleDelete = async () => {
    let response = await fetch(
      `http://localhost:6700/opportunity/${currentDeleteId}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    response = await response.json();

    if (response.statusCode === 200) {
      console.log(response.data);
      // setRowData(response.data);
      closeDestroyModal();
    } else {
      closeDestroyModal();
    }
  };

  const closeDestroyModal = () => {
    setcurrentDeleteId(null);
    setIsDestroyModalVisible(false);
  };
  const showDestroyModal = (id) => {
    setIsDestroyModalVisible(true);
    setcurrentDeleteId(id);
  };

  let destroyModal;

  if (isDestroyModalVisible) {
    destroyModal = (
      <EuiConfirmModal
        title="Are you sure you want to delete the Opportunity"
        onCancel={closeDestroyModal}
        onConfirm={handleDelete}
        cancelButtonText="No, don't delete it"
        confirmButtonText="Yes, delete it"
        buttonColor="danger"
        defaultFocusedButton="confirm"
      ></EuiConfirmModal>
    );
  }

  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentUpdateId, setCurrentUpdateId] = useState(undefined);
  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
  };
  const showUpdateModal = (id) => {
    setIsUpdateModalVisible(true);
    setCurrentUpdateId(id);
  };

  let updateModal;

  if (isUpdateModalVisible) {
    updateModal = (
      <EuiConfirmModal
        title="Are you sure you want to Update the Opportunity"
        onCancel={closeUpdateModal}
        onConfirm={() => history.push(`UpdateOpportunities/${currentUpdateId}`)}
        cancelButtonText="No, don't update it"
        confirmButtonText="Yes, update it"
        buttonColor="primary"
        defaultFocusedButton="confirm"
      ></EuiConfirmModal>
    );
  }

  const [mailModal, setmailModal] = useState(false);
  const [currentMailId, setCurrentMailId] = useState(undefined);
  const [currentMailOpportunityName, setCurrentMailOpportunityName] =
    useState(undefined);
  const [mailModalSubject, setMailModalSubject] = useState("");
  const [mailModalBody, setMailModalBody] = useState("");

  const showSendMailModal = (id, name) => {
    setCurrentMailId(id);
    setCurrentMailOpportunityName(name);
    setmailModal(true);
  };

  const closeSendMailModal = () => {
    setmailModal(false);
  };

  const sendMail = async () => {
    const mailDataToSend = {
      subject: mailModalSubject,
      body: mailModalBody,
    };

    let response = await fetch(
      `http://localhost:6700/opportunity/${currentMailId}/sendEmail`,
      {
        method: "POST",
        body: JSON.stringify({ ...mailDataToSend }),
        headers: { "content-type": "application/json" },
      }
    );
    response = await response.json();
    closeSendMailModal();
  };

  let sendMailModal;

  if (mailModal) {
    sendMailModal = (
      <EuiModal
        onClose={closeSendMailModal}
        initialFocus="[name=popswitch]"
        style={{ width: "100%", height: "100%" }}
      >
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            Send mail to the applicants of the {currentMailOpportunityName}
          </EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiFormRow label="Subject">
            <EuiFieldText
              placeholder="Subject is needed to send Email"
              fullWidth
              name="subject"
              onChange={(event) => setMailModalSubject(event.target.value)}
            />
          </EuiFormRow>
          <EuiFormRow>
            <EuiMarkdownEditor
              style={{ width: "100%", minWidth: "100%" }}
              onChange={setMailModalBody}
              name="body"
              value={mailModalBody}
            />
          </EuiFormRow>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton color="danger" fill onClick={closeSendMailModal}>
            Cancel
          </EuiButton>
          <EuiButton color="secondary" fill onClick={sendMail}>
            Send Mail
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }

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
        <SidebarNew current="opportunity" />
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
                    showDestroyModal={showDestroyModal}
                    showSendMailModal={showSendMailModal}
                    showUpdateModal={showUpdateModal}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            );
          })}
      </div>
      {destroyModal}
      {updateModal}
      {sendMailModal}
    </div>
  );
};

export default AllOppotunities;
