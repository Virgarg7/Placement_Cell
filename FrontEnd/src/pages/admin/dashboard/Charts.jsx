import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiFlexGrid,
} from "@elastic/eui";
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

const demo = [
  {
    name: "Page A",
    uv: 4000,
  },
  {
    name: "Page B",
    uv: 3000,
  },
  {
    name: "Page C",
    uv: 2000,
  },
  {
    name: "Page D",
    uv: 2780,
  },
  {
    name: "Page E",
    uv: 1890,
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];

function Charts(props) {
  const chartData = props.data;
  console.log(chartData);
  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiPanel style={{ maxHeight: "42h", height: "42vh" }}>
            <EuiText>
              <h3 style={{ color: "#8884ff" }}>Total Students Placed</h3>
            </EuiText>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart
                width={500}
                height={400}
                data={chartData.totalStudentsPlaced}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="_id" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="studentPlaced"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel style={{ maxHeight: "42h", height: "42vh" }}>
            <EuiText>
              <h3 style={{ color: "#ff0054" }}>Total Companies Visited</h3>
            </EuiText>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart
                width={500}
                height={400}
                data={chartData.totalCompaniesVisited}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="_id" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="companiesVisited"
                  stroke="#ff0054"
                  fill="#ff005448"
                />
              </AreaChart>
            </ResponsiveContainer>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiPanel style={{ maxHeight: "42h", height: "42vh" }}>
            <EuiText>
              <h3 style={{ color: "#ffc658" }}>Branchwise Stats</h3>
            </EuiText>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart
                width={500}
                height={400}
                data={chartData.branchWiseStatistics}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="_id" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="studentsPlaced"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="totalStudents"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="totalOpportunities"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </ResponsiveContainer>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel style={{ maxHeight: "42h", height: "42vh" }}>
            <EuiText>
              <h3 style={{ color: "#affc41" }}>All Branch This Month</h3>
            </EuiText>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart
                width={150}
                height={40}
                data={chartData.branchesThisMonth}
              >
                <XAxis dataKey="_id" />
                <Tooltip />
                <Bar dataKey="studentsPlaced" fill="#affc41a2" />
              </BarChart>
            </ResponsiveContainer>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      {/* <EuiPanel paddingSize="l" style={{ minWidth: "80%", height: "30vh" }}>
        <EuiFlexGroup style={{ height: "100%" }}>
        <EuiFlexItem></EuiFlexItem>
        <EuiFlexItem>
        
        </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel> */}
    </>
  );
}

export default Charts;
