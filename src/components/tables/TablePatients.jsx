import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faTrashCan,
  faPen,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/Patients.css";
function TablePatients({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: null, order: "asc" });

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
  return (
    <div className="" style={{ maxHeight: "450px", overflowY: "auto" , width:"auto"}}>
      <Table striped hover className="text-left table-fixed">
        <thead>
          <tr>
            <th
              className="patient-table-head-name"
              style={{ width: "25%" }}
              onClick={() => handleSort("name")}
            >
              Name
              <FontAwesomeIcon
                icon={faCaretDown}
                style={{ paddingLeft: "5px" }}
              />
            </th>
            <th
              className="patient-table-head"
              style={{ width: "30%" }}
              onClick={() => handleSort("contact")}
            >
              Contact
              <FontAwesomeIcon
                icon={faCaretDown}
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
                icon={faCaretDown}
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
                icon={faCaretDown}
                style={{ paddingLeft: "5px" }}
              />
            </th>
            <th className="patient-table-head" style={{width:"1px"}}></th>
            <th className="patient-table-head " style={{width:"20px"}}></th>
          </tr>
        </thead>
        <tbody>
          {sortedData().map((patient, index) => (
            <tr key={index}>
              <td className=" " style={{display:"flex " , flexDirection:"row" , paddingLeft:"100px"}}> 
                <img
                  src={patient.img}
                  alt="Patient"
                  className="patient-image "
                />
                {patient.name}
              </td>
              <td className=" patient-table-data">{patient.contact}</td>
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
                <FontAwesomeIcon icon={faPen} />
              </td>
              <td className="patient-table-icon-pen">
                <FontAwesomeIcon icon={faTrashCan} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TablePatients;
