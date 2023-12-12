import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPen,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import "../../../assets/css/Users.css";
import image from "../../../assets/images/dummy-profile-_new.jpg";
import UserRegistration from "../../modals/UserRegistration";

function UsersTable({ data, Loding, searchQuery  }) {
  console.log("data", data);
  const [testOpen, setTestOpen] = useState(false);
  const handleTestOpen = (id) => setTestOpen(id);
  const [sortConfig, setSortConfig] = useState({ key: null, order: "asc" });

  const handleSort = (key) => {
    let order = "asc";
    if (sortConfig.key === key && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ key, order });
  };

 
  const filteredData = () => {
    const filtered = (data ?? []).filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      return (
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.roles.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.contactNo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    return filtered;
  };

  const sortedData = () => {
    if (sortConfig.key) {
      const sorted = [...filteredData()].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.order === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.order === "asc" ? 1 : -1;
        }
        return 0;
      });
      return sorted;
    }
    return filteredData();
  };

  return (
    <div
      style={{
        maxHeight: "585px",
        overflowY: "auto",
        width: "auto",
        minHeight: "585px",
      }}
    >
      <Table striped className="text-left table-fixed">
        <thead>
          <tr>
            <th
              className="users-table-head-name"
              style={{ width: "25%" }}
              onClick={() => handleSort("firstName")}
            >
              Name
              {/* <FontAwesomeIcon
                icon={faCaretDown}
                style={{ paddingLeft: "5px" }}
              /> */}
            </th>
            <th
              className="users-table-head"
              style={{ width: "30%" }}
              onClick={() => handleSort("email")}
            >
              Email
              {/* <FontAwesomeIcon
                icon={faCaretDown}
                style={{ paddingLeft: "5px" }}
              /> */}
            </th>
            <th
              className="users-table-head"
              style={{ width: "15%" }}
              onClick={() => handleSort("role")}
            >
              Role
              {/* <FontAwesomeIcon
                icon={faCaretDown}
                style={{ paddingLeft: "5px" }}
              /> */}
            </th>
            <th
              className="users-table-head"
              style={{ width: "15%" }}
              onClick={() => handleSort("contactNo")}
            >
              Contact No
              {/* <FontAwesomeIcon
                icon={faCaretDown}
                style={{ paddingLeft: "5px" }}
              /> */}
            </th>
            <th className="users-table-head" style={{ width: "1px" }}></th>
            <th className="users-table-head " style={{ width: "20px" }}></th>
          </tr>
        </thead>
        <tbody className="usersTabble-table-body">
          {Loding ? (
            <div>Is Loding....</div>
          ) : (
            sortedData().map((users, index) => (
              <tr key={index}>
                <td
                  className=" "
                  style={{
                    display: "flex ",
                    flexDirection: "row",
                    paddingLeft: "20%",
                    border: "none",
                  }}
                >
                  <img
                    src={users.img || image}
                    alt="users"
                    className="users-image "
                  />
                  {users.firstName} {users.lastName}
                </td>
                <td className=" users-table-data">{users.email}</td>
                <td className="users-table-data">
                  <p> {users?.roles?.role}</p>
                </td>
                <td className=" users-table-data ">{users.contactNo}</td>
                <td className="users-table-icon">
                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => handleTestOpen(users.id)}
                  />
                </td>
                <td className="users-table-icon-pen">
                  <FontAwesomeIcon icon={faTrashCan} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <UserRegistration
        open={testOpen !== false}
        handleClose={() => setTestOpen(false)}
        userTitle="User Update"
        buttonName="Update"
        id={testOpen}
      />
    </div>
  );
}

export default UsersTable;
