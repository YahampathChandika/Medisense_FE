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
import { Link } from "react-router-dom";

function SidebarComp() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState();

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
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
          <Link to="dashboard" className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "Items" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faHouse} />}
              onClick={() => handleMenuItemClick("Items")}
            >
              Dashboard
            </MenuItem>
          </Link>
          <Link to="createPackage" className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "Tests" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faSyringe} />}
              onClick={() => handleMenuItemClick("Tests")}
            >
              Tests / Packages
            </MenuItem>
          </Link>
          <Link to="addAgency" className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "addAgency" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faGlobe} />}
              onClick={() => handleMenuItemClick("addAgency")}
            >
              Agency
            </MenuItem>
          </Link>
          <Link to="customers" className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "customers" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faUser} />}
              onClick={() => handleMenuItemClick("customers")}
            >
              Customers
            </MenuItem>
          </Link>
          <Link to="users" className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "users" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faUser} />}
              onClick={() => handleMenuItemClick("users")}
            >
              Users
            </MenuItem>
          </Link>
          <h6 className="sidebar-ctgry" style={{ marginTop: "20px" }}>
            Roles
          </h6>
          <Link to="dashboard" className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "Reception" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faBookOpen} />}
              onClick={() => handleMenuItemClick("Reception")}
            >
              Reception
            </MenuItem>
          </Link>
          <Link to="cashier" className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "allPatients" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faCashRegister} />}
              onClick={() => handleMenuItemClick("allPatients")}
            >
              Cashier
            </MenuItem>
          </Link>
          <Link to="opdTest" className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "Accounts" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faMoneyCheckDollar} />}
              onClick={() => handleMenuItemClick("Accounts")}
            >
              Accounts
            </MenuItem>
          </Link>
          <Link to="xray" className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "opdTest" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faXRay} />}
              onClick={() => handleMenuItemClick("opdTest")}
            >
              X-Ray
            </MenuItem>
          </Link>
          <Link to="lab" className="sidebar-link">
            <MenuItem
              className={selectedMenuItem === "Lab" ? "selected-menu-item" : ""}
              icon={<FontAwesomeIcon icon={faFlaskVial} />}
              onClick={() => handleMenuItemClick("Lab")}
            >
              Lab
            </MenuItem>
          </Link>
          <Link to="miniLab" className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "Mini-lab" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faFlask} />}
              onClick={() => handleMenuItemClick("Mini-lab")}
            >
              Mini-lab
            </MenuItem>
          </Link>
          <Link to="test" className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "test" ? "selected-menu-item" : ""
              }
              icon={<FontAwesomeIcon icon={faUserDoctor} />}
              onClick={() => handleMenuItemClick("test")}
            >
              Doctor
            </MenuItem>
          </Link>
        </Menu>
      </Sidebar>
    </>
  );
}
export default SidebarComp;
