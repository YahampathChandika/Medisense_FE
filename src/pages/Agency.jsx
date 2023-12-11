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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSearch, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import AddAgency from "../components/modals/AddAgency";
import { useGetAllAgencyQuery } from "../store/api/agencyApi";

function Agency() {
  const [isAgencyRegistrationOpen, setAgencyRegistrationOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const handleTestOpen = () => setAgencyRegistrationOpen(true);
  const handleTestClose = () => setAgencyRegistrationOpen(false);
  const handleUpdateOpen = (id) => setUpdateOpen(id);
  const handleUpdatecloce = () => setUpdateOpen(false);

  const { data: getAllAgency } = useGetAllAgencyQuery();
  
  console.log("get All Agency ", getAllAgency);

  

  const data = getAllAgency?.payload;

  return (
    <div style={{ width: "100%" }}>
      <Container className="gcc-con">
        <Header>
          <FlexboxGrid justify="start">
            <FlexboxGrid.Item colspan={20} className="main-title">
              Agencies
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
                    placeholder="Search Agencies ..."
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
                  onClick={handleTestOpen}
                >
                  Add Agency
                </Button>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
          <div style={{ overflowY: "auto", width: "auto", minHeight: "550px" }}>
            <Table responsive>
              <thead className="selectedpackages-table-head">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="selectedpackages-table-body">
                {getAllAgency?.payload?.map((test, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{test.name}</td>
                    <td>{test.address}</td>
                    <td>{test.email}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faPen}
                        style={{ color: "#000000", marginRight: "20px" }}
                        onClick={() => handleUpdateOpen(test.id)}

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
        <AddAgency
          open={isAgencyRegistrationOpen}
          handleClose={handleTestClose}
          agencyhead="Add Agency"
          buttonName="Register"
        />
        <AddAgency
          open={updateOpen}
          handleClose={handleUpdatecloce}
          id={updateOpen}
          agencyhead="Update Agency"
          buttonName="Update"
        />
      </Container>
    </div>
  );
}

export default Agency;
