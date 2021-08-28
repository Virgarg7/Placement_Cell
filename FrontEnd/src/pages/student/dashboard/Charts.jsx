import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import { EuiPanel, EuiFlexGroup, EuiFlexItem, EuiText } from "@elastic/eui";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Charts() {
  return (
    <EuiPanel paddingSize="l" style={{ minWidth: "80%", height: "30vh" }}>
      <EuiFlexGroup style={{ height: "100%" }}>
        <EuiFlexItem>
          <EuiText>
            <h3 style={{ color: "#8884ff" }}>Total Students Placed</h3>
          </EuiText>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText>
            <h3 style={{ color: "#ff0054" }}>Total Companies Visited</h3>
          </EuiText>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#ff0054"
                fill="#ff005448"
              />
            </AreaChart>
          </ResponsiveContainer>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText>
            <h3 style={{ color: "#ffc658" }}>Branchwise Stats</h3>
          </EuiText>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="amt"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText>
            <h3 style={{ color: "#affc41" }}>All Branch This Month</h3>
          </EuiText>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={data}>
              <Bar dataKey="uv" fill="#affc41a2" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
}

export default Charts;
