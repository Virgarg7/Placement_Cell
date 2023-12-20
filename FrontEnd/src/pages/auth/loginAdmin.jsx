import React, { useState, useEffect } from "react";
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiFieldText,
  EuiButton,
  EuiSpacer,
  EuiFieldPassword,
  EuiFormRow,
  EuiImage,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import Cookies from "js-cookie";

import logo from "../../assets/app-logo.png";
import graphic from "../../assets/app-graphic2.svg";
import { useHistory } from "react-router-dom";
const LoginAdmin = () => {
  const history = useHistory();
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("placement-tracker-admin-id")) {
      history.push("/admin");
    }
  }, [history]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (data.email.length > 0 && data.password.length > 0) {
      setErrors([]);
      setShowErrors(false);
      const sendData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      };
      let response = await fetch("http://localhost:6700/admin/login", sendData);
      response = await response.json();
      console.log(response);
      if (response.statusCode === 400) {
        setErrors([response.error]);
        setShowErrors(true);
      } else if (response.statusCode === 200) {
        Cookies.set("jwt", response.jwt, { expires: 2 });
        localStorage.setItem("placement-tracker-admin-id", response.data.id);
        localStorage.setItem(
          "placement-tracker-admin-name",
          `${response.data.firstName} ${response.data.lastName}`
        );
        history.push("/admin");
      }
    } else {
      const errorsNew = ["Email and Password are required"];
      setErrors(errorsNew);
      setShowErrors(true);
    }
  };
  return (
    <div>
      <EuiPage style={{ height: "87vh", width: "100vw" }}>
        <EuiPageBody component="div">
          <EuiPageContent
            verticalPosition="center"
            horizontalPosition="center"
            style={{ width: "60%" }}
            color="primary"
          >
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem>
                <EuiImage src={graphic} alt="Aurora Logo" size="l" />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPageContentHeader>
                  <EuiPageContentHeaderSection>
                    <EuiFlexGroup
                      justifyContent="center"
                      direction="column"
                      alignItems="center"
                    >
                      <EuiFlexItem>
                        <EuiImage
                          src={logo}
                          alt="Aurora Logo"
                          style={{ height: "10rem" }}
                        />
                      </EuiFlexItem>
                      <EuiFlexItem>
                        <EuiTitle
                          style={{
                            color: "#0061a6",
                            fontFamily: `'Architects Daughter', cursive`,
                          }}
                        >
                          <h5>NITJ PLACEMENT CELL</h5>
                        </EuiTitle>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiPageContentHeaderSection>
                </EuiPageContentHeader>
                <EuiPageContentBody style={{ minWidth: "30rem" }}>
                  <EuiFormRow
                    label="Email Id"
                    error={errors}
                    isInvalid={showErrors}
                  >
                    <EuiFieldText
                      name="email"
                      placeholder="Email"
                      value={data.email}
                      onChange={handleChange}
                      isInvalid={showErrors}
                    />
                  </EuiFormRow>
                  <EuiSpacer size="l" />
                  <EuiFormRow
                    label="Password"
                    error={errors}
                    isInvalid={showErrors}
                  >
                    <EuiFieldPassword
                      name="password"
                      placeholder="Password"
                      type="dual"
                      value={data.password}
                      onChange={handleChange}
                      isInvalid={showErrors}
                    />
                  </EuiFormRow>
                  <EuiSpacer size="l" />
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <EuiButton color="primary" onClick={handleSubmit}>
                        Log in
                      </EuiButton>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPageContentBody>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </div>
  );
};

export default LoginAdmin;
