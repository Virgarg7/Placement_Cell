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
  EuiFlexGrid,
  EuiFlexItem,
} from "@elastic/eui";
import React, { useState } from "react";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import DraggableDataPanel from "./DraggableDataPanel";

function Skills({ skills, setSkills }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const [currentUpdateId, setCurrentUpdateId] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setData({
      name: "",
      level: "",
    });
    setCurrentUpdateId(null);
  };
  const showUpdateModal = () => setIsUpdateModalVisible(true);

  const [data, setData] = useState({
    name: "",
    level: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const addData = () => {
    const copiedSkills = [...skills];
    copiedSkills.push({ ...data, id: makeId() });
    setSkills(copiedSkills);
    setData({ name: "", level: "" });
    closeModal();
  };

  const handleUpdate = (id) => {
    const index = skills.findIndex((skill) => skill.id === id);
    setData(skills[index]);
    showUpdateModal();
    setCurrentUpdateId(id);
  };

  const updateData = () => {
    const copiedData = [...skills];
    const index = skills.findIndex((skill) => skill.id === currentUpdateId);
    copiedData[index] = { ...data, id: currentUpdateId };
    setSkills(copiedData);
    setData({ name: "", level: "" });
    setCurrentUpdateId(null);
    closeUpdateModal();
  };

  const addSkillsForm = (
    <EuiForm>
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiFormRow label="Name" fullWidth>
            <EuiFieldText
              onChange={handleChange}
              name="name"
              fullWidth
              value={data.name}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Level" fullWidth>
            <EuiFieldText
              onChange={handleChange}
              name="level"
              fullWidth
              value={data.level}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGrid>
    </EuiForm>
  );

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Add Skills</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addSkillsForm}</EuiModalBody>

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
          <EuiModalHeaderTitle>Update Skills</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addSkillsForm}</EuiModalBody>

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
    const filteredSkills = skills.filter((skill) => skill.id !== id);
    setSkills(filteredSkills);
  };

  return (
    <div>
      {skills.length !== 0 && (
        <DraggableDataPanel
          data={skills}
          setData={setSkills}
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

export default Skills;
