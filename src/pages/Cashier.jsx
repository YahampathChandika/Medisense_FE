import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetCustomerQuery } from "../store/api/cashier";
import { useGetPaymentMethodsQuery } from "../store/api/dropdownsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bars } from "react-loader-spinner";
import {
  faCaretDown,
  faCaretUp,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Divider,
  Input,
  Row,
  FlexboxGrid,
  SelectPicker,
  DatePicker,
} from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Gcc.css";

function Cashier() {
  const { customerId, admissionId } = useParams();
  const { data: paymentMethods } = useGetPaymentMethodsQuery();
  const [sorting, setSorting] = useState({
    column: null,
    order: null,
  });

  const {
    data: customerData,
    error,
    isLoading,
    isError,
  } = useGetCustomerQuery({
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

  const onSubmit = (data) => {
    console.log("registeeee", getValues("name"));
    console.log("register", data.name);
  };

  const sortedData = () => {
    if (sorting.column && customerData?.payload?.tests) {
      const sorted = [...customerData.payload.tests];
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
    return customerData?.payload?.tests || [];
  };

  useEffect(() => {
    document.title = "Cashier | Medisense";
  }, []);

  console.log("paymentMethods", paymentMethods);
  console.log("customerData", customerData);
  console.log("commision", customerData?.payload?.commission);
  console.log("payment", getValues("payment"));

  return isLoading ? (
    <div className="flex items-center justify-center w-full">
      <Bars
        height="80"
        width="80"
        radius="9"
        color="blue"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  ) : (
    !isLoading && (
      <Container className="gcc-con">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={11} className="main-title">
              Cashier
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
                src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <Row className="text-base font-semibold text-black text-opacity-50">
                Name
              </Row>
              <Row className="mb-2 text-lg font-medium text-black">
                {customerData?.payload?.customer?.fullName}
              </Row>
              <Row className="text-base font-semibold text-black text-opacity-50">
                Age
              </Row>
              <Row className="mb-2 text-lg font-medium text-black">
                {customerData?.payload?.customer?.age}
              </Row>
              <Row className="text-base font-semibold text-black text-opacity-50">
                Gender
              </Row>
              <Row className="mb-2 text-lg font-medium text-black">
                {customerData?.payload?.customer?.gender}
              </Row>
            </FlexboxGrid.Item>
            {customerData?.payload?.customer?.medicalType != "OPD" && (
              <FlexboxGrid.Item colspan={6}>
                <Row className="text-base font-semibold text-black text-opacity-50">
                  Agency
                </Row>
                <Row className="mb-2 text-lg font-medium text-black">
                  {customerData?.payload?.customer?.agency}
                </Row>

                <Row className="text-base font-semibold text-black text-opacity-50">
                  Country
                </Row>
                <Row className="mb-2 text-lg font-medium text-black">
                  {customerData?.payload?.customer?.country}
                </Row>

                <Row className="text-base font-semibold text-black text-opacity-50">
                  Job Title
                </Row>
                <Row className="mb-2 text-lg font-medium text-black">
                  {customerData?.payload?.customer?.job}
                </Row>
              </FlexboxGrid.Item>
            )}
            <FlexboxGrid.Item colspan={6}>
              <Row className="text-base font-semibold text-black text-opacity-50">
                Medical Type
              </Row>
              <Row className="mb-2 text-lg font-medium text-black">
                {customerData?.payload?.customer?.medicalType}
              </Row>

              <Row className="text-base font-semibold text-black text-opacity-50">
                NIC
              </Row>
              <Row className="mb-2 text-lg font-medium text-black">
                {customerData?.payload?.customer?.nic}
              </Row>
              {customerData?.payload?.customer?.medicalType != "OPD" && (
                <>
                  <Row className="text-base font-semibold text-black text-opacity-50">
                    Passport
                  </Row>

                  <Row className="mb-2 text-lg font-medium text-black">
                    {customerData?.payload?.customer?.passport}
                  </Row>
                </>
              )}
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Table className="mt-5 border">
            <thead className="cashier-table-head">
              <tr>
                <th>#</th>
                <th onClick={() => handleSort("code")}>
                  Code
                  <FontAwesomeIcon
                    icon={
                      sorting.column === "code"
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
                <tr key={test.id}>
                  <td>{index + 1}</td>
                  <td>{test.code}</td>
                  <td>{test.description}</td>
                  <td>{test.price}</td>
                </tr>
              ))}

              {customerData?.payload?.tests?.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    <p className="text-gray-500">No data to display.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <FlexboxGrid justify="space-between" className="mt-5">
            <FlexboxGrid.Item colspan={11}>
              <Row>Commision</Row>
              <Input
                {...register("commision")}
                name="commision"
                defaultValue={customerData?.payload?.commission}
                disabled
              />
              <Row>Discount</Row>
              <Input {...register("discount")} name="discount" />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={11}>
              <Row>Total</Row>
              <Input {...register("total")} name="total" />
              <Row>Amount to Pay</Row>
              <Input {...register("amount")} name="amount" />
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={11}>
              <SelectPicker
                menuMaxHeight={120}
                searchable={false}
                placeholder="Payment Method"
                style={{ width: "100%" }}
                data={
                  paymentMethods?.payload.map((item) => ({
                    label: item.label,
                    value: item.label,
                  })) || []
                }
                {...register("payment")}
                onChange={(label) => setValue("payment", label)}
              />
            </FlexboxGrid.Item>
            {getValues("payment") == "Check" && (
              <FlexboxGrid.Item colspan={11}>
                <Input
                  {...register("chequeNo")}
                  name="chequeNo"
                  placeholder="Cheque No"
                />
                <DatePicker
                  block
                  oneTap
                  placeholder="Cheque Date"
                  format="yyyy-MM-dd"
                  id="chequeDate"
                  name="chequeDate"
                  value={watch("chequeDate")}
                  onChange={(value) => setValue("chequeDate", value)}
                />
                <SelectPicker
                  searchable={false}
                  placeholder="Bank"
                  style={{ width: "100%" }}
                  data={["BOC", "HNB", "Sampath"].map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  {...register("bank")}
                  onChange={(value) => setValue("bank", value)}
                />
              </FlexboxGrid.Item>
            )}
            {getValues("payment") == "Credit" && (
              <FlexboxGrid.Item colspan={11}>
                <Input
                  {...register("creditApproved")}
                  name="credit"
                  placeholder="Credit Approved By"
                />
              </FlexboxGrid.Item>
            )}
          </FlexboxGrid>

          <FlexboxGrid justify="end">
            <Button type="submit" className="w-40 h-10 text-white bg-blue-800">
              Save
            </Button>
          </FlexboxGrid>
        </form>
      </Container>
    )
  );
}

export default Cashier;
