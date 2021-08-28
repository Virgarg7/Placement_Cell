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

function Languages({ languages, setLanguages }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const [currentUpdateId, setCurrentUpdateId] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setData({ name: "", fluency: "" });
    setCurrentUpdateId(null);
  };
  const showUpdateModal = () => setIsUpdateModalVisible(true);

  const [data, setData] = useState({
    name: "",
    fluency: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const addData = () => {
    const copiedLanguages = [...languages];
    copiedLanguages.push({ ...data, id: makeId() });
    setLanguages(copiedLanguages);
    closeModal();
    setData({ name: "", fluency: "" });
  };

  const handleUpdate = (id) => {
    const index = languages.findIndex((language) => language.id === id);
    setData(languages[index]);
    showUpdateModal();
    setCurrentUpdateId(id);
  };

  const updateData = () => {
    const copiedData = [...languages];
    const index = languages.findIndex(
      (language) => language.id === currentUpdateId
    );
    copiedData[index] = { ...data, id: currentUpdateId };
    setLanguages(copiedData);
    setData({ name: "", fluency: "" });
    setCurrentUpdateId(null);
    closeUpdateModal();
  };

  const addLanguagesForm = (
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
          <EuiFormRow label="Fluency" fullWidth>
            <EuiFieldText
              onChange={handleChange}
              name="fluency"
              fullWidth
              value={data.fluency}
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
          <EuiModalHeaderTitle>Add Langauge</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addLanguagesForm}</EuiModalBody>

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
          <EuiModalHeaderTitle>Update Langauge</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addLanguagesForm}</EuiModalBody>

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
    const filteredLanguages = languages.filter(
      (language) => language.id !== id
    );
    setLanguages(filteredLanguages);
  };

  return (
    <div>
      {languages.length !== 0 && (
        <DraggableDataPanel
          data={languages}
          setData={setLanguages}
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

export default Languages;
