import React, { useState, useEffect } from "react";
import Header from "../header";
import Sidebar from "../sidebar/Sidebar";
import {
  EuiPanel,
  EuiText,
  EuiFormRow,
  EuiFieldText,
  EuiSpacer,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui/";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

function Profile() {
  const history = useHistory();

  const [data, setData] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const studentId = localStorage.getItem("placement-tracker-student-id");
      let response = await fetch(
        `http://localhost:6700/student/${studentId}/profile`
      );
      response = await response.json();
      setData(response.data);
    };
    fetchData();
  }, []);

  const [passwords, setPasswords] = useState({
    newPass: "",
    confirmPass: "",
  });
  const handleChange = (event) => {
    setPasswords({ ...passwords, [event.target.name]: event.target.value });
  };
  const handleClick = async () => {
    if (passwords.newPass.length > 3 && passwords.confirmPass.length > 3) {
      if (passwords.newPass === passwords.confirmPass) {
        const sendData = {
          method: "POST",
          body: JSON.stringify({
            id: localStorage.getItem("placement-tracker-student-id"),
            password: passwords.newPass,
          }),
          headers: { "content-type": "application/json" },
        };
        let response = await fetch(
          "http://localhost:6700/student/changePassword",
          sendData
        );
        response = await response.json();
        if (response.statusCode === 200) {
          alert(
            "Password Changed Successfully. Please login again with the new password."
          );
          Cookies.remove("jwt");
          localStorage.removeItem("placement-tracker-student-id");
          localStorage.removeItem("placement-tracker-student-name");
          history.push("/login");
        }
      }
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100vw",
          maxWidth: "100%",
        }}
      >
        <div>
          <Sidebar />
        </div>
        <div
          className="main-container"
          style={{ margin: "1rem", width: "100%", maxWidth: "100vw" }}
        >
          <Header breadcrumbs={[{ text: "Profile" }]} />
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiPanel style={{ maxWidth: "30rem" }} grow={false}>
                <EuiText>
                  <h1>Change Password</h1>
                </EuiText>
                <EuiSpacer />
                <EuiFormRow label="New Password">
                  <EuiFieldText name="newPass" onChange={handleChange} />
                </EuiFormRow>
                <EuiFormRow label="Confirm New Password">
                  <EuiFieldText name="confirmPass" onChange={handleChange} />
                </EuiFormRow>
                <EuiButton onClick={handleClick}>Change Password</EuiButton>
              </EuiPanel>
            </EuiFlexItem>

            {data && (
              <>
                <EuiFlexItem>
                  <EuiPanel style={{ maxWidth: "30rem" }}>
                    <EuiText>
                      <h1>Basic Information</h1>
                    </EuiText>
                    <EuiSpacer />
                    <EuiFormRow label="First Name">
                      <EuiFieldText
                        name="firstName"
                        readOnly={true}
                        value={data.firstName}
                      />
                    </EuiFormRow>
                    <EuiFormRow label="Last Name">
                      <EuiFieldText
                        name="lastName"
                        readOnly={true}
                        value={data.lastName}
                      />
                    </EuiFormRow>
                    <EuiFormRow label="Email">
                      <EuiFieldText
                        name="email"
                        readOnly={true}
                        value={data.email}
                      />
                    </EuiFormRow>
                    <EuiFormRow label="Degree">
                      <EuiFieldText
                        name="degree"
                        readOnly={true}
                        value={data.stream.degree}
                      />
                    </EuiFormRow>
                    <EuiFormRow label="Major">
                      <EuiFieldText
                        name="major"
                        readOnly={true}
                        value={data.stream.major}
                      />
                    </EuiFormRow>
                    <EuiFormRow label="Sem">
                      <EuiFieldText
                        name="sem"
                        readOnly={true}
                        value={data.stream.sem}
                      />
                    </EuiFormRow>
                  </EuiPanel>
                </EuiFlexItem>

                {data.placed && (
                  <EuiFlexItem>
                    <EuiPanel style={{ maxWidth: "30rem" }} grow={false}>
                      <EuiText>
                        <h1>Placement</h1>
                      </EuiText>
                      <EuiSpacer />
                      <EuiText>
                        <p>
                          <b>Congratulations!!</b> You are placed in the{" "}
                          <b>{data.placedIn.companyName}</b> for{" "}
                          <b>{data.placedIn.roleName}</b> role with the CTC of{" "}
                          <b>{data.placedIn.CTC}</b>
                        </p>
                      </EuiText>
                    </EuiPanel>
                  </EuiFlexItem>
                )}
              </>
            )}
          </EuiFlexGroup>
        </div>
      </div>
    </>
  );
}

export default Profile;
