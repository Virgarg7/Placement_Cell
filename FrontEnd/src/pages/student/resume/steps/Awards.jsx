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

function Awards({ awards, setAwards }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const [currentUpdateId, setCurrentUpdateId] = useState(null);

  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setData({ name: "", awarder: "", awardedDate: "", summary: "" });
    setCurrentUpdateId(null);
  };
  const showUpdateModal = () => setIsUpdateModalVisible(true);

  const [awardedDate, setAwardedDate] = useState(moment());
  const [data, setData] = useState({
    name: "",
    awarder: "",
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
    const copiedAwards = [...awards];
    copiedAwards.push({ ...data, id: makeId() });
    setAwards(copiedAwards);
    setData({ name: "", awarder: "", awardedDate: "", summary: "" });
    closeModal();
  };

  const handleUpdate = (id) => {
    const index = awards.findIndex((award) => award.id === id);
    setData({
      name: awards[index].name,
      awarder: awards[index].awarder,
      awardedDate: awards[index].awardedDate,
      summary: awards[index].summary,
    });
    showUpdateModal();
    setCurrentUpdateId(id);
  };

  const updateData = () => {
    const copiedAwards = [...awards];
    const index = awards.findIndex((award) => award.id === currentUpdateId);
    copiedAwards[index] = { ...data, id: currentUpdateId };
    setAwards(copiedAwards);
    setData({ name: "", awarder: "", awardedDate: "", summary: "" });
    setCurrentUpdateId(null);
    closeUpdateModal();
  };

  const addAwardsForm = (
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
          <EuiFormRow label="Awarder" fullWidth>
            <EuiFieldText
              onChange={handleChange}
              name="awarder"
              fullWidth
              value={data.awarder}
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
          <EuiModalHeaderTitle>Add Awards</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addAwardsForm}</EuiModalBody>

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
      <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Update Award</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addAwardsForm}</EuiModalBody>

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
    const filteredAwards = awards.filter((award) => award.id !== id);
    setAwards(filteredAwards);
  };

  return (
    <div>
      {awards.length !== 0 && (
        <DraggableDataPanel
          data={awards}
          setData={setAwards}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
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

export default Awards;
