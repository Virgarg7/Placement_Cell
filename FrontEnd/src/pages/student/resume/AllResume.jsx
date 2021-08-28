import React, { useState, useEffect } from "react";
import {
    EuiPanel,
    EuiCard,
    EuiFlexGrid,
    EuiFlexItem,
    EuiModal,
    EuiModalHeader,
    EuiModalBody,
    EuiModalFooter,
    EuiModalHeaderTitle,
    EuiButton,
    EuiFieldText,
    EuiFormRow,
    EuiToolTip,
} from "@elastic/eui";
// import StudentLogin from "../../../hooks/StudentLogin";
import { BsPlusCircleFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import { MdDelete, MdModeEdit, MdApps } from "react-icons/md";
import { FcDownload } from "react-icons/fc";
import Header from "../header";

function AllResume() {
    const [newResume, setNewResume] = useState({ name: "" });
    const [data, setdata] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const getResumes = async () => {
            let response = await fetch(
                `http://localhost:6700/student/${localStorage.getItem(
                    "placement-tracker-student-id"
                )}/resumes/`
            );
            response = await response.json();
            setdata(response.data);
        };
        getResumes();
    }, []);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const closeModal = () => setIsModalVisible(false);
    const showModal = () => setIsModalVisible(true);

    const handleChange = (event) =>
        setNewResume({ [event.target.name]: event.target.value });
    const addResumeFunc = async () => {
        if (validateAddResume()) {
            let response = await fetch("http://localhost:6700/resume", {
                method: "POST",
                body: JSON.stringify({
                    id: localStorage.getItem("placement-tracker-student-id"),
                    name: newResume.name,
                }),
                headers: { "content-type": "application/json" },
            });
            // response = await response.json();

            response = await response.json();
            console.log(response);
            if (response.statusCode === 200) {
                history.push(`/student/editResume/${response.data.id}`);
            }
        }
    };

    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);

    const validateAddResume = () => {
        const newErrors = [];
        let newShowErrors = false;
        if (newResume.name.length === 0) {
            newErrors.push(["Please enter a name for the resume"]);
            newShowErrors = true;
        } else if (newResume.name.length < 4) {
            newErrors.push(["Resume name should be more than 4 characters"]);
            newShowErrors = true;
        }
        setShowErrors(newShowErrors);
        setErrors(newErrors);
        if (newShowErrors === true) return false;
        else return true;
    };

    const resumeCreationForm = (
        <EuiFormRow label="Resume Name" error={errors} isInvalid={showErrors}>
            <EuiFieldText
                placeholder="Full Stack Developer"
                onChange={handleChange}
                name="name"
                isInvalid={showErrors}
            />
        </EuiFormRow>
    );

    let modal;

    if (isModalVisible) {
        modal = (
            <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
                <EuiModalHeader>
                    <EuiModalHeaderTitle>Create New Resume</EuiModalHeaderTitle>
                </EuiModalHeader>

                <EuiModalBody>{resumeCreationForm}</EuiModalBody>

                <EuiModalFooter>
                    <EuiButton onClick={closeModal}>Cancel</EuiButton>

                    <EuiButton onClick={addResumeFunc} fill>
                        Create Resume
                    </EuiButton>
                </EuiModalFooter>
            </EuiModal>
        );
    }

    const handleDelete = async (id) => {
        let response = await fetch(`http://localhost:6700/resume/${id}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                userId: localStorage.getItem("placement-tracker-student-id"),
            }),
        });
        response = await response.json();
        console.log(response);
        setdata(response.data.resumes);
    };

    const handleDownload = async (id) => {
        let response = await axios.get(
            `http://localhost:6700/resume/${id}/download`,
            {
                responseType: "arraybuffer",
                headers: {
                    Accept: "application/pdf",
                },
            }
        );
        if (response.status == 200) {
            const blob = new Blob([response.data], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `Resume.pdf`;
            link.click();
        }
        else{
          alert("Something went wrong...Please try again");
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh", width: "100%" }}>
            <div>
                <Sidebar current="streams" />
            </div>

            <div
                style={{
                    margin: "1rem",
                    width: "100%",
                    maxWidth: "100vw",
                    height: "100%",
                }}
            >
                <Header breadcrumbs={[{ text: "Resumes" }]} />

                <EuiPanel style={{ height: "85%" }}>
                    <EuiFlexGrid gutterSize="l" columns={4}>
                        <EuiFlexItem>
                            <EuiCard
                                // icon={}
                                title={
                                    <BsPlusCircleFill
                                        style={{ fontSize: "2rem" }}
                                    />
                                }
                                onClick={showModal}
                                description={""}
                            />
                        </EuiFlexItem>
                        {data.length > 0 &&
                            data.map((resume) => {
                                return (
                                    <EuiFlexItem key={resume.id}>
                                        <EuiCard
                                            title={resume.name}
                                            // onClick={() => {
                                            //   alert("here");
                                            // }}
                                            description={
                                                <>
                                                    <EuiToolTip
                                                        position="bottom"
                                                        content="View Resume"
                                                    >
                                                        <MdApps
                                                            onClick={() =>
                                                                history.push(
                                                                    `resume/${resume.id}`
                                                                )
                                                            }
                                                            style={{
                                                                fontSize:
                                                                    "1.5rem",
                                                                marginRight:
                                                                    "1rem",
                                                                color: "blue",
                                                                cursor: "pointer",
                                                            }}
                                                        />
                                                    </EuiToolTip>
                                                    <EuiToolTip
                                                        position="bottom"
                                                        content="Edit Resume"
                                                    >
                                                        <MdModeEdit
                                                            style={{
                                                                fontSize:
                                                                    "1.5rem",
                                                                marginRight:
                                                                    "1rem",
                                                                color: "yellow",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() =>
                                                                history.push(
                                                                    `/student/editResume/${resume.id}`
                                                                )
                                                            }
                                                        />
                                                    </EuiToolTip>
                                                    <EuiToolTip
                                                        position="bottom"
                                                        content="Delete Resume"
                                                    >
                                                        <MdDelete
                                                            onClick={() =>
                                                                handleDelete(
                                                                    resume.id
                                                                )
                                                            }
                                                            style={{
                                                                fontSize:
                                                                    "1.5rem",
                                                                marginRight:
                                                                    "1rem",
                                                                color: "red",
                                                                cursor: "pointer",
                                                            }}
                                                        />
                                                    </EuiToolTip>
                                                    <EuiToolTip
                                                        position="bottom"
                                                        content="Download"
                                                    >
                                                        <FcDownload
                                                            onClick={() =>
                                                                handleDownload(
                                                                    resume.id
                                                                )
                                                            }
                                                            style={{
                                                                fontSize:
                                                                    "1.5rem",
                                                                marginRight:
                                                                    "1rem",
                                                                cursor: "pointer",
                                                            }}
                                                        />
                                                    </EuiToolTip>
                                                    {/* <h6 onClick={() => alert("click")}>Update</h6>
                            <h6 onClick={() => handleDelete(resume.id)}>
                              Delete
                            </h6>
                            <h6
                              onClick={() =>
                                history.push(`/resume/${resume.id}`)
                              }
                            >
                              View
                            </h6> */}
                                                </>
                                            }
                                        />
                                    </EuiFlexItem>
                                );
                            })}
                        {/* 
              <EuiFlexItem>
                <EuiCard title={"Create new Resume"} onClick={() => {}} />
              </EuiFlexItem> */}
                    </EuiFlexGrid>
                    {modal}
                </EuiPanel>
            </div>
        </div>
    );
}

export default AllResume;
