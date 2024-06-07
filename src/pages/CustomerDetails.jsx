import React, { useState, useEffect, useRef } from "react";
import { Button, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCustomerQuery } from "../store/api/cashierApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Header, Divider, Col, Row, FlexboxGrid } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Gcc.css";
import {
  useGetMinilabListQuery,
  useGetMinilabgetCustomerQuery,
  useUpdateMiniLabStatusMutation,
} from "../store/api/minilabApi";
import Swal from "sweetalert2";
import { useGetLabListQuery } from "../store/api/labApi";
import {
  useGetAllCustomersQuery,
  useGetCustomerByIDQuery,
  useGetCustomerResultsQuery,
} from "../store/api/customerApi";
import { useReactToPrint } from "react-to-print";

function CustomerDetails() {
  const { customerId, admissionId } = useParams();
  const [sorting, setSorting] = useState({
    column: null,
    order: null,
  });

  const [updateMiniLabStatus] = useUpdateMiniLabStatusMutation();
  const { refetch: MiniLabrefetch } = useGetMinilabListQuery();
  const { refetch: Labrefetch } = useGetLabListQuery();
  //   const { data: minilabData } = useGetCustomerByIDQuery(customerId);
  //   const { data: customerData, isLoading, isError } = useGetAllCustomersQuery();
  const navigate = useNavigate();

  const { data: minilabData } = useGetCustomerResultsQuery({
    customerId: Number(customerId),
    admissionId: Number(admissionId),
  });

//   const { data: minilabData } = useGetCustomerResultsQuery({
//     customerId: 40,
//     admissionId: 43,
//   });

  console.log("dataaaaaaa", minilabData);

  const contentToPrint = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const handlePrint = useReactToPrint({
    documentTitle: "Report",
    onBeforePrint: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
    content: () => contentToPrint.current,
    removeAfterPrint: true,
  });

  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const form = useForm({
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const watchAllFields = watch("payment");

  const handleSort = (column) => {
    setSorting((prevSorting) => ({
      column,
      order:
        prevSorting.column === column && prevSorting.order === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const onSubmit = async (data) => {
    console.log("onSubmit", data);
    try {
      const response = await updateMiniLabStatus({
        customerId,
        admissionId,
        data: { miniLabStatusId: 8 },
      });
      console.log("response", response);

      if (response.error) {
        console.log("Mini-Lab Error", response);
        Swal.fire({
          title: "Oops...",
          text: response?.error?.data?.payload?.name,
          icon: "error",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Blood extracted",
        });
        MiniLabrefetch();
        Labrefetch();
        navigate("/home/miniLabList");
      }
    } catch (error) {
      console.log("Update Error", error);
    }
  };

  const sortedData = () => {
    if (sorting.column && minilabData?.payload?.testResults) {
      const sorted = [...minilabData.payload.testResults];
      sorted.sort((a, b) => {
        const aValue =
          sorting.column === "price"
            ? parseFloat(a[sorting.column])
            : a[sorting.column];
        const bValue =
          sorting.column === "price"
            ? parseFloat(b[sorting.column])
            : b[sorting.column];

        if (isNaN(aValue) || isNaN(bValue)) {
          return sorting.order === "asc"
            ? a[sorting.column].localeCompare(b[sorting.column])
            : b[sorting.column].localeCompare(a[sorting.column]);
        }

        return sorting.order === "asc" ? aValue - bValue : bValue - aValue;
      });
      return sorted;
    }
    return minilabData?.payload?.testResults || [];
  };

  useEffect(() => {
    document.title = "Customer Details | Medisense";
  }, []);

  return (
    <Container className="gcc-con">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11} className="main-title">
            Customer Details
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider className="border-t-2 border-gray-300" />
        <FlexboxGrid
          justify="space-between"
          className="flex items-center justify-between"
        >
          <FlexboxGrid.Item colspan={6}>
            <img
              className="w-40 h-40 rounded-full"
              src={
                minilabData?.payload?.bioData?.image
                  ? `http://localhost:3002/${minilabData?.payload?.bioData?.image}`
                  : "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              alt=""
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6}>
            <Row className="text-base font-semibold text-black text-opacity-50">
              Name
            </Row>
            <Row className="mb-2 text-lg font-medium text-black">
              {minilabData?.payload?.bioData?.fullName}
            </Row>
            <Row className="text-base font-semibold text-black text-opacity-50">
              Email
            </Row>
            <Row className="mb-2 text-lg font-medium text-black">
              {minilabData?.payload?.bioData?.email}
            </Row>
            <Row className="text-base font-semibold text-black text-opacity-50">
              Gender
            </Row>
            <Row className="mb-2 text-lg font-medium text-black">
              {minilabData?.payload?.bioData?.sex}
            </Row>
          </FlexboxGrid.Item>
          {minilabData?.payload?.bioData?.medicalType != "OPD" && (
            <FlexboxGrid.Item colspan={6}>
              <Row className="text-base font-semibold text-black text-opacity-50">
                Agency
              </Row>
              <Row className="mb-2 text-lg font-medium text-black">
                {minilabData?.payload?.bioData?.agency}
              </Row>

              <Row className="text-base font-semibold text-black text-opacity-50">
                Country
              </Row>
              <Row className="mb-2 text-lg font-medium text-black">
                {minilabData?.payload?.bioData?.country}
              </Row>

              <Row className="text-base font-semibold text-black text-opacity-50">
                Job Title
              </Row>
              <Row className="mb-2 text-lg font-medium text-black">
                {minilabData?.payload?.bioData?.job}
              </Row>
            </FlexboxGrid.Item>
          )}
          <FlexboxGrid.Item colspan={6}>
            <Row className="text-base font-semibold text-black text-opacity-50">
              Medical Type
            </Row>
            <Row className="mb-2 text-lg font-medium text-black">
              {minilabData?.payload?.bioData?.medicalType}
            </Row>

            <Row className="text-base font-semibold text-black text-opacity-50">
              Contact No
            </Row>
            <Row className="mb-2 text-lg font-medium text-black">
              {minilabData?.payload?.bioData?.mobileNo}
            </Row>
            {minilabData?.payload?.bioData?.medicalType != "OPD" && (
              <>
                <Row className="text-base font-semibold text-black text-opacity-50">
                  Passport
                </Row>

                <Row className="mb-2 text-lg font-medium text-black">
                  {minilabData?.payload?.bioData?.passportId}
                </Row>
              </>
            )}
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Table className="mt-5 min-h-60">
          <thead className="cashier-table-head">
            <tr>
              <th>#</th>
              <th onClick={() => handleSort("testCode")}>
                Code
                <FontAwesomeIcon
                  icon={
                    sorting.column === "testCode"
                      ? sorting.order === "asc"
                        ? faCaretUp
                        : faCaretDown
                      : faSort
                  }
                  className="ml-2"
                />
              </th>
              <th onClick={() => handleSort("description")}>
                Description
                <FontAwesomeIcon
                  icon={
                    sorting.column === "description"
                      ? sorting.order === "asc"
                        ? faCaretUp
                        : faCaretDown
                      : faSort
                  }
                  className="ml-2"
                />
              </th>
              <th onClick={() => handleSort("result")}>
                Result
                <FontAwesomeIcon
                  icon={
                    sorting.column === "result"
                      ? sorting.order === "asc"
                        ? faCaretUp
                        : faCaretDown
                      : faSort
                  }
                  className="ml-2"
                />
              </th>
              <th onClick={() => handleSort("unit")}>
                Unit
                <FontAwesomeIcon
                  icon={
                    sorting.column === "unit"
                      ? sorting.order === "asc"
                        ? faCaretUp
                        : faCaretDown
                      : faSort
                  }
                  className="ml-2"
                />
              </th>
              <th onClick={() => handleSort("status")}>
                Status
                <FontAwesomeIcon
                  icon={
                    sorting.column === "status"
                      ? sorting.order === "asc"
                        ? faCaretUp
                        : faCaretDown
                      : faSort
                  }
                  className="ml-2"
                />
              </th>
            </tr>
          </thead>

          <tbody className="selectedpackages-table-body">
            {sortedData().map((test, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{test.testCode}</td>
                <td>{test.description}</td>
                <td>{test.result}</td>
                <td>{test.unit}</td>
                <td>{test.status}</td>
              </tr>
            ))}

            {minilabData?.payload?.tests?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  <p className="text-gray-500">No data to display.</p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Divider />
        <FlexboxGrid justify="end">
          <Button
            type="submit"
            className="w-40 h-10 text-white bg-blue-800 mt-5"
            onClick={handlePrint}
          >
            Print Report
          </Button>
        </FlexboxGrid>
      </form>

      <div
        style={{ width: "100%", display: isPrinting ? "block" : "none" }}
        ref={contentToPrint}
      >
        <Container className="gcc-con">
          <Header>
            <FlexboxGrid justify="start">
              <FlexboxGrid.Item colspan={12} className="flex-col">
                <p className="main-title">Medical Report</p>
                <Col className="mt-2">
                  <Row className="flex mt-2">
                    <p className="w-28">Name:</p>
                    <p className="ml-2">{minilabData?.payload?.bioData?.fullName}</p>
                  </Row>
                  <Row className="flex">
                    <p className="w-28">Type:</p>
                    <p className="ml-2">{minilabData?.payload?.bioData?.medicalType}</p>
                  </Row>
                  <Row className="flex">
                    <p className="w-28">Contact:</p>
                    {minilabData?.payload?.bioData?.mobileNo}
                  </Row>
                </Col>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={12} className="flex justify-end">
                <Col>
                  <Row className="flex">
                    <p className="text-3xl font-bold text-blue-500">Medi</p>
                    <p className="text-3xl font-bold text-black">sense</p>
                  </Row>
                  {/* <p className="text-xl font-medium mt-3">Report Details:</p> */}
                  <Row className="flex mt-2">
                    <p className="w-28">Report No:</p>
                    <p className="ml-2">
                      {minilabData?.payload?.bioData?.id}
                      {minilabData?.payload?.bioData?.id}
                    </p>
                  </Row>
                  <Row className="flex">
                    <p className="w-28">Issued Time:</p>
                    <p className="ml-2">{time}</p>
                  </Row>
                  <Row className="flex">
                    <p className="w-28">Issued Date:</p>
                    <p className="ml-2">{date}</p>
                  </Row>
                </Col>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Header>
          <Divider className="border-t-2 border-gray-300 mb-5 mt-4" />
          <div className="selectedpackages-main-con h-full">
            <div
              style={{ overflowY: "auto", width: "auto", minHeight: "150px" }}
            >
              <Table responsive>
                <thead className="selectedpackages-table-head">
                  <tr>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Result</th>
                    <th>Unit</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="selectedpackages-table-body">
                  {sortedData().map((test, index) => (
                    <tr key={index}>
                      <td>{test.testCode}</td>
                      <td>{test.description}</td>
                      <td>{test.result}</td>
                      <td>{test.unit}</td>
                      <td>{test.status}</td>
                    </tr>
                  ))}

                  {minilabData?.payload?.tests?.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <p className="text-gray-500">No data to display.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          <Divider className="border-t-2 border-gray-300 mb-5 mt-4" />
        </Container>
        <style>
          {`
              @media print {
                [style*="display: none"] {
                  display: block !important;
                }
              }
            `}
        </style>
      </div>
    </Container>
  );
}

export default CustomerDetails;
