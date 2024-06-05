import React, { useState } from "react";
import {
  Container,
  Divider,
  FlexboxGrid,
  Header,
  Input,
  InputGroup,
} from "rsuite";
import { Button, Table } from "react-bootstrap";
import image from "../assets/images/dummy.jpg";
import "../assets/css/Users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faPenToSquare,
  faSearch,
  faSort,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import UserRegistration from "../components/modals/UserRegistration";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../store/api/userApi";
import FailModal from "../components/modals/Fail";

function Users() {
  const [isUserRegistrationOpen, setUserRegistrationOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const handleUserOpen = () => setUserRegistrationOpen(true);
  const handleUserClose = () => setUserRegistrationOpen(false);
  const handleUpdateOpen = (id) => setUpdateOpen(id);
  const handleUpdateClose = () => setUpdateOpen(false);
  const handleDeleteOpen = (id) => {
    setDeleteOpen(id), console.log("handleDelete", id);
  };
  const handleDeleteclose = () => setDeleteOpen(false);
  const {
    data: getAllUsers,
    isLoading,
    isError,
    refetch,
  } = useGetAllUsersQuery();
  console.log("datas" , getAllUsers)
  const data = getAllUsers?.payload;
  const [deleteUser] = useDeleteUserMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, order: "asc" });

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

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
    <div style={{ width: "100%" }}>
      <Container className="gcc-con">
        <Header>
          <FlexboxGrid justify="start">
            <FlexboxGrid.Item colspan={20} className="main-title">
              Users
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>
        <Divider className="border-t-2 border-gray-300 mb-5 mt-2" />
        <div className="selectedpackages-main-con h-full">
          <div className="selectedpackages-table-top">
            <FlexboxGrid justify="space-between" className="m-3">
              <FlexboxGrid.Item colspan={11}>
                <InputGroup>
                  <Input
                    placeholder="Search Users ..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ margin: 0 }}
                  />
                  <InputGroup.Button>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Button>
                </InputGroup>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={6} className="justify-end flex">
                <Button
                  className="w-40 h-10 bg-blue-800 text-white"
                  onClick={handleUserOpen}
                >
                  Add User
                </Button>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
          <div>
            <Table striped className="text-left table-fixed">
              <thead>
                <tr>
                  <th
                    className="users-table-head-name"
                    style={{ width: "25%" }}
                    onClick={() => handleSort("firstName")}
                  >
                    Name
                    <FontAwesomeIcon
                      icon={
                        sortConfig.key === "firstName"
                          ? sortConfig.order === "asc"
                            ? faCaretUp
                            : faCaretDown
                          : faSort
                      }
                      style={{ paddingLeft: "5px" }}
                    />
                  </th>
                  <th
                    className="users-table-head"
                    style={{ width: "30%" }}
                    onClick={() => handleSort("email")}
                  >
                    Email
                    <FontAwesomeIcon
                      icon={
                        sortConfig.key === "email"
                          ? sortConfig.order === "asc"
                            ? faCaretUp
                            : faCaretDown
                          : faSort
                      }
                      style={{ paddingLeft: "5px" }}
                    />
                  </th>
                  <th
                    className="users-table-head"
                    style={{ width: "15%" }}
                    onClick={() => handleSort("role")}
                  >
                    Role
                    <FontAwesomeIcon
                      icon={
                        sortConfig.key === "role"
                          ? sortConfig.order === "asc"
                            ? faCaretUp
                            : faCaretDown
                          : faSort
                      }
                      style={{ paddingLeft: "5px" }}
                    />
                  </th>
                  <th
                    className="users-table-head"
                    style={{ width: "15%" }}
                    onClick={() => handleSort("contactNo")}
                  >
                    Contact No
                    <FontAwesomeIcon
                      icon={
                        sortConfig.key === "contactNo"
                          ? sortConfig.order === "asc"
                            ? faCaretUp
                            : faCaretDown
                          : faSort
                      }
                      style={{ paddingLeft: "5px" }}
                    />
                  </th>
                  <th
                    className="users-table-head"
                    style={{ width: "1px" }}
                  ></th>
                  <th
                    className="users-table-head "
                    style={{ width: "20px" }}
                  ></th>
                </tr>
              </thead>
              <tbody className="usersTabble-table-body">
                {isLoading ? (
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
                        {/* <img
                          src={users.img || image}
                          alt="users"
                          className="users-image "
                        /> */}
                        <img
                          src={
                            users.image
                              ? `http://localhost:3002/${users.image}`
                              : image
                          }
                          alt="Patient"
                          className="patient-image"
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
                          icon={faPenToSquare}
                          onClick={() => handleUpdateOpen(users.id)}
                        />
                      </td>
                      <td className="users-table-icon-pen">
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleDeleteOpen(users.id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
                {filteredData().length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <p className="text-gray-500">No data to display.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
        <UserRegistration
          open={isUserRegistrationOpen !== false}
          handleClose={handleUserClose}
          userTitle="User Registration"
          buttonName="Register"
        />
        <UserRegistration
          open={updateOpen !== false}
          handleClose={handleUpdateClose}
          userTitle="Update User"
          buttonName="Update"
          id={updateOpen}
          isUpdate={true}
        />
        <FailModal
          open={deleteOpen !== false}
          handleClose={handleDeleteclose}
          headtxt="Delete User"
          bodytxt="Are you sure you want to delete this User? This action cannot be undone."
          btntxt="Delete"
          id={deleteOpen}
          deleteApi={deleteUser}
          refetchTable={refetch}
        />
      </Container>
    </div>
  );
}

export default Users;
