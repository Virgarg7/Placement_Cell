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

function WorkExp({ workExp, setWorkExp }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const [currentUpdateId, setCurrentUpdateId] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setData({
      name: "",
      position: "",
      url: "",
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
    position: "",
    url: "",
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
    const copiedExp = [...workExp];

    copiedExp.push({ ...data, id: makeId() });
    setWorkExp(copiedExp);
    setData({
      name: "",
      position: "",
      url: "",
      startDate: "",
      endDate: "",
      summary: "",
    });
    closeModal();
  };

  const handleUpdate = (id) => {
    const index = workExp.findIndex((exp) => exp.id === id);
    setData(workExp[index]);
    showUpdateModal();
    setCurrentUpdateId(id);
  };

  const updateData = () => {
    const copiedData = [...workExp];
    const index = workExp.findIndex((exp) => exp.id === currentUpdateId);
    copiedData[index] = { ...data, id: currentUpdateId };
    setWorkExp(copiedData);
    setData({
      name: "",
      position: "",
      url: "",
      startDate: "",
      endDate: "",
      summary: "",
    });
    setCurrentUpdateId(null);
    closeUpdateModal();
  };

  const addWorkExpForm = (
    <EuiForm>
      <EuiFormRow label="Name of the Company" fullWidth>
        <EuiFieldText
          onChange={handleChange}
          name="name"
          fullWidth
          value={data.name}
        />
      </EuiFormRow>
      <EuiSpacer size="l" />
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiFormRow label="Position">
            <EuiFieldText
              onChange={handleChange}
              name="position"
              value={data.position}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Website URL">
            <EuiFieldText onChange={handleChange} name="url" value={data.url} />
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
      <EuiFormRow label="Summary" fullWidth value={data.summary}>
        <EuiTextArea
          fullWidth
          compressed={true}
          name="summary"
          onChange={handleChange}
        />
      </EuiFormRow>
    </EuiForm>
  );

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Add New Work Expierence</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addWorkExpForm}</EuiModalBody>

        <EuiModalFooter>
          <EuiButton fill color="danger" onClick={closeUpdateModal}>
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
      <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Update Work Expierence</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addWorkExpForm}</EuiModalBody>

        <EuiModalFooter>
          <EuiButton fill color="danger" onClick={closeUpdateModal}>
            Cancel
          </EuiButton>

          <EuiButton onClick={updateData} fill>
            Save
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }

  const makeId = htmlIdGenerator();

  const handleDelete = (id) => {
    const filteredExp = workExp.filter((exp) => exp.id !== id);
    setWorkExp(filteredExp);
  };

  return (
    <div>
      {workExp.length !== 0 && (
        <DraggableDataPanel
          data={workExp}
          setData={setWorkExp}
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

export default WorkExp;
