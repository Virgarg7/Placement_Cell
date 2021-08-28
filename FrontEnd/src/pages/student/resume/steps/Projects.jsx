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

function Projects({ projects, setProjects }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const [currentUpdateId, setCurrentUpdateId] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setData({ name: "", url: "", startDate: "", endDate: "", summary: "" });
    setCurrentUpdateId(null);
  };
  const showUpdateModal = () => setIsUpdateModalVisible(true);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [data, setData] = useState({
    name: "",
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
    const copiedProjects = [...projects];
    copiedProjects.push({ ...data, id: makeId() });
    setProjects(copiedProjects);
    setData({ name: "", url: "", startDate: "", endDate: "", summary: "" });
    closeModal();
  };

  const handleUpdate = (id) => {
    const index = projects.findIndex((project) => project.id === id);
    setData(projects[index]);
    showUpdateModal();
    setCurrentUpdateId(id);
  };

  const updateData = () => {
    const copiedData = [...projects];
    const index = projects.findIndex(
      (project) => project.id === currentUpdateId
    );
    copiedData[index] = { ...data, id: currentUpdateId };
    setProjects(copiedData);
    setData({ name: "", url: "", startDate: "", endDate: "", summary: "" });
    setCurrentUpdateId(null);
    closeUpdateModal();
  };

  const addProjectsForm = (
    <EuiForm>
      <EuiFormRow label="Title" fullWidth>
        <EuiFieldText
          onChange={handleChange}
          name="name"
          fullWidth
          value={data.name}
        />
      </EuiFormRow>
      <EuiFormRow label="Website" fullWidth>
        <EuiFieldText
          onChange={handleChange}
          name="url"
          fullWidth
          value={data.url}
        />
      </EuiFormRow>
      <EuiSpacer size="l" />
      <EuiFlexGrid columns={2}>
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
          <EuiModalHeaderTitle>Add Project</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addProjectsForm}</EuiModalBody>

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
          <EuiModalHeaderTitle>Update Project</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addProjectsForm}</EuiModalBody>

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
    const filteredProjects = projects.filter((project) => project.id !== id);
    setProjects(filteredProjects);
  };

  return (
    <div>
      {projects.length !== 0 && (
        <DraggableDataPanel
          data={projects}
          setData={setProjects}
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

export default Projects;
