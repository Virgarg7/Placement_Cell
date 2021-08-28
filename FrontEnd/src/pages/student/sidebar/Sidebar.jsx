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
import { FiSettings } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";

import logo from "../../../assets/app-logo.svg";

function Sidebar({ current }) {
  const [navbarCollapse, setnavbarCollapse] = useState(false);
  return (
    <ProSidebar
      style={{ height: "100%", minHeight: "100vh" }}
      collapsed={navbarCollapse}
    >
      <SidebarHeader>
        <div className="logo">
          <img src={logo} alt="Aurora Logo" />
          <span>AURORA</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle" popperArrow>
          {/* <MenuItem
            icon={<RiDashboardLine />}
            className={current === "dashboard" ? "active" : ""}
          >
            Dashboard <Link to="/student" />
          </MenuItem> */}
          <MenuItem
            icon={<FaUserGraduate />}
            className={current === "resume" ? "active" : ""}
          >
            Resumes
            <Link to="/student/allresumes" />
          </MenuItem>

          <SubMenu
            title="Opportunities"
            icon={<MdComputer />}
            className={current === "opportunity" ? "active" : ""}
          >
            <MenuItem>
              Eligible Oportunities <Link to="/student/eligibleOpportunities" />
            </MenuItem>
            <MenuItem>
              All Oportunities <Link to="/student/allOpportunities" />
            </MenuItem>
          </SubMenu>

          <MenuItem
            icon={<CgNotes />}
            className={current === "applications" ? "active" : ""}
          >
            Applications <Link to="/student/applications" />
          </MenuItem>

          <MenuItem
            icon={<FiSettings />}
            className={current === "profile" ? "active" : ""}
          >
            Profile <Link to="/student/profile" />
          </MenuItem>
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
export default Sidebar;
