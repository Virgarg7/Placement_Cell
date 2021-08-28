import React, { useState } from "react";
import {
  EuiPopover,
  EuiSpacer,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from "@elastic/eui";
import { useHistory } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";

const OpportunityTile = (props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const settingsClicked = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);
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
              <button onClick={() => history.push(`applicants/${props.id}`)}>
                {props.applicants} Applicants
              </button>
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiButton
                fill
                onClick={() => history.push(`opportunity/${props.id}`)}
              >
                View
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiPopover
                style={{ cursor: "pointer" }}
                ownFocus={false}
                button={
                  <span onClick={settingsClicked}>
                    <HiDotsVertical style={{ fontSize: "2rem" }} />
                  </span>
                }
                isOpen={isPopoverOpen}
                closePopover={closePopover}
              >
                <EuiButton
                  color="secondary"
                  onClick={() => props.showUpdateModal(props.id)}
                >
                  Edit
                </EuiButton>
                <EuiSpacer size="s" />
                <EuiButton
                  color="warning"
                  onClick={() => history.push(`updateProcess/${props.id}`)}
                >
                  Update Process
                </EuiButton>
                <EuiSpacer size="s" />
                <EuiButton
                  color="text"
                  onClick={() =>
                    props.showSendMailModal(props.id, props.companyName)
                  }
                >
                  Send Mail
                </EuiButton>
                <EuiSpacer size="s" />
                <EuiButton
                  color="danger"
                  onClick={() => props.showDestroyModal(props.id)}
                >
                  Delete
                </EuiButton>
              </EuiPopover>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};

export default OpportunityTile;
