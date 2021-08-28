import React, { useState } from "react";
import { EuiPanel, EuiFlexGroup, EuiFlexItem, EuiButton } from "@elastic/eui";
import { useHistory } from "react-router-dom";

const OpportunityTile = (props) => {
  const history = useHistory();
  return (
    <EuiPanel>
      <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
        <EuiFlexItem>
          <h4>
            <b>{props.companyName}</b>
          </h4>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <h4
            style={{
              padding: "0.6rem 0.6rem",
              color: "red",
              borderRadius: "0.5rem",
            }}
          >
            {props.registrationEndMessage}
          </h4>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup alignItems="center" justifyContent="flexEnd">
            <EuiFlexItem>
              <h4
                style={{
                  padding: "0.6rem 0.6rem",
                  backgroundColor: "#3f37c942",
                  borderRadius: "0.5rem",
                  minWidth: "11rem",
                }}
              >
                CTC : {props.CTC}
              </h4>
            </EuiFlexItem>
            <EuiFlexItem>
              {props.applied && <EuiButton color="warning">Applied</EuiButton>}
              {!props.applied && !props.registrationAllowed && (
                <EuiButton color="danger">Registration Ended</EuiButton>
              )}
              {!props.applied && props.registrationAllowed && (
                <EuiButton
                  color="secondary"
                  onClick={() => props.openModal(props.id, props.companyName)}
                >
                  Apply
                </EuiButton>
              )}
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiButton
                fill
                onClick={() => history.push(`opportunity/${props.id}`)}
              >
                View
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};

export default OpportunityTile;
