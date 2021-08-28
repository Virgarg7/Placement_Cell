import React, { useState } from "react";

import { EuiSideNav } from "@elastic/eui";
import { useHistory } from "react-router-dom";

const Sidebar = ({ current }) => {
  const history = useHistory();
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const sideNav = [
    {
      name: "User Management",
      id: 0,
      items: [
        {
          name: "All users",
          id: 1,
          onClick: () => {
            history.push("/allUsers");
          },
          // isSelected: true,
        },
        {
          name: "Add New User",
          id: 2,
          onClick: () => {
            history.push("/createUser");
          },
        },
        {
          name: "Add Bulk Users",
          id: 3,
          onClick: () => {
            history.push("/createBulkUsers");
          },
        },
      ],
    },
  ];

  return (
    <EuiSideNav
      aria-label="Basic example"
      mobileTitle="Navigate within $APP_NAME"
      toggleOpenOnMobile={() => toggleOpenOnMobile()}
      isOpenOnMobile={isSideNavOpenOnMobile}
      style={{
        width: 192,
        height: "100vh",
        borderRight: "0.1rem solid gray",
        overflow: "hidden",
      }}
      items={sideNav}
    />
  );
};

export default Sidebar;
