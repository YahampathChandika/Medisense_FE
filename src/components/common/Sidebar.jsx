import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBars, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/Sidebar.css";
import { Link } from "react-router-dom";

function SidebarComp() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Items"); // Default selection

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <>
      <div className="home-container">
        <Sidebar
          collapsed={collapsed}
          width="250px"
          collapsedWidth="80px"
          transitionDuration={500}
          backgroundColor="#ffffff"
        >
          <Menu>
            <button
              className="login-right-btn btn btn-dark collapse-btn"
              onClick={() => setCollapsed(!collapsed)}
            >
              <FontAwesomeIcon icon={collapsed ? faBars : faBars} />
            </button>
            <Link to="dashboard" className="sidebar-link">
              <MenuItem
                className={
                  selectedMenuItem === "Items" ? "selected-menu-item" : ""
                }
                icon={<FontAwesomeIcon icon={faLayerGroup} />}
                onClick={() => handleMenuItemClick("Items")}
              >
                Dashboard
              </MenuItem>
            </Link>
            <Link to="reception" className="sidebar-link">
              <MenuItem
                className={
                  selectedMenuItem === "allPatients" ? "selected-menu-item" : ""
                }
                icon={<FontAwesomeIcon icon={faBed} />}
                onClick={() => handleMenuItemClick("allPatients")}
              >
                Reception
              </MenuItem>
            </Link>
            <Link to="cashier" className="sidebar-link">
              <MenuItem
                className={
                  selectedMenuItem === "cashier" ? "selected-menu-item" : ""
                }
                icon={<FontAwesomeIcon icon={faLayerGroup} />}
                onClick={() => handleMenuItemClick("cashier")}
              >
                Cashier
              </MenuItem>
            </Link>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
export default SidebarComp;
