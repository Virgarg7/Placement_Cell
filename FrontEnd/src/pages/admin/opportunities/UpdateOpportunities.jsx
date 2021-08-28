import React, { Fragment, useState, useEffect } from "react";
import SidebarNew from "../sidebar/SidebarNew";
import Header from "../header";
import { useHistory } from "react-router-dom";
import "./index.scss";

import {
  EuiFormRow,
  EuiComboBox,
  EuiPanel,
  EuiFlexGrid,
  EuiFlexItem,
  EuiDescribedFormGroup,
  EuiFieldText,
  EuiButton,
  EuiMarkdownEditor,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalFooter,
  EuiModalHeaderTitle,
  EuiDatePicker,
  EuiForm,
  EuiSpacer,
  EuiFlexGroup,
} from "@elastic/eui";
import moment from "moment";
import DraggableDataPanel from "./DraggableDataPanel";
import { htmlIdGenerator } from "@elastic/eui/lib/services";

function UpdateOpportunities(props) {
  const history = useHistory();

  const [mainData, setMainData] = useState({
    companyName: "",
    roleName: "",
    CTC: "",
    description: "",
    eligibleStreams: [],
    eligibilityCriteria: "",
    selectionProcess: [],
    registrationLastDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log(props.match.params.id);
      let response = await fetch(
        `http://localhost:6700/opportunity/${props.match.params.id}`
      );
      response = await response.json();
      console.log(response);
      if (response.statusCode === 200) {
        setMainData(response.data);
        console.log(response.data);
      } else {
        alert("Something went wrong...Please try again");
        history.push("/admin/allOpportunities");
        return;
      }
    };
    fetchData();
  }, [history, props.match.params.id]);

  const addOpportunity = async () => {
    const mainDataToSend = {
      ...mainData,
      description: markdownValue,
      selectionProcess: process,
    };

    let response = await fetch("http://localhost:6700/opportunity", {
      method: "POST",
      body: JSON.stringify({ ...mainDataToSend }),
      headers: { "content-type": "application/json" },
    });
    response = await response.json();
    if (response.statusCode === 200) {
      history.push("/admin/allOpportunities");
    }

    console.log(mainDataToSend);
  };
  const [registrationxDate, setReistrationxDate] = useState(moment());
  const registrationxDateChange = (date) => {
    setReistrationxDate(date);
    setMainData({ ...mainData, registrationLastDate: date.format("L") });
  };
  const [selectedOptions, setSelected] = useState();
  const [streams, setStreams] = useState([]);
  const [isSelectionModalVisible, setIsSelectionModalVisible] = useState(false);
  const closeSelectionModal = () => setIsSelectionModalVisible(false);
  const showSelectionModal = () => setIsSelectionModalVisible(true);
  const [isModal2Visible, setIsModal2Visibile] = useState(false);
  const closeModal2 = () => setIsModal2Visibile(false);
  const showModal2 = () => setIsModal2Visibile(true);
  const onChange = (selectedOptions) => {
    const ids = [];
    selectedOptions.forEach((option) => ids.push(option.value));
    setMainData({ ...mainData, eligibleStreams: ids });
    setSelected(selectedOptions);
  };

  const handleMainDataChange = (event) => {
    setMainData({ ...mainData, [event.target.name]: event.target.value });
  };

  const [markdownValue, setMarkdownValue] = useState("");
  const [process, setProcess] = useState([]);
  const [processDate, setProcessDate] = useState(moment());
  const [processData, setProcessData] = useState({
    name: "",
    date: "",
  });
  const handleChangeProcessDate = (date) => {
    setProcessDate(date);
    setProcessData({ ...processData, date: date.format("L") });
  };
  const handleChange = (event) => {
    setProcessData({ ...processData, [event.target.name]: event.target.value });
  };
  const makeId = htmlIdGenerator();

  const addData = () => {
    const copiedData = [...process];
    copiedData.push({ ...processData, id: makeId() });
    setProcess(copiedData);
    setProcessData({ name: "", processDate: "" });
    closeModal2();
  };

  useEffect(() => {
    const getStreams = async () => {
      let response = await fetch(`http://localhost:6700/stream/all`);
      response = await response.json();
      if(response.statusCode != 200 ){
        alert("Something went wrong...Please try again");
        history.push('/admin/allOpportunities');
        return ;
      }
      const allStreams = response.data.map((stream) => {
        return {
          value: stream._id,
          label: `${stream.degree}-${stream.major}-${stream.sem}`,
        };
      });
      setStreams(allStreams);
      // setData({ ...data, stream: allStreams[0].value });
      console.log(allStreams);
    };
    getStreams();
  }, []);

  const handleDelete = (id) => {
    const filteredProcess = process.filter((process) => process.id !== id);
    setProcess(filteredProcess);
  };

  const selectionForm = (
    <EuiForm>
      <EuiSpacer size="l" />
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiFormRow label="Process Name" fullWidth>
            <EuiFieldText
              onChange={handleChange}
              name="name"
              fullWidth
              value={processData.name}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Prcoess Date">
            <EuiDatePicker
              onChange={handleChangeProcessDate}
              selected={processDate}
              value={processData.date}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGrid>
    </EuiForm>
  );

  let modal2;
  if (isModal2Visible) {
    modal2 = (
      <EuiModal
        onClose={closeModal2}
        initialFocus="[name=popswitch]"
        style={{ width: "90vw", height: "50vh" }}
      >
        <EuiModalHeader>
          <EuiModalHeaderTitle>Add </EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{selectionForm}</EuiModalBody>

        <EuiModalFooter>
          <EuiButton fill color="danger" onClick={closeModal2}>
            Cancel
          </EuiButton>

          <EuiButton onClick={addData} fill>
            Save
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }
  let selctionProcessModal;

  if (isSelectionModalVisible) {
    selctionProcessModal = (
      <EuiModal
        onClose={closeSelectionModal}
        initialFocus="[name=popswitch]"
        style={{ width: "90vw", height: "50vh" }}
      >
        <EuiModalHeader>
          <EuiModalHeaderTitle>Add Selection Process</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          {process.length !== 0 && (
            <DraggableDataPanel
              data={process}
              setData={setProcess}
              // handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          )}
        </EuiModalBody>
        <EuiFlexGroup
          justifyContent="flexEnd"
          alignItems="center"
          style={{ marginRight: "1rem" }}
        >
          <EuiFlexItem grow={false}>
            <EuiButton onClick={showModal2}>Add Process</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiModalFooter>
          <EuiButton fill color="danger" onClick={closeSelectionModal}>
            Cancel
          </EuiButton>
        </EuiModalFooter>
        {modal2}
      </EuiModal>
    );
  }

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
        {mainData && (<Header
          breadcrumbs={[
            {
              text: "Opportunities",
              onClick: () => history.push("/admin/allOpportunities"),
            },
            {
              text: mainData.companyName,
              onClick: () => history.push(`/admin/opportunity/${props.match.params.id}`),
            },
            {
              text: "Update Opportunity",
            },
          ]}
        />)}
        <EuiPanel>
          <EuiFlexGrid columns="1">
            <EuiFlexItem>
              <EuiDescribedFormGroup
                title={<h3>Add the Company Name Here</h3>}
                description={<Fragment>Company Name should be unique</Fragment>}
              >
                <EuiFormRow label="Company Name">
                  <EuiFieldText
                    name="companyName"
                    onChange={handleMainDataChange}
                    value={mainData.companyName}
                  />
                </EuiFormRow>
              </EuiDescribedFormGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiDescribedFormGroup
                title={<h3>Add the Role Name Here</h3>}
                description={<Fragment>What will be the profile </Fragment>}
              >
                <EuiFormRow label="Role Name">
                  <EuiFieldText
                    name="roleName"
                    onChange={handleMainDataChange}
                    value={mainData.roleName}
                  />
                </EuiFormRow>
              </EuiDescribedFormGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiDescribedFormGroup
                title={<h3>Add the Eligilbe Streams</h3>}
                description={
                  <Fragment>Add as many streams as you want.</Fragment>
                }
              >
                <EuiFormRow label="Eligible Streams">
                  <EuiComboBox
                    placeholder="Select streams"
                    options={streams}
                    isClearable={true}
                    selectedOptions={selectedOptions}
                    onChange={onChange}
                  />
                </EuiFormRow>
              </EuiDescribedFormGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiDescribedFormGroup
                title={<h3>Add the Minimum Criteria for Eligibility</h3>}
                description={<Fragment>Should be in CGPA Form</Fragment>}
              >
                <EuiFormRow label="Eligiblity Criteria">
                  <EuiFieldText
                    onChange={handleMainDataChange}
                    name="eligibilityCriteria"
                    value={mainData.eligibilityCriteria}
                  />
                </EuiFormRow>
              </EuiDescribedFormGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiDescribedFormGroup
                title={<h3>What CTC does the company provides ?</h3>}
                description={<Fragment>Should be in LPA</Fragment>}
              >
                <EuiFormRow label="CTC">
                  <EuiFieldText
                    name="CTC"
                    onChange={handleMainDataChange}
                    value={mainData.CTC}
                  />
                </EuiFormRow>
              </EuiDescribedFormGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiDescribedFormGroup
                title={<h3>What is the Selection Process ?</h3>}
                description={
                  <Fragment>Add all the stages of the process</Fragment>
                }
              >
                <EuiFormRow label="Selection Process">
                  <EuiButton color="secondary" onClick={showSelectionModal}>
                    Add/Edit Selection Process
                  </EuiButton>
                </EuiFormRow>
              </EuiDescribedFormGroup>
            </EuiFlexItem>
            <EuiFlexItem style={{ width: "100%" }} className="custom">
              <EuiDescribedFormGroup
                title={<h3>Add Some Description about the company ?</h3>}
                description={
                  <Fragment>
                    This could include the company location, company history,
                    breif intro about the company
                  </Fragment>
                }
              >
                <EuiMarkdownEditor
                  style={{ width: "100%", minWidth: "100%" }}
                  value={mainData.description}
                  onChange={setMarkdownValue}
                />
              </EuiDescribedFormGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiDescribedFormGroup title={<h3>Registration End Date</h3>}>
                <EuiFormRow label="Registration End Date">
                  <EuiDatePicker
                    selected={registrationxDate}
                    value={registrationxDate}
                    onChange={registrationxDateChange}
                  />
                </EuiFormRow>
              </EuiDescribedFormGroup>
            </EuiFlexItem>
          </EuiFlexGrid>
          <EuiButton onClick={addOpportunity}>Add Opportunity</EuiButton>
          {selctionProcessModal}
        </EuiPanel>
      </div>
    </div>
  );
}

export default UpdateOpportunities;
