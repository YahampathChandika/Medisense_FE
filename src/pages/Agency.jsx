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
import { faPenToSquare, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddAgency from "../components/modals/AddAgency";
import {
  useDeleteAgencyMutation,
  useGetAllAgencyQuery,
} from "../store/api/agencyApi";
import FailModal from "../components/modals/Fail";

function Agency() {
  const [isAgencyRegistrationOpen, setAgencyRegistrationOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleAgencyOpen = () => setAgencyRegistrationOpen(true);
  const handleAgencyClose = () => setAgencyRegistrationOpen(false);
  const handleUpdateOpen = (id) => setUpdateOpen(id);
  const handleUpdatecloce = () => setUpdateOpen(false);
  const handleDeletecloce = () => setDeleteOpen(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: getAllAgency } = useGetAllAgencyQuery();
  const [deleteAgency] = useDeleteAgencyMutation();
  const { refetch } = useGetAllAgencyQuery();

  console.log("get All Agency ", getAllAgency);

  const handleDeleteOpen = (id) => setDeleteOpen(id);
  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredAgencies = getAllAgency?.payload?.filter(
    (agency) =>
      agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                    value={searchQuery}
                    onChange={(value) => handleSearch(value)}
                  />
                  <InputGroup.Button>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Button>
                </InputGroup>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={6} className="justify-end flex">
                <Button
                  className="w-40 h-10 bg-blue-800 text-white"
                  onClick={handleAgencyOpen}
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
                {filteredAgencies?.map((agency, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{agency.name}</td>
                    <td>{agency.address}</td>
                    <td>{agency.email}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "#000000", marginRight: "20px" }}
                        onClick={() => handleUpdateOpen(agency.id)}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => {
                          handleDeleteOpen(agency.id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
                {/* {filteredData && filteredData.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <p className="text-gray-500">No data to display.</p>
                    </td>
                  </tr>
                )} */}
              </tbody>
            </Table>
          </div>
        </div>
        <AddAgency
          open={isAgencyRegistrationOpen !== false}
          handleClose={handleAgencyClose}
          agencyhead="Add Agency"
          buttonName="Register"
        />
        <AddAgency
          open={updateOpen !== false}
          handleClose={handleUpdatecloce}
          id={updateOpen}
          agencyhead="Update Agency"
          buttonName="Update"
        />
        <FailModal
          open={deleteOpen !== false}
          handleClose={handleDeletecloce}
          headtxt="Delete Agency"
          bodytxt="Are you sure you want to delete this agency? This action cannot be undone."
          btntxt="Delete"
          id={deleteOpen}
          deleteApi={deleteAgency}
          refetchTable={refetch}
        />
      </Container>
    </div>
  );
}

export default Agency;
