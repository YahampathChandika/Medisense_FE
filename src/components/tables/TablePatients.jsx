import React from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faTrashCan,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/Patients.css";
function TablePatients({ data }) {
  const status = data.status;
  console.log(status);
  // const CheckStatus() => {
  //     if( CheckStatus === status 1) {

  //     }
  // }
  return (
    <div className="mt-14 " style={{ maxHeight: "400px", overflowY: "auto"  }}>
      <Table striped bordered hover className="text-left ">
        <thead>
          <tr>
            <th className="px-5 patient-table-data" style={{ width: "25%" }}>
              Name
            </th>
            <th className="px-5 patient-table-data" style={{ width: "30%" }}>
              Contact
            </th>
            <th className="px-5 patient-table-data" style={{ width: "15%" }}>
              Status
            </th>
            <th className="px-5 patient-table-data" style={{ width: "15%" }}>
              Medical
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((patient, index) => (
            <tr key={index}>
              <td className="px-5 patient-table-data">
                <FontAwesomeIcon icon={faCircleUser} className="pe-4" />
                {patient.code}
              </td>
              <td className="px-5 patient-table-data">{patient.code}</td>
              <td
                className={`px-5 patient-table-data ${
                  patient.status === "status 1"
                    ? "class-for-status1"
                    : "class-for-status2"
                }`}
              >
                <p> {patient.status}</p>
              </td>
              <td className="px-5 patient-table-data ">{patient.code}</td>
              <td className="patient-table-icon">
                <FontAwesomeIcon icon={faTrashCan} />
              </td>
              <td className="patient-table-icon-pen">
                <FontAwesomeIcon icon={faPen} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TablePatients;
