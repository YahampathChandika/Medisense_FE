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
  const [selectedMenuItem, setSelectedMenuItem] = useState("Items"); // Default selection

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <>
        <Sidebar
          collapsed={collapsed}
          width="206px"
          collapsedWidth="70px"
          transitionDuration={500}
          className="sidebar"
        >
          <Menu>
            {/* <button
              className="login-right-btn btn btn-dark collapse-btn"
              onClick={() => setCollapsed(!collapsed)}
            > */}
              <FontAwesomeIcon icon={collapsed ? faBars : faBars} className="collapse-btn" onClick={() => setCollapsed(!collapsed)}/>
            {/* </button> */}
            <h6 className="sidebar-ctgry" style={{marginTop:'20px'}}>Menu</h6>
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
            <Link to="gcc" className="sidebar-link">
              <MenuItem
                className={
                  selectedMenuItem === "allPatients" ? "selected-menu-item" : ""
                }
                icon={<FontAwesomeIcon icon={faSyringe} />}
                onClick={() => handleMenuItemClick("allPatients")}
              >
                Tests / Packages
              </MenuItem>
            </Link>
            <Link to="opdTest" className="sidebar-link">
              <MenuItem
                className={
                  selectedMenuItem === "opdTest" ? "selected-menu-item" : ""
                }
                icon={<FontAwesomeIcon icon={faGlobe} />}
                onClick={() => handleMenuItemClick("opdTest")}
              >
                Agency
              </MenuItem>
            </Link>
            <Link to="createPackage" className="sidebar-link">
              <MenuItem
                className={
                  selectedMenuItem === "cashier" ? "selected-menu-item" : ""
                }
                icon={<FontAwesomeIcon icon={faUser} />}
                onClick={() => handleMenuItemClick("cashier")}
              >
                Users
              </MenuItem>
            </Link>
            <h6 className="sidebar-ctgry" style={{marginTop:'20px'}}>Roles</h6>
            <Link to="dashboard" className="sidebar-link">
              <MenuItem
                className={
                  selectedMenuItem === "Items" ? "selected-menu-item" : ""
                }
                icon={<FontAwesomeIcon icon={faBookOpen} />}
                onClick={() => handleMenuItemClick("Items")}
              >
                Reception
              </MenuItem>
            </Link>
            <Link to="reception" className="sidebar-link">
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
            <Link to="cashier" className="sidebar-link">
              <MenuItem
                className={
                  selectedMenuItem === "cashier" ? "selected-menu-item" : ""
                }
                icon={<FontAwesomeIcon icon={faMoneyCheckDollar} />}
                onClick={() => handleMenuItemClick("cashier")}
              >
                Accounts
              </MenuItem>
            </Link>
            <Link to="cashier" className="sidebar-link">
              <MenuItem
                className={
                  selectedMenuItem === "cashier" ? "selected-menu-item" : ""
                }
                icon={<FontAwesomeIcon icon={faXRay} />}
                onClick={() => handleMenuItemClick("cashier")}
              >
                X-Ray
              </MenuItem>
            </Link>
            <Link to="cashier" className="sidebar-link">
              <MenuItem
                className={
                  selectedMenuItem === "cashier" ? "selected-menu-item" : ""
                }
                icon={<FontAwesomeIcon icon={faFlaskVial} />}
                onClick={() => handleMenuItemClick("cashier")}
              >
                Lab
              </MenuItem>
            </Link>
            <Link to="cashier" className="sidebar-link">
              <MenuItem
                className={
                  selectedMenuItem === "cashier" ? "selected-menu-item" : ""
                }
                icon={<FontAwesomeIcon icon={faFlask} />}
                onClick={() => handleMenuItemClick("cashier")}
              >
                Mini-lab
              </MenuItem>
            </Link>
            <Link to="cashier" className="sidebar-link">
              <MenuItem
                className={
                  selectedMenuItem === "cashier" ? "selected-menu-item" : ""
                }
                icon={<FontAwesomeIcon icon={faUserDoctor} />}
                onClick={() => handleMenuItemClick("cashier")}
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
