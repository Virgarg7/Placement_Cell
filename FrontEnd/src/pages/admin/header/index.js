import React, { useEffect, useState } from "react";
import {
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiBreadcrumbs,
  EuiAvatar,
  EuiToolTip,
} from "@elastic/eui";
import { BsFillCalendarFill } from "react-icons/bs";
import { RiNotificationFill } from "react-icons/ri";
import { ImSwitch } from "react-icons/im";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

function Header({ breadcrumbs }) {
  const history = useHistory();
  const [effectDone, setEffectDone] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const jwt = Cookies.get("jwt");

      if (!jwt) {
        history.push("/adminLogin");
        return;
      }
      const sendData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jwt,
        }),
      };
      let response = await fetch(
        "http://localhost:6700/admin/verify",
        sendData
      );
      response = await response.json();
      if (response.statusCode !== 200) {
        history.push("/adminLogin");
        return;
      } else {
        setEffectDone(true);
      }
    };
    checkLogin();
  }, [history]);

  const logOutUser = () => {
    Cookies.remove("jwt");
    localStorage.removeItem("placement-tracker-admin-id");
    localStorage.removeItem("placement-tracker-admin-name");
    history.push("/adminLogin");
  };
  return (
    <EuiPanel style={{ marginBottom: "0.4rem" }}>
      {effectDone && (
        <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
          <EuiFlexItem>
            <EuiBreadcrumbs
              breadcrumbs={[
                {
                  text: "Admin",
                },
                ...breadcrumbs,
              ]}
              style={{ fontSize: "1.4rem" }}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup alignItems="center" justifyContent="flexEnd">
              {/* <EuiFlexItem grow={false}>
                <EuiToolTip position="top" content="Calendar">
                  <span
                    style={{
                      padding: "0.6rem 0.6rem",
                      backgroundColor: "#3f37c942",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <BsFillCalendarFill
                      style={{ fontSize: "1rem", color: "#3f37c9" }}
                    />
                  </span>
                </EuiToolTip>
              </EuiFlexItem> */}
              {/* <EuiFlexItem grow={false}>
                <EuiToolTip position="top" content="Notification">
                  <span
                    style={{
                      padding: "0.6rem 0.6rem",
                      backgroundColor: "#7bf1a842",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <RiNotificationFill
                      style={{ fontSize: "1.3rem", color: "#7bf1a8" }}
                    />
                  </span>
                </EuiToolTip>
              </EuiFlexItem> */}
              <EuiFlexItem grow={false}>
                <EuiToolTip position="top" content="Logout">
                  <span
                    style={{
                      padding: "0.6rem 0.6rem",
                      backgroundColor: "#e6394642",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                    }}
                    onClick={logOutUser}
                  >
                    <ImSwitch
                      style={{ fontSize: "1.1rem", color: "#e63946" }}
                    />
                  </span>
                </EuiToolTip>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiAvatar
                  name={localStorage.getItem("placement-tracker-admin-name")}
                  size="l"
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      )}
    </EuiPanel>
  );
}

export default Header;
