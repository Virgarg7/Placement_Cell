import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "./custom.scss";
import { FaUserGraduate } from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import { RiDashboardLine, RiFullscreenFill } from "react-icons/ri";
import { BiGitBranch } from "react-icons/bi";

import logo from "../../../assets/app-logo.png";

function SidebarNew({ current }) {
  const [navbarCollapse, setnavbarCollapse] = useState(false);
  return (
    <ProSidebar
      style={{ height: "100%", minHeight: "100vh" }}
      collapsed={navbarCollapse}
    >
      <SidebarHeader>
        <div className="logo">
          <img src={logo} alt="Aurora Logo" />
          <span>NITJ</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle" popperArrow>
          <MenuItem
            icon={<RiDashboardLine />}
            className={current === "dashboard" ? "active" : ""}
          >
            Dashboard <Link to="/admin" />
          </MenuItem>
          <SubMenu
            icon={<FaUserGraduate />}
            title="Students Management"
            className={current === "userManagement" ? "active" : ""}
            defaultOpen={current === "userManagement" ? true : false}
          >
            <MenuItem>
              All Students
              <Link to="/admin/allStudents" />
            </MenuItem>
            <MenuItem>
              Add Bulk Students
              <Link to="/admin/addBulkStudents" />
            </MenuItem>
            <MenuItem>
              Add Student
              <Link to="/admin/addStudents" />
            </MenuItem>
          </SubMenu>
          <SubMenu
            title="Streams"
            icon={<BiGitBranch />}
            className={current === "streams" ? "active" : ""}
            defaultOpen={current === "streams" ? true : false}
          >
            <MenuItem>
              All Streams <Link to="/admin/allStreams" />
            </MenuItem>
            <MenuItem>
              Add Streams <Link to="/admin/createStream" />
            </MenuItem>
          </SubMenu>
          <SubMenu
            title="Opportunities"
            icon={<MdComputer />}
            className={current === "opportunity" ? "active" : ""}
            defaultOpen={current === "opportunity" ? true : false}
          >
            <MenuItem>
              All Oportunities <Link to="/admin/allOpportunities" />
            </MenuItem>
            <MenuItem>
              Add Opportunities <Link to="/admin/addOpportunity" />
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Menu iconShape="circle">
          <MenuItem
            icon={<RiFullscreenFill />}
            onClick={() => setnavbarCollapse((prevState) => !prevState)}
          >
            Collapse
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
}
export default SidebarNew;
