import React, { useState, useEffect } from "react";
import { EuiPanel, EuiFieldSearch } from "@elastic/eui";
import { useHistory } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Header from "../header";
import Sidebar from "../sidebar/Sidebar";
import moment from "moment";

function Applications(props) {
    const history = useHistory();
    const [busy, setBusy] = useState(true);
    const [gridApi, setGridApi] = useState(null);
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const studentId = localStorage.getItem(
                "placement-tracker-student-id"
            );
            let response = await fetch(
                `http://localhost:6700/student/${studentId}/applications`
            );
            response = await response.json();
            setRowData(response.data);
            setBusy(false);
        };
        fetchData();
    }, []);
    const onChange = async (event) => {
        const studentId = localStorage.getItem(
            "placement-tracker-student-id"
        );
        let response = await fetch(
            `http://localhost:6700/student/${studentId}/applications/search?term=${event.target.value}`
        );
        response = await response.json();
        setRowData(response.data);
        setBusy(false);
    };

    const viewAppliedAt = (params) => {
        const date = moment(params.value[0].appliedAt).format("DD/MM/YYYY");
        return (
            <>
                {date}
            </>
        );
    };

    const viewResume = (params) => {
        const url = `http://localhost:3000/student/resume/${params.value[0].resumeId}`;
        return (
            <a href={url} target="_blank">
                View
            </a>
        );
    };

    const viewOpportunity = (params) => {
        const url = `http://localhost:3000/student/opportunity/${params.value}`;
        return (
            <a href={url} target="_blank">
                View
            </a>
        );
    };

    const [columnDefs] = useState([
        {
            headerName: "Company Name",
            field: "companyName",
        },
        {
            headerName: "Role Name",
            field: "roleName",
        },
        {
            headerName: "CTC",
            field: "CTC",
        },
        {
            headerName: "Applied At",
            field: "applicants",
            cellRendererFramework: viewAppliedAt,
        },
        {
            headerName: "Resume",
            field: "applicants",
            cellRendererFramework: viewResume,
        },
        {
            headerName: "Opportunity",
            field: "_id",
            cellRendererFramework: viewOpportunity,
        }
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
                <Sidebar />
            </div>

            <div
                style={{
                    margin: "1rem",
                    width: "100%",
                    maxWidth: "100vw",
                    height: "100%",
                }}
            >
                <Header
                    breadcrumbs={[
                        { text: "Applications" },
                    ]}
                />
                <EuiPanel style={{ height: "85%" }}>
                    <EuiFieldSearch
                        placeholder="Search Applications"
                        // value={value}
                        fullWidth
                        isClearable={true}
                        onChange={onChange}
                    />
                    <div
                        className="ag-theme-alpine"
                        style={{
                            height: "80%",
                            width: "100%",
                            marginTop: "1rem",
                        }}
                    >
                        {!busy && (
                            <AgGridReact
                                onGridReady={onGridReady}
                                columnDefs={columnDefs}
                                rowData={rowData}
                                width="auto"
                                pagination={true}
                                paginationPageSize="7"
                            ></AgGridReact>
                        )}
                    </div>
                </EuiPanel>
            </div>
        </div>
    );
}

export default Applications;
