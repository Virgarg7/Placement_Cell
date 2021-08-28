import React from "react";
import { EuiTextArea, EuiFormRow } from "@elastic/eui";
function Objectives({ objectives, setObjectives }) {
  const handleChange = (event) => {
    setObjectives(event.target.value);
  };
  return (
    <EuiFormRow label="Objectives">
      <EuiTextArea
        name="objectives"
        value={objectives}
        onChange={handleChange}
      />
    </EuiFormRow>
  );
}

export default Objectives;
