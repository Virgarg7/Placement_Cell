import React, { useState, useEffect } from "react";
import { EuiPanel, EuiFieldSearch } from "@elastic/eui";
import { useHistory } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header";

function SelectionProcessSelected(props) {
    const history = useHistory();
    const [busy, setBusy] = useState(true);
    const [gridApi, setGridApi] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [info, setInfo] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch(
                `http://localhost:6700/opportunity/${props.match.params.id}/selectionProcess/${props.match.params.processId}/selected`
            );
            response = await response.json();
            if (response.statusCode == 200) {
                setRowData(response.data.selectionProcess[0].selected);
                setInfo({
                    companyName: response.data.companyName,
                    id: response.data._id,
                    processName: response.data.selectionProcess[0].name,
                });
                setBusy(false);
            } else {
                alert("Something went wrong...Please try again");
                history.replace("/admin/allOpportunities");
                return;
            }
        };
        fetchData();
    }, []);
    const onChange = async (event) => {
        let response = await fetch(
            `http://localhost:6700/opportunity/${props.match.params.id}/selectionProcess/${props.match.params.processId}/selected/search?term=${event.target.value}`
        );
        response = await response.json();
        if (response.statusCode == 200) {
            setRowData(response.data.selectionProcess[0].selected);
            setInfo({
                companyName: response.data.companyName,
                id: response.data._id,
                processName: response.data.selectionProcess[0].name,
            });
            setBusy(false);
        } else {
            alert("Something went wrong...Please try again");
            history.replace("/admin/allOpportunities");
            return;
        }
    };

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
                <Sidebar/>
            </div>

            <div
                style={{
                    margin: "1rem",
                    width: "100%",
                    maxWidth: "100vw",
                    height: "100%",
                }}
            >
                {info && (
                    <Header
                        breadcrumbs={[
                            {
                                text: "Opportunity",
                                onClick: () =>
                                    history.push("/student/allOpportunities"),
                            },
                            {
                                text: info.companyName,
                                onClick: () =>
                                    history.replace(
                                        `/student/opportunity/${info.id}`
                                    ),
                            },
                            { text: info.processName },
                            { text: "Selected" },
                        ]}
                    />
                )}
                <EuiPanel style={{ height: "85%" }}>
                    <EuiFieldSearch
                        placeholder="Search Selected"
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

export default SelectionProcessSelected;
