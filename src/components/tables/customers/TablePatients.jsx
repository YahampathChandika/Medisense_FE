import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faSort,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import "../../../assets/css/Patients.css";
import dummyImg from "../../../assets/images/dummy.jpg";
import FailModal from "../../modals/Fail";
import {
  useDeleteCustomerMutation,
  useGetAllCustomersQuery,
} from "../../../store/api/customerApi";
import { useNavigate } from "react-router-dom";

function TablePatients({ data, activeButton }) {
  const { refetch } = useGetAllCustomersQuery();
  const [deleteCustomer] = useDeleteCustomerMutation();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, order: "asc" });
  const handleDeleteOpen = (id) => {
    setDeleteOpen(id), console.log("handleDelete", id);
  };
  const handleDeleteclose = () => setDeleteOpen(false);
  const navigate = useNavigate();

  const handleSort = (key) => {
    let order = "asc";
    if (sortConfig.key === key && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ key, order });
  };

  const sortedData = () => {
    if (sortConfig.key) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.order === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.order === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  };

  console.log("DD", data)
  const filteredData = data.filter((patient) => {
    return patient.medical === activeButton;
  });

  return (
    <div style={{ maxHeight: "450px", overflowY: "auto", width: "auto" }}>
      <Table striped hover className="text-left table-fixed">
        <thead>
          <tr>
            <th
              className="patient-table-head-name"
              style={{ width: "25%" }}
              onClick={() => handleSort("fullName")}
            >
              Name
              <FontAwesomeIcon
                icon={
                  sortConfig.key === "fullName"
                    ? sortConfig.order === "asc"
                      ? faCaretUp
                      : faCaretDown
                    : faSort
                }
                style={{ paddingLeft: "5px" }}
              />
            </th>
            <th
              className="patient-table-head"
              style={{ width: "30%" }}
              onClick={() => handleSort("mobileNo")}
            >
              Contact
              <FontAwesomeIcon
                icon={
                  sortConfig.key === "mobileNo"
                    ? sortConfig.order === "asc"
                      ? faCaretUp
                      : faCaretDown
                    : faSort
                }
                style={{ paddingLeft: "5px" }}
              />
            </th>
            <th
              className="patient-table-head"
              style={{ width: "15%" }}
              onClick={() => handleSort("status")}
            >
              Status
              <FontAwesomeIcon
                icon={
                  sortConfig.key === "status"
                    ? sortConfig.order === "asc"
                      ? faCaretUp
                      : faCaretDown
                    : faSort
                }
                style={{ paddingLeft: "5px" }}
              />
            </th>
            <th
              className="patient-table-head"
              style={{ width: "15%" }}
              onClick={() => handleSort("medical")}
            >
              Medical
              <FontAwesomeIcon
                icon={
                  sortConfig.key === "medical"
                    ? sortConfig.order === "asc"
                      ? faCaretUp
                      : faCaretDown
                    : faSort
                }
                style={{ paddingLeft: "5px" }}
              />
            </th>
            <th className="patient-table-head" style={{ width: "1px" }}></th>
            <th className="patient-table-head " style={{ width: "20px" }}></th>
          </tr>
        </thead>
        <tbody>
          {(activeButton === "total" ? sortedData() : filteredData).map(
            (patient) => (
              <tr key={patient.id}>
                <td
                  className=" "
                  onClick={() => navigate(`/home/customerDetails/${patient.customerId}/${patient.admissionId}`)}
                  style={{
                    display: "flex ",
                    flexDirection: "row",
                    paddingLeft: "20%",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  <img
                    src={
                      patient.image
                        ? `http://localhost:3002/${patient.image}`
                        : dummyImg
                    }
                    alt="Patient"
                    className="patient-image"
                  />

                  {patient.fullName}
                </td>
                <td className=" patient-table-data">{patient.email}</td>
                <td
                  className={` patient-table-data ${
                    patient.status === "Paid"
                      ? "class-for-status1"
                      : "class-for-status2"
                  }`}
                >
                  <p> {patient.status}</p>
                </td>
                <td className=" patient-table-data ">{patient.medical}</td>
                <td className="patient-table-icon">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={() => navigate("/home/gcc?testType=true")}
                  />
                </td>
                <td className="patient-table-icon-pen">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteOpen(patient.id)}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
      <FailModal
        open={deleteOpen !== false}
        handleClose={handleDeleteclose}
        headtxt="Delete Customer"
        bodytxt="Are you sure you want to delete this Customer? This action cannot be undone."
        btntxt="Delete"
        id={deleteOpen}
        deleteApi={deleteCustomer}
        refetchTable={refetch}
      />
    </div>
  );
}

export default TablePatients;
