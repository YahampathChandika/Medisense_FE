import React, { useState } from "react";
import {
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Header,
  Input,
  InputGroup,
} from "rsuite";
import { mockData } from "../assets/mocks/mockData";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSearch, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import UserRegistration from "../components/modals/UserRegistration";
import { useGetAllUsersQuery } from "../store/api/userApi";

function Users() {
  const [isUserRegistrationOpen, setUserRegistrationOpen] = useState(false);
  const handleTestOpen = () => setUserRegistrationOpen(true);
  const handleTestClose = () => setUserRegistrationOpen(false);
  const { data : getAllUsers } = useGetAllUsersQuery();
  console.log("users" ,getAllUsers)

  const data = mockData(10);

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
                  <Input placeholder="Search Users ..." style={{ margin: 0 }} />
                  <InputGroup.Button>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Button>
                </InputGroup>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={6} className="justify-end flex">
                <Button
                  className="w-40 h-10 bg-blue-800 text-white"
                  onClick={handleTestOpen}
                >
                  Add User
                </Button>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
          <div style={{ overflowY: "auto", width: "auto" }}>
            <Table responsive>
              <thead className="selectedpackages-table-head">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="selectedpackages-table-body">
                {data.map((test, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{test.description}</td>
                    <td>{test.role}</td>
                    <td>{test.email}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faPen}
                        style={{ color: "#000000", marginRight: "20px" }}
                      />
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ color: "#A30D11" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <UserRegistration
          open={isUserRegistrationOpen}
          handleClose={handleTestClose}
        />
      </Container>
    </div>
  );
}

export default Users;
