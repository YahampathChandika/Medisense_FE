import React, { useState, useEffect } from "react";
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
import { Container, Divider, Row, FlexboxGrid, Checkbox } from "rsuite";
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

function MinilabById() {
  const { customerId, admissionId } = useParams();
  const [sorting, setSorting] = useState({
    column: null,
    order: null,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [updateMiniLabStatus] = useUpdateMiniLabStatusMutation();
  const { refetch: MiniLabrefetch } = useGetMinilabListQuery();
  const { refetch: Labrefetch } = useGetLabListQuery();
  const navigate = useNavigate();

  const { data: minilabData } = useGetMinilabgetCustomerQuery({
    customerId: Number(customerId),
    admissionId: Number(admissionId),
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
    if (sorting.column && minilabData?.payload?.tests) {
      const sorted = [...minilabData.payload.tests];
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
    return minilabData?.payload?.tests || [];
  };

  useEffect(() => {
    document.title = "MinilabById | Medisense";
  }, []);

  return (
    <Container className="gcc-con">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11} className="main-title">
            Mini-lab
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
                minilabData?.payload?.customer?.image
                  ? `http://localhost:3002/${minilabData?.payload?.customer?.image}`
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
              {minilabData?.payload?.customer?.fullName}
            </Row>
            <Row className="text-base font-semibold text-black text-opacity-50">
              Age
            </Row>
            <Row className="mb-2 text-lg font-medium text-black">
              {minilabData?.payload?.customer?.age}
            </Row>
            <Row className="text-base font-semibold text-black text-opacity-50">
              Gender
            </Row>
            <Row className="mb-2 text-lg font-medium text-black">
              {minilabData?.payload?.customer?.gender}
            </Row>
          </FlexboxGrid.Item>
          {minilabData?.payload?.customer?.medicalType != "OPD" && (
            <FlexboxGrid.Item colspan={6}>
              <Row className="text-base font-semibold text-black text-opacity-50">
                Agency
              </Row>
              <Row className="mb-2 text-lg font-medium text-black">
                {minilabData?.payload?.customer?.agency}
              </Row>

              <Row className="text-base font-semibold text-black text-opacity-50">
                Country
              </Row>
              <Row className="mb-2 text-lg font-medium text-black">
                {minilabData?.payload?.customer?.country}
              </Row>

              <Row className="text-base font-semibold text-black text-opacity-50">
                Job Title
              </Row>
              <Row className="mb-2 text-lg font-medium text-black">
                {minilabData?.payload?.customer?.job}
              </Row>
            </FlexboxGrid.Item>
          )}
          <FlexboxGrid.Item colspan={6}>
            <Row className="text-base font-semibold text-black text-opacity-50">
              Medical Type
            </Row>
            <Row className="mb-2 text-lg font-medium text-black">
              {minilabData?.payload?.customer?.medicalType}
            </Row>

            <Row className="text-base font-semibold text-black text-opacity-50">
              NIC
            </Row>
            <Row className="mb-2 text-lg font-medium text-black">
              {minilabData?.payload?.customer?.nic}
            </Row>
            {minilabData?.payload?.customer?.medicalType != "OPD" && (
              <>
                <Row className="text-base font-semibold text-black text-opacity-50">
                  Passport
                </Row>

                <Row className="mb-2 text-lg font-medium text-black">
                  {minilabData?.payload?.customer?.passport}
                </Row>
              </>
            )}
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Table className="mt-5">
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
              <th onClick={() => handleSort("price")}>
                Price
                <FontAwesomeIcon
                  icon={
                    sorting.column === "price"
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
                <td>{test.price}</td>
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
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11}>
            <Checkbox
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            >
              Blood Extracted
            </Checkbox>
          </FlexboxGrid.Item>
        </FlexboxGrid>

        <FlexboxGrid justify="end">
          <Button
            type="submit"
            className="w-40 h-10 text-white bg-blue-800"
            disabled={!isChecked}
          >
            Save
          </Button>
        </FlexboxGrid>
      </form>
    </Container>
  );
}

export default MinilabById;
