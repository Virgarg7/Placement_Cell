import React, { useState } from "react";
import { EuiPanel, EuiText } from "@elastic/eui";
import { ResponsiveContainer, PieChart, Pie } from "recharts";
import RenderActiveShape from "./RenderActiveShape";

const data2 = [
  { name: "CE", value: 400 },
  { name: "IT", value: 300 },
  { name: "ME", value: 300 },
  { name: "EC", value: 200 },
  { name: "EL", value: 200 },
  { name: "AM", value: 200 },
  { name: "CL", value: 200 },
];

function BranchWiseChart(props) {
  const chartData = props.data;
  const [activeIndex, setactiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setactiveIndex(index);
  };
  return (
    <EuiPanel style={{ maxWidth: "100%" }}>
      <EuiText>
        <h3>Placed Students Branch Wise</h3>
      </EuiText>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={<RenderActiveShape />}
            data={chartData.branchWisePlaced}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#d9036892"
            dataKey="studentsPlaced"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </EuiPanel>
  );
}

export default BranchWiseChart;
