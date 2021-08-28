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
} from "@elastic/eui";
import React, { useState } from "react";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import DraggableDataPanel from "./DraggableDataPanel";

function Hobbies({ hobbies, setHobbies }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const [currentUpdateId, setCurrentUpdateId] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setData({ name: "" });
    setCurrentUpdateId(null);
  };
  const showUpdateModal = () => setIsUpdateModalVisible(true);

  const [data, setData] = useState({
    name: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const addData = () => {
    const copiedHobbies = [...hobbies];
    copiedHobbies.push({ ...data, id: makeId() });
    setHobbies(copiedHobbies);
    setData({ name: "" });
    closeModal();
  };

  const handleUpdate = (id) => {
    const index = hobbies.findIndex((hobby) => hobby.id === id);
    setData(hobbies[index]);
    showUpdateModal();
    setCurrentUpdateId(id);
  };

  const updateData = () => {
    const copiedData = [...hobbies];
    const index = hobbies.findIndex((hobby) => hobby.id === currentUpdateId);
    copiedData[index] = { ...data, id: currentUpdateId };
    setHobbies(copiedData);
    setData({ name: "" });
    setCurrentUpdateId(null);
    closeUpdateModal();
  };

  const addHobbiesForm = (
    <EuiForm>
      <EuiFormRow label="Name" fullWidth>
        <EuiFieldText
          onChange={handleChange}
          name="name"
          fullWidth
          value={data.name}
        />
      </EuiFormRow>
    </EuiForm>
  );

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Add Hobbies</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addHobbiesForm}</EuiModalBody>

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
          <EuiModalHeaderTitle>update Hobbies</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addHobbiesForm}</EuiModalBody>

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
    const filteredHobbies = hobbies.filter((hobby) => hobby.id !== id);
    setHobbies(filteredHobbies);
  };

  return (
    <div>
      {hobbies.length !== 0 && (
        <DraggableDataPanel
          data={hobbies}
          setData={setHobbies}
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

export default Hobbies;
