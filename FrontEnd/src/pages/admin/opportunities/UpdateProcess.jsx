import React, { useEffect, useState, Fragment } from "react";
import Header from "../header";
import SidebarNew from "../sidebar/SidebarNew";
import { useHistory } from "react-router-dom";

import Confetti from "react-confetti";

import {
  EuiStepsHorizontal,
  EuiPanel,
  EuiSelectable,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiText,
} from "@elastic/eui";

function UpdateProcess(props) {
  const history = useHistory();

  const [selectionProcess, setSelectionProcess] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [options, setOptions] = useState([]);
  const [processCompleted, setProcessCompleted] = useState(false);
  const [info, setInfo] = useState(undefined);
  const [placedStudents, setPlacedStudents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let response = await fetch(
        `http://localhost:6700/opportunity/${props.match.params.id}/selectionProcess`
      );
      response = await response.json();

      if (response.statusCode != 200) {
        alert("Something went wrong...Please try again");
        history.replace("/admin/allOpportunities");
        return;
      }

      setInfo({
        companyName: response.data.companyName,
        id: response.data._id,
      });

      if (response.data.processCompleted === true) {
        setProcessCompleted(true);
        let reponse2 = await fetch(
          `http://localhost:6700/opportunity/${props.match.params.id}/placed`
        );
        reponse2 = await reponse2.json();
        console.log(reponse2);
        if (reponse2.statusCode === 200) {
          setPlacedStudents(reponse2.data);
        }
      }
      const data = [];
      let currentPositionTemp = response.data.selectionProcess.length - 1;
      for (let i = 0; i < response.data.selectionProcess.length; i++) {
        if (response.data.selectionProcess[i].completed === false) {
          currentPositionTemp = i;
          break;
        }
      }
      response.data.selectionProcess.forEach((dt, index) => {
        data.push({
          isComplete: dt.completed,
          selected: dt.selected,
          isSelected: false,
          id: dt._id,
          title: dt.name,
          onClick: () => {},
        });
      });
      data[currentPositionTemp].isSelected = true;
      setSelectionProcess(data);
      setCurrentPosition(currentPositionTemp);

      if (currentPositionTemp === 0) {
        setOptions(response.data.applicants);
      } else {
        if (currentPosition === selectionProcess.length - 1) {
          setOptions(
            response.data.selectionProcess[currentPositionTemp].selected
          );
        } else
          setOptions(
            response.data.selectionProcess[currentPositionTemp - 1].selected
          );
      }
    };
    getData();
  }, []);

  const markAsComplete = async () => {
    const selectedapplicants = [];
    options.forEach((option) => {
      if (option.checked === "on") selectedapplicants.push(option._id);
    });

    const sendData = {
      body: JSON.stringify({
        processId: selectionProcess[currentPosition].id,
        selected: selectedapplicants,
        completed: true,
      }),
      method: "POST",
      headers: { "content-type": "application/json" },
    };
    let response = await fetch(
      `http://localhost:6700/opportunity/${props.match.params.id}/manageSelectionProcess`,
      sendData
    );
    response = await response.json();
    if (response.statusCode === 200) {
      if (response.data.processCompleted === true) {
        setProcessCompleted(true);
        let reponse2 = await fetch(
          `http://localhost:6700/opportunity/${props.match.params.id}/placed`
        );
        reponse2 = await reponse2.json();
        console.log(reponse2);
        if (reponse2.statusCode === 200) {
          setPlacedStudents(reponse2.data);
        }
      }
      const data = [];
      let currentPositionTemp = response.data.selectionProcess.length - 1;
      for (let i = 0; i < response.data.selectionProcess.length; i++) {
        if (response.data.selectionProcess[i].completed === false) {
          currentPositionTemp = i;
          break;
        }
      }
      response.data.selectionProcess.forEach((dt, index) => {
        data.push({
          isComplete: dt.completed,
          selected: dt.selected,
          isSelected: false,
          id: dt._id,
          title: dt.name,
          onClick: () => {},
        });
      });
      data[currentPositionTemp].isSelected = true;
      setSelectionProcess(data);
      setCurrentPosition(currentPositionTemp);
      setOptions(
        response.data.selectionProcess[currentPositionTemp - 1].selected
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100vw",
        maxWidth: "100%",
      }}
    >
      <div>
        <SidebarNew current="opportunity" />
      </div>
      <div
        className="main-container"
        style={{ margin: "1rem", width: "100%", maxWidth: "100vw" }}
      >
        {info && (
          <Header
            breadcrumbs={[
              {
                text: "Opportunity",
                onClick: () => history.push("/admin/allOpportunities"),
              },
              {
                text: info.companyName,
                onClick: () => history.replace(`/admin/opportunity/${info.id}`),
              },
              { text: "Update Selection Process" },
            ]}
          />
        )}
        <EuiPanel style={{ minHeight: "85vh" }}>
          <EuiStepsHorizontal steps={selectionProcess} />
          <EuiSpacer size="l" />
          {processCompleted === false && (
            <>
              <EuiSelectable
                searchable
                searchProps={{
                  placeholder: "Select Shortlisted Students",
                }}
                options={options}
                onChange={(newOptions) => setOptions(newOptions)}
              >
                {(list, search) => (
                  <Fragment>
                    {search}
                    {list}
                  </Fragment>
                )}
              </EuiSelectable>
              <EuiSpacer size="xxl" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiButton onClick={markAsComplete}>
                    Mark As Completed
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </>
          )}
          {processCompleted === true && (
            <>
              <EuiText
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <h1>Process has been completed.</h1>
              </EuiText>
              <EuiText
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <h3>Shortlisted Students</h3>
              </EuiText>
              <Confetti
                width={1500}
                height={700}
                numberOfPieces={200}
                tweenDuration={1000}
              />
              <EuiSpacer size="s" />
              <EuiPanel color="accent">
                {placedStudents.length > 0 &&
                  placedStudents.map((pd) => {
                    return (
                      <EuiFlexGroup justifyContent="center" alignItems="center">
                        <EuiFlexItem grow={false}>
                          <EuiText>
                            <h4>
                              {pd.firstName} {pd.lastName}
                            </h4>
                          </EuiText>
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                          <EuiText>
                            <h4>{pd.email}</h4>
                          </EuiText>
                        </EuiFlexItem>
                      </EuiFlexGroup>
                    );
                  })}
              </EuiPanel>
            </>
          )}
        </EuiPanel>
      </div>
    </div>
  );
}

export default UpdateProcess;
