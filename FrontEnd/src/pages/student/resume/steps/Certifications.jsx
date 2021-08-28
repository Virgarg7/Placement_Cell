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

function Certifications({ certifications, setCertifications }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const [currentUpdateId, setCurrentUpdateId] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setData({ name: "", issuer: "", awardedDate: "", summary: "" });
    setCurrentUpdateId(null);
  };
  const showUpdateModal = () => setIsUpdateModalVisible(true);

  const [awardedDate, setAwardedDate] = useState(moment());
  const [data, setData] = useState({
    name: "",
    issuer: "",
    awardedDate: "",
    summary: "",
  });
  const handleChangeAwardedDate = (date) => {
    setAwardedDate(date);
    setData({ ...data, awardedDate: date.format("L") });
  };
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const addData = () => {
    const copiedCertifications = [...certifications];
    copiedCertifications.push({ ...data, id: makeId() });
    setCertifications(copiedCertifications);
    setData({ name: "", issuer: "", awardedDate: "", summary: "" });
    closeModal();
  };

  const handleUpdate = (id) => {
    const index = certifications.findIndex(
      (certificate) => certificate.id === id
    );
    setData(certifications[index]);
    showUpdateModal();
    setCurrentUpdateId(id);
  };

  const updateData = () => {
    const copiedData = [...certifications];
    const index = certifications.findIndex(
      (certificate) => certificate.id === currentUpdateId
    );
    copiedData[index] = { ...data, id: currentUpdateId };
    setCertifications(copiedData);
    setData({ name: "", issuer: "", awardedDate: "", summary: "" });
    setCurrentUpdateId(null);
    closeUpdateModal();
  };

  const addCertificationsForm = (
    <EuiForm>
      <EuiFormRow label="Title" fullWidth>
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
          <EuiFormRow label="Issuer" fullWidth>
            <EuiFieldText
              onChange={handleChange}
              name="issuer"
              fullWidth
              value={data.issuer}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Date">
            <EuiDatePicker
              onChange={handleChangeAwardedDate}
              selected={awardedDate}
              value={data.awardedDate}
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
          <EuiModalHeaderTitle>Add Certifications</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addCertificationsForm}</EuiModalBody>

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
          <EuiModalHeaderTitle>Update Certifications</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addCertificationsForm}</EuiModalBody>

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
    const filteredCertificates = certifications.filter(
      (certificate) => certificate.id !== id
    );
    setCertifications(filteredCertificates);
  };

  return (
    <div>
      {certifications.length !== 0 && (
        <DraggableDataPanel
          data={certifications}
          setData={setCertifications}
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

export default Certifications;
