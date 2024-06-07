import React, { useState, useEffect, useRef } from "react";
import { Button, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddPaymentMutation,
  useGetCashierListMatricesQuery,
  useGetCashierListQuery,
  useGetCustomerQuery,
} from "../store/api/cashierApi";
import {
  useGetBanksQuery,
  useGetCreditApproversQuery,
  useGetPaymentMethodsQuery,
} from "../store/api/dropdownsApi";
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
  Col,
  Row,
  Header,
  FlexboxGrid,
  SelectPicker,
  DatePicker,
} from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Gcc.css";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";

function Cashier() {
  const { customerId, admissionId } = useParams();
  const { data: paymentMethods } = useGetPaymentMethodsQuery();
  const { data: banks } = useGetBanksQuery();
  const { data: creditApprovers } = useGetCreditApproversQuery();
  const [addPayment] = useAddPaymentMutation();
  const { refetch: cashierListrefetch } = useGetCashierListQuery();
  const { refetch: cashierMatricesrefetch } = useGetCashierListMatricesQuery();
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
  console.log("customerData", customerData, customerId, admissionId);

  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(null);

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

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const contentToPrint = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = useReactToPrint({
    documentTitle: `Invoice${customerId}${admissionId}`,
    onBeforePrint: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
    content: () => contentToPrint.current,
    removeAfterPrint: true,
  });

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
      const response = await addPayment({ customerId, admissionId, data });

      if (response.error) {
        console.log("Add Payment Error", response);
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
          title: "Payment success",
        });
        cashierMatricesrefetch();
        cashierListrefetch();
        navigate("/home/cashierList");
      }
    } catch (error) {
      console.log("Update Error", error);
    }
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

  useEffect(() => {
    if (customerData) {
      const totalAmount = customerData?.payload?.totalAmount || 0;
      setAmount(totalAmount);
      setDiscount(0);
      setValue("amountToPay", totalAmount);
    }
  }, [customerData]);

  useEffect(() => {
    const totalAmount = customerData?.payload?.totalAmount || 0;
    const calculatedAmount = discount
      ? totalAmount - (totalAmount * discount) / 100
      : totalAmount;
    setAmount(calculatedAmount);
    setValue("amountToPay", calculatedAmount);
  }, [customerData, discount]);

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
            {/* <img
                className="w-40 h-40 rounded-full"
                src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              /> */}
            <img
              className="w-40 h-40 rounded-full"
              src={
                customerData?.payload?.customer?.image
                  ? `http://localhost:3002/${customerData?.payload?.customer?.image}`
                  : "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              alt="Patient"
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
              <tr key={test.code}>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FlexboxGrid justify="space-between" className="mt-5">
            <FlexboxGrid.Item colspan={11}>
              <Row>Commision</Row>
              <Input
                name="commision"
                value={customerData?.payload?.commission}
              />
              <Row>Discount (%)</Row>
              <Input
                {...register("discount")}
                name="discount"
                placeholder="%"
                defaultValue={0}
                onChange={(value) => setDiscount(value)}
              />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={11}>
              <Row>Total</Row>
              <Input
                {...register("totalAmount", { valueAsNumber: true })}
                name="total"
                value={customerData?.payload?.totalAmount}
              />
              <Row>Amount to Pay</Row>
              <Input
                {...register("amountToPay")}
                name="amountToPay"
                value={amount}
              />
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
                    value: item.id,
                  })) || []
                }
                {...register("paymentMethodId")}
                value={watch("paymentMethodId")}
                onChange={(label) => setValue("paymentMethodId", label)}
              />
            </FlexboxGrid.Item>
            {getValues("paymentMethodId") == 21 && (
              <FlexboxGrid.Item colspan={11}>
                <Input
                  {...register("checkNo")}
                  name="checkNo"
                  placeholder="Cheque No"
                />
                <DatePicker
                  block
                  oneTap
                  placeholder="Cheque Date"
                  format="yyyy-MM-dd"
                  id="chequeDate"
                  name="checkDate"
                  {...register("checkDate")}
                  value={watch("checkDate")}
                  onChange={(value) => setValue("checkDate", value)}
                />
                <SelectPicker
                  searchable={false}
                  placeholder="Bank"
                  style={{ width: "100%" }}
                  data={
                    banks.payload.map((item) => ({
                      label: item.label,
                      value: item.id,
                    })) || []
                  }
                  {...register("bankId")}
                  value={watch("bankId")}
                  onChange={(label) => setValue("bankId", label)}
                />
              </FlexboxGrid.Item>
            )}
            {getValues("paymentMethodId") == 22 && (
              <FlexboxGrid.Item colspan={11}>
                <SelectPicker
                  searchable={false}
                  placeholder="Credit Approved By"
                  style={{ width: "100%" }}
                  data={
                    creditApprovers.payload.map((item) => ({
                      label: item.label,
                      value: item.id,
                    })) || []
                  }
                  {...register("creditAproverId")}
                  value={watch("creditAproverId")}
                  onChange={(label) => setValue("creditAproverId", label)}
                />
              </FlexboxGrid.Item>
            )}
          </FlexboxGrid>

          <FlexboxGrid justify="end">
            <Button
              type="submit"
              className="w-40 h-10 text-white bg-blue-800"
              onClick={handlePrint}
            >
              Print
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
                  <p className="main-title">Invoice</p>
                  <Col className="mt-3">
                    <p className="text-xl font-medium">Billed To:</p>
                    <Row className="flex mt-2">
                      <p className="w-28">Name:</p>
                      <p className="ml-2">
                        {customerData?.payload?.customer?.fullName}
                      </p>
                    </Row>
                    <Row className="flex">
                      <p className="w-28">Age:</p>
                      <p className="ml-2">
                        {customerData?.payload?.customer?.age}
                      </p>
                    </Row>
                    <Row className="flex">
                      <p className="w-28">Customer ID:</p>
                      <p className="ml-2">{customerId}</p>
                    </Row>
                  </Col>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12} className="flex justify-end">
                  <Col>
                    <Row className="flex">
                      <p className="text-3xl font-bold text-blue-500">Medi</p>
                      <p className="text-3xl font-bold text-black">sense</p>
                    </Row>
                    <p className="text-xl font-medium mt-3">Invoice Details:</p>
                    <Row className="flex mt-2">
                      <p className="w-28">Invoice No:</p>
                      <p className="ml-2">
                        {customerId}
                        {admissionId}
                      </p>
                    </Row>
                    <Row className="flex">
                      <p className="w-28">Invoice Time:</p>
                      <p className="ml-2">{time}</p>
                    </Row>
                    <Row className="flex">
                      <p className="w-28">Invoice Date:</p>
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
                      <th>Tests</th>
                      <th>Description</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody className="selectedpackages-table-body">
                    {sortedData().map((test, index) => (
                      <tr key={test.code}>
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
              </div>
            </div>

            <Divider className="border-t-2 border-gray-300 mb-5 mt-4" />
            <FlexboxGrid justify="start">
              <FlexboxGrid.Item colspan={10}></FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={14} className="flex justify-end">
                <Col className="w-1/2">
                  <FlexboxGrid className="flex justify-between">
                    <FlexboxGrid.Item colspan={10}>
                      <p>Sub Total</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={10}>
                      <p>{customerData?.payload?.totalAmount}</p>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                  <FlexboxGrid className="flex justify-between">
                    <FlexboxGrid.Item colspan={10}>
                      <p>Discount</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={10}>
                      <p>{discount} %</p>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                  <Divider className="border-t-2 border-gray-300 mt-1 mb-1" />
                  <FlexboxGrid className="flex justify-between">
                    <FlexboxGrid.Item colspan={10}>
                      <p className="text-xl font-semibold">Total</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={10}>
                      <p className="text-xl font-semibold">{amount}</p>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </Col>
              </FlexboxGrid.Item>
            </FlexboxGrid>
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
    )
  );
}

export default Cashier;
