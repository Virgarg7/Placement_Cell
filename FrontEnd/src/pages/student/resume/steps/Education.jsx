import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSpacer,
  EuiTextArea,
  EuiDatePicker,
  EuiFlexGrid,
  EuiFlexItem,
} from "@elastic/eui";
import React, { useState } from "react";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import DraggableDataPanel from "./DraggableDataPanel";
import moment from "moment";

function Education({ educations, setEducations }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const [currentUpdateId, setCurrentUpdateId] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setData({
      name: "",
      field: "",
      degreeType: "",
      gpa: "",
      startDate: "",
      endDate: "",
      summary: "",
    });
    setCurrentUpdateId(null);
  };
  const showUpdateModal = () => setIsUpdateModalVisible(true);

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [data, setData] = useState({
    name: "",
    field: "",
    degreeType: "",
    gpa: "",
    startDate: "",
    endDate: "",
    summary: "",
  });
  const handleChangeStartDate = (date) => {
    setStartDate(date);
    setData({ ...data, startDate: date.format("L") });
  };
  const handleChangeEndDate = (date) => {
    setEndDate(date);
    setData({ ...data, endDate: date.format("L") });
  };
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const addData = () => {
    const copiedEducation = [...educations];
    copiedEducation.push({ ...data, id: makeId() });
    setEducations(copiedEducation);
    setData({
      name: "",
      field: "",
      degreeType: "",
      gpa: "",
      startDate: "",
      endDate: "",
      summary: "",
    });
    closeModal();
  };

  const handleUpdate = (id) => {
    const index = educations.findIndex((education) => education.id === id);
    setData(educations[index]);
    showUpdateModal();
    setCurrentUpdateId(id);
  };

  const updateData = () => {
    const copiedData = [...educations];
    const index = educations.findIndex(
      (education) => education.id === currentUpdateId
    );
    copiedData[index] = { ...data, id: currentUpdateId };
    setEducations(copiedData);
    setData({
      name: "",
      field: "",
      degreeType: "",
      gpa: "",
      startDate: "",
      endDate: "",
      summary: "",
    });
    setCurrentUpdateId(null);
    closeUpdateModal();
  };

  const addEducationForm = (
    <EuiForm>
      <EuiFormRow label="Institution" fullWidth>
        <EuiFieldText
          onChange={handleChange}
          name="name"
          fullWidth
          value={data.name}
        />
      </EuiFormRow>
      <EuiFormRow label="Field of Study" fullWidth>
        <EuiFieldText
          onChange={handleChange}
          name="field"
          fullWidth
          value={data.field}
        />
      </EuiFormRow>
      <EuiSpacer size="l" />
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiFormRow label="Type of Degree">
            <EuiFieldText
              onChange={handleChange}
              name="degreeType"
              value={data.degreeType}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="GPA">
            <EuiFieldText onChange={handleChange} name="gpa" value={data.gpa} />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Start Date">
            <EuiDatePicker
              onChange={handleChangeStartDate}
              selected={startDate}
              value={data.startDate}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="End Date">
            <EuiDatePicker
              onChange={handleChangeEndDate}
              selected={endDate}
              value={data.endDate}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGrid>
      <EuiSpacer size="l" />
      <EuiFormRow label="Summary" fullWidth>
        <EuiTextArea
          fullWidth
          compressed={true}
          name="summary"
          onChange={handleChange}
          value={data.summary}
        />
      </EuiFormRow>
    </EuiForm>
  );

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Add New Education</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addEducationForm}</EuiModalBody>

        <EuiModalFooter>
          <EuiButton fill color="danger" onClick={closeModal}>
            Cancel
          </EuiButton>

          <EuiButton onClick={addData} fill>
            Save
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }

  let updateModal;

  if (isUpdateModalVisible) {
    updateModal = (
      <EuiModal onClose={closeUpdateModal} initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Update Education</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addEducationForm}</EuiModalBody>

        <EuiModalFooter>
          <EuiButton fill color="danger" onClick={closeUpdateModal}>
            Cancel
          </EuiButton>

          <EuiButton onClick={updateData} fill>
            Update
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }

  const makeId = htmlIdGenerator();

  const handleDelete = (id) => {
    const filteredEducations = educations.filter(
      (education) => education.id !== id
    );
    setEducations(filteredEducations);
  };

  return (
    <div>
      {educations.length !== 0 && (
        <DraggableDataPanel
          data={educations}
          setData={setEducations}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      )}
      <EuiSpacer size="xl" />
      <EuiButton color="secondary" fill onClick={showModal}>
        Add New
      </EuiButton>

      {modal}
      {updateModal}
    </div>
  );
}

export default Education;
