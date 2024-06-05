import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faCoins,
  faUserFriends,
  faCaretDown,
  faCaretUp,
  faSort,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import dummyImg from "../assets/images/dummy.jpg";
import { Table } from "react-bootstrap";
import {
  useGetCashierListMatricesQuery,
  useGetCashierListQuery,
} from "../store/api/cashierApi";
import { useNavigate } from "react-router-dom";
import { useGetMinilabListQuery } from "../store/api/minilabApi";
import { useGetXrayListQuery } from "../store/api/xray";

function XrayList() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sortConfig, setSortConfig] = useState({ key: null, order: "asc" });
  const {
    data: Minilab,
    isLoading,
    isError,
    refetch: Minilabrefetch,
  } = useGetMinilabListQuery();

  const { data: cashierMatrices, refetch: cashierMatricesrefetch } =
    useGetCashierListMatricesQuery();

  const { data: xrayList } = useGetXrayListQuery();
  console.log("xraydata", xrayList);

  const xrayData = xrayList?.payload ?? []; // Default to an empty array if payload is undefined

  console.log("xraydata", xrayData);

  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    setSortConfig({ key: "time", order: "asc" });
    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    const day = date.getDate();
    const suffix =
      day >= 11 && day <= 13
        ? "th"
        : ["st", "nd", "rd"][(day % 10) - 1] || "th";
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return (
      <div className="flex items-top">
        <span className="text-xl">{day}</span>
        <span className="text-sm inline-block align-top mr-1">{suffix}</span>
        <span className="text-xl">
          {" "}
          {month} {year}
        </span>
      </div>
    );
  };

  const formattedDate = formatDate(currentDate);
  const formattedDayAndTime = `${currentDate.toLocaleDateString(undefined, {
    weekday: "long",
  })} | ${currentDate.toLocaleTimeString()}`;

  const handleSort = (key) => {
    let order = "asc";
    if (sortConfig.key === key && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ key, order });
  };

  const sortedData = () => {
    if (!sortConfig.key) {
      return xrayData;
    }

    const sorted = [...xrayData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.key === "time") {
        return sortConfig.order === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.order === "asc" ? aValue - bValue : bValue - aValue;
    });

    return sorted;
  };

  return (
    <Container className="pt-10">
      <Row>
        <Col className="text-gray-800 text-2xl font-bold mx-5">
          {formattedDate}
        </Col>
        <Col className="text-gray-700 text-lg font-light">
          {formattedDayAndTime}
        </Col>
      </Row>
      <Row className="flex items-center mt-5 mx-5">
        <Col className="flex flex-col items-start w-1/5 h-auto rounded-lg text-blue-500 bg-blue-100 p-4">
          <FontAwesomeIcon icon={faUserFriends} className="h-12 w-12 py-1" />
          <span className="font-bold text-2xl">
            0{cashierMatrices?.payload.customersWaiting || 0}
          </span>
          <span className="text-md font-semibold">Customers Waiting</span>
        </Col>
        <Col className="flex flex-col items-start w-1/5 h-auto rounded-lg text-blue-500 bg-blue-100 p-4 mx-5">
          <FontAwesomeIcon icon={faDroplet} className="h-12 w-12 py-1" />
          <span className="font-bold text-2xl">
            0{cashierMatrices?.payload.customersPaid || 0}
          </span>
          <span className="text-md font-semibold">
            Customers Blood Extracted
          </span>
        </Col>
        <Col className="flex flex-col items-start w-1/5 h-auto rounded-lg text-blue-500 bg-blue-100 p-4">
          <FontAwesomeIcon icon={faCoins} className="h-12 w-12 py-1" />
          <span className="font-bold text-2xl">
            Rs. {cashierMatrices?.payload.todaysIncome || 0}.00
          </span>
          <span className="text-md font-semibold">Today's Income</span>
        </Col>
      </Row>
      <Row className="text-gray-700 text-2xl font-bold mt-5 mx-5">
        X-Ray Waiting List
      </Row>
      <Row className="">
        <Table striped hover className="text-left table-fixed mt-4">
          <thead>
            <tr>
              <th
                className="patient-table-head-name"
                style={{ width: "15%" }}
                onClick={() => handleSort("time")}
              >
                Time
                <FontAwesomeIcon
                  icon={
                    sortConfig.key === "time"
                      ? sortConfig.order === "asc"
                        ? faCaretUp
                        : faCaretDown
                      : faSort
                  }
                  style={{ paddingLeft: "8px" }}
                />
              </th>

              <th
                className="patient-table-head"
                style={{ width: "30%" }}
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
                  style={{ paddingLeft: "8px" }}
                />
              </th>

              <th
                className="patient-table-head"
                style={{ width: "25%" }}
                onClick={() => handleSort("contactNo")}
              >
                Contact
                <FontAwesomeIcon
                  icon={
                    sortConfig.key === "contactNo"
                      ? sortConfig.order === "asc"
                        ? faCaretUp
                        : faCaretDown
                      : faSort
                  }
                  style={{ paddingLeft: "8px" }}
                />
              </th>

              <th
                className="patient-table-head"
                style={{ width: "20%" }}
                onClick={() => handleSort("medicalType")}
              >
                Medical
                <FontAwesomeIcon
                  icon={
                    sortConfig.key === "medicalType"
                      ? sortConfig.order === "asc"
                        ? faCaretUp
                        : faCaretDown
                      : faSort
                  }
                  style={{ paddingLeft: "8px" }}
                />
              </th>

              <th className="patient-table-head"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <p className="text-gray-500">Loading...</p>
                </td>
              </tr>
            ) : (
              sortedData().map((patient) => (
                <tr
                  key={patient.customerId}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(
                      `/home/xray/${patient.customerId}/${patient.admissionId}`
                    )
                  }
                >
                  <td
                    className="patientf-table-data"
                    style={{ paddingLeft: "5%", borderStyle: "none" }}
                  >
                    {patient.time.substring(0, 5)}
                  </td>

                  <td
                    className=" "
                    style={{
                      display: "flex ",
                      flexDirection: "row",
                      border: "none",
                      paddingLeft: "10%",
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
                  <td className=" patient-table-data">{patient.contactNo}</td>
                  <td className=" patient-table-data ">
                    {patient.medicalType}
                  </td>
                  <td style={{ borderStyle: "none", cursor: "pointer" }}>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      style={{
                        color: "black",
                        paddingLeft: "40%",
                        borderStyle: "none",
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
            {xrayData?.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  <p className="text-gray-500">No data to display.</p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default XrayList;
