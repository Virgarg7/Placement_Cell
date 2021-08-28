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

function SocialNetworks({ networks, setNetworks }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);
  const [currentUpdateId, setCurrentUpdateId] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setData({ name: "", username: "", url: "" });
    setCurrentUpdateId(null);
  };
  const showUpdateModal = () => setIsUpdateModalVisible(true);
  const [data, setData] = useState({ name: "", username: "", url: "" });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const addData = () => {
    const copiedNetworks = [...networks];
    copiedNetworks.push({ ...data, id: makeId() });
    setNetworks(copiedNetworks);
    setData({ name: "", username: "", url: "" });
    closeModal();
  };

  const handleUpdate = (id) => {
    const index = networks.findIndex((network) => network.id === id);
    setData(networks[index]);
    showUpdateModal();
    setCurrentUpdateId(id);
  };

  const updateData = () => {
    const copiedData = [...networks];
    const index = networks.findIndex(
      (network) => network.id === currentUpdateId
    );
    copiedData[index] = { ...data, id: currentUpdateId };
    setNetworks(copiedData);
    setData({ name: "", username: "", url: "" });
    setCurrentUpdateId(null);
    closeUpdateModal();
  };

  const addSocialNetworkForm = (
    <EuiForm>
      <EuiFormRow label="Social Network Name">
        <EuiFieldText onChange={handleChange} name="name" value={data.name} />
      </EuiFormRow>
      <EuiFormRow label="Username">
        <EuiFieldText
          onChange={handleChange}
          name="username"
          value={data.username}
        />
      </EuiFormRow>
      <EuiFormRow label="Profile URL">
        <EuiFieldText onChange={handleChange} name="url" value={data.url} />
      </EuiFormRow>
    </EuiForm>
  );

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Add New Social Network</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addSocialNetworkForm}</EuiModalBody>

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
          <EuiModalHeaderTitle>Update Social Network</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addSocialNetworkForm}</EuiModalBody>

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
    const filteredNetworks = networks.filter((network) => network.id !== id);
    setNetworks(filteredNetworks);
  };

  return (
    <div>
      {networks.length !== 0 && (
        <DraggableDataPanel
          data={networks}
          setData={setNetworks}
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

export default SocialNetworks;
