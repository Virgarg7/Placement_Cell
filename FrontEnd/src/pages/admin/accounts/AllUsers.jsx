import React, { useState, useEffect } from "react";
import { EuiConfirmModal, EuiPanel, EuiFieldSearch } from "@elastic/eui";
import { useHistory } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import Actions from "../../../components/admin/accounts/Actions";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import SidebarNew from "../sidebar/SidebarNew";
import Header from "../header";
function AllUsers() {
  const history = useHistory();
  const [busy, setBusy] = useState(true);
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [currentDeleteId, setcurrentDeleteId] = useState(null);
  const [currentUpdateId, setcurrentUpdateId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("http://localhost:6700/student/all");
      response = await response.json();
      setRowData(response.data);
      setBusy(false);
    };
    fetchData();
  }, []);
  const onChange = async (event) => {
    let response = await fetch(
      `http://localhost:6700/student/search?term=${event.target.value}`
    );
    response = await response.json();
    setRowData(response.data);
    setBusy(false);
  };
  const handleDelete = async () => {
    let response = await fetch(
      `http://localhost:6700/student/${currentDeleteId}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    response = await response.json();

    if (response.statusCode === 200) {
      setRowData(response.data);
      closeDestroyModal();
    } else {
      closeDestroyModal();
    }
  };
  const handleUpdate = () => {
    history.push(`updateStudent/${currentUpdateId}`);
  };
  const [isDestroyModalVisible, setIsDestroyModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const closeDestroyModal = () => {
    setcurrentDeleteId(null);
    setIsDestroyModalVisible(false);
  };
  const showDestroyModal = (id) => {
    setIsDestroyModalVisible(true);
    setcurrentDeleteId(id);
  };

  const closeUpdateModel = () => {
    setcurrentUpdateId(null);
    setIsUpdateModalVisible(false);
  };
  const showUpdateModel = (id) => {
    setIsUpdateModalVisible(true);
    setcurrentUpdateId(id);
  };

  let destroyModal;

  if (isDestroyModalVisible) {
    destroyModal = (
      <EuiConfirmModal
        title="Are you sure you want to delete the user"
        onCancel={closeDestroyModal}
        onConfirm={handleDelete}
        cancelButtonText="No, don't delete it"
        confirmButtonText="Yes, delete it"
        buttonColor="danger"
        defaultFocusedButton="confirm"
      ></EuiConfirmModal>
    );
  }

  let updateModel;
  if (isUpdateModalVisible) {
    updateModel = (
      <EuiConfirmModal
        title="Are you sure you want to Update the user"
        onCancel={closeUpdateModel}
        onConfirm={handleUpdate}
        cancelButtonText="No, don't Update it"
        confirmButtonText="Yes, Update it"
        buttonColor="primary"
        defaultFocusedButton="confirm"
      ></EuiConfirmModal>
    );
  }

  const [frameworkComponents] = useState({
    Actions,
  });
  const [columnDefs] = useState([
    {
      headerName: "First Name",
      field: "firstName",
    },
    {
      headerName: "Last Name",
      field: "lastName",
    },
    {
      headerName: "Email",
      field: "email",
    },
    {
      headerName: "Degree",
      field: "degree",
    },
    {
      headerName: "Major",
      field: "major",
    },
    {
      headerName: "Semester",
      field: "sem",
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: "Actions",
      cellRendererParams: {
        handleDelete: showDestroyModal,
        handleUpdate: showUpdateModel,
      },
    },
  ]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };
  useEffect(() => {
    if (gridApi !== null) {
      gridApi.sizeColumnsToFit();
    }
  }, [gridApi]);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <div>
        <SidebarNew current="userManagement" />
      </div>

      <div
        style={{
          margin: "1rem",
          width: "100%",
          maxWidth: "100vw",
          height: "100%",
        }}
      >
        <Header breadcrumbs={[{ text: "Students" }]} />
        <EuiPanel style={{ height: "85%" }}>
          <EuiFieldSearch
            placeholder="Search Students"
            // value={value}
            fullWidth
            isClearable={true}
            onChange={onChange}
          />
          <div
            className="ag-theme-alpine"
            style={{ height: "80%", width: "100%", marginTop: "1rem" }}
          >
            {!busy && (
              <AgGridReact
                onGridReady={onGridReady}
                columnDefs={columnDefs}
                rowData={rowData}
                width="auto"
                pagination={true}
                paginationPageSize="7"
                frameworkComponents={frameworkComponents}
              ></AgGridReact>
            )}
          </div>
        </EuiPanel>
        {destroyModal}
        {updateModel}
      </div>
    </div>
  );
}

export default AllUsers;
