import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faSyringe,
  faGlobe,
  faUser,
  faBookOpen,
  faCashRegister,
  faMoneyCheckDollar,
  faXRay,
  faFlaskVial,
  faFlask,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";

function SidebarComp() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState();
  const navigate = useNavigate();
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    navigate(menuItem);
  };

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        width="220px"
        collapsedWidth="70px"
        transitionDuration={500}
        className="sidebar"
      >
        <Menu>
          <FontAwesomeIcon
            icon={collapsed ? faBars : faBars}
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          />
          <h6 className="sidebar-ctgry" style={{ marginTop: "20px" }}>
            Menu
          </h6>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "dashboard" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faHouse} />}
              onClick={() => handleMenuItemClick("dashboard")}
            >
              Dashboard
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "testAndPackages" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faSyringe} />}
              onClick={() => handleMenuItemClick("testAndPackages")}
            >
              Tests / Packages
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "agency" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faGlobe} />}
              onClick={() => handleMenuItemClick("agency")}
            >
              Agency
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "customers" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faUser} />}
              onClick={() => handleMenuItemClick("customers")}
            >
              Customers
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "users" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faUser} />}
              onClick={() => handleMenuItemClick("users")}
            >
              Users
            </MenuItem>
          </div>
          <h6 className="sidebar-ctgry" style={{ marginTop: "20px" }}>
            Roles
          </h6>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "dashboard" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faBookOpen} />}
              onClick={() => handleMenuItemClick("dashboard")}
            >
              Reception
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "cashierList" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faCashRegister} />}
              onClick={() => handleMenuItemClick("cashierList")}
            >
              Cashier
            </MenuItem>
          </div>
          {/* <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "accounts" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faMoneyCheckDollar} />}
              onClick={() => handleMenuItemClick("accounts")}
            >
              Accounts
            </MenuItem>
          </div> */}
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "xrayList" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faXRay} />}
              onClick={() => handleMenuItemClick("xrayList")}
            >
              X-Ray
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "miniLabList" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faFlask} />}
              onClick={() => handleMenuItemClick("miniLabList")}
            >
              Mini-lab
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={selectedMenuItem === "labList" ? "selected-menu-item" : ""}
              icon={<FontAwesomeIcon icon={faFlaskVial} />}
              onClick={() => handleMenuItemClick("labList")}
            >
              Lab
            </MenuItem>
          </div>
          
          {/* <div to="test" className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "test" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faUserDoctor} />}
              onClick={() => handleMenuItemClick("test")}
            >
              Doctor
            </MenuItem>
          </div> */}
        </Menu>
      </Sidebar>
    </>
  );
}
export default SidebarComp;
