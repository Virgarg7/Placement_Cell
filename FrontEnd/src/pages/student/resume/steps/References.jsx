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

function References({ references, setReferences }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const [currentUpdateId, setCurrentUpdateId] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setData({ name: "", position: "", number: "", email: "" });
    setCurrentUpdateId(null);
  };
  const showUpdateModal = () => setIsUpdateModalVisible(true);

  const [data, setData] = useState({
    name: "",
    position: "",
    number: "",
    email: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const addData = () => {
    const copiedReferences = [...references];
    copiedReferences.push({ ...data, id: makeId() });
    setReferences(copiedReferences);
    setData({ name: "", position: "", number: "", email: "" });
    closeModal();
  };

  const handleUpdate = (id) => {
    const index = references.findIndex((reference) => reference.id === id);
    setData(references[index]);
    showUpdateModal();
    setCurrentUpdateId(id);
  };

  const updateData = () => {
    const copiedData = [...references];
    const index = references.findIndex(
      (reference) => reference.id === currentUpdateId
    );
    copiedData[index] = { ...data, id: currentUpdateId };
    setReferences(copiedData);
    setData({ name: "", position: "", number: "", email: "" });
    setCurrentUpdateId(null);
    closeUpdateModal();
  };

  const addReferencesForm = (
    <EuiForm>
      <EuiSpacer size="l" />
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiFormRow label="Name">
            <EuiFieldText
              onChange={handleChange}
              name="name"
              value={data.name}
            />
          </EuiFormRow>
        </EuiFlexItem>
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
          <EuiFormRow label="Number">
            <EuiFieldText
              onChange={handleChange}
              name="number"
              value={data.number}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Email">
            <EuiFieldText
              onChange={handleChange}
              name="email"
              value={data.email}
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
          <EuiModalHeaderTitle>Add Email</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>{addReferencesForm}</EuiModalBody>
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
          <EuiModalHeaderTitle>Update Reference</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>{addReferencesForm}</EuiModalBody>
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
    const filteredReferences = references.filter(
      (reference) => reference.id !== id
    );
    setReferences(filteredReferences);
  };

  return (
    <div>
      {references.length !== 0 && (
        <DraggableDataPanel
          data={references}
          setData={setReferences}
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

export default References;
