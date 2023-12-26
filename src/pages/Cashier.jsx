import React, { useState } from "react";
import "../assets/css/Gcc.css";
import { mockData } from "../assets/mocks/mockData";
import {
  Container,
  Divider,
  Input,
  Row,
  FlexboxGrid,
  SelectPicker,
  Table,
  DatePicker,
  Col,
} from "rsuite";
import { useForm } from "react-hook-form";
import "rsuite/dist/rsuite-no-reset.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCustomerQuery } from "../store/api/cashier";
import { useGetPaymentMethodsQuery } from "../store/api/dropdownsApi";

function Cashier() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const { customerId, admissionId } = useParams();
  const { data: paymentMethods } = useGetPaymentMethodsQuery();

  console.log("Cashier", customerId, admissionId);

  const {
    data: cutomerData,
    error,
    isLoading,
    isError,
  } = useGetCustomerQuery({
    customerId: Number(customerId),
    admissionId: Number(admissionId),
  });

  console.log("cutomerData", cutomerData?.payload);

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

  const { Column, HeaderCell, Cell } = Table;
  const data = mockData(8);

  const CustomHeaderCell = ({ children, className, ...props }) => {
    const headerClasses = "text-black font-bold text-sm";

    return (
      <Table.HeaderCell {...props} className={`${className} ${headerClasses}`}>
        {children}
      </Table.HeaderCell>
    );
  };

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];

        if (typeof x === "string") {
          x = x.toLowerCase();
        }
        if (typeof y === "string") {
          y = y.toLowerCase();
        }

        if (x < y) {
          return sortType === "asc" ? -1 : 1;
        }
        if (x > y) {
          return sortType === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const onSubmit = (data) => {
    // console.log('register', data.payment);
    console.log("registeeee", getValues("name"));
    console.log("register", data.name);
  };

  useEffect(() => {
    document.title = "Cashier | Medisense";
  }, []);

  return (
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
              className="h-40 w-40 rounded-full"
              src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6}>
            <Row className="text-black text-opacity-50 text-base font-semibold">
              Name
            </Row>
            <Row className="text-black text-lg font-medium">
              {cutomerData?.payload?.fullName}
            </Row>
            <Row className="text-black text-opacity-50 text-base font-semibold">
              Age
            </Row>
            <Row className="text-black text-lg font-medium">
              {cutomerData?.payload?.agency}
            </Row>
            <Row className="text-black text-opacity-50 text-base font-semibold">
              Gender
            </Row>
            <Row className="text-black text-lg font-medium">
              {cutomerData?.payload?.agency}
            </Row>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6}>
            <Row className="text-black text-opacity-50 text-base font-semibold">
              Agency
            </Row>
            <Row className="text-black text-lg font-medium">
              {cutomerData?.payload?.agency}
            </Row>

            <Row className="text-black text-opacity-50 text-base font-semibold">
              Country
            </Row>
            <Row className="text-black text-lg font-medium">
              {cutomerData?.payload?.agency}
            </Row>

            <Row className="text-black text-opacity-50 text-base font-semibold">
              Job Title
            </Row>
            <Row className="text-black text-lg font-medium">
              {cutomerData?.payload?.agency}
            </Row>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6}>
            <Row className="text-black text-opacity-50 text-base font-semibold">
              Medical Type{" "}
            </Row>
            <Row className="text-black text-lg font-medium">
              {cutomerData?.payload?.agency}
            </Row>

            <Row className="text-black text-opacity-50 text-base font-semibold">
              NIC
            </Row>
            <Row className="text-black text-lg font-medium">
              {cutomerData?.payload?.agency}
            </Row>

            <Row className="text-black text-opacity-50 text-base font-semibold">
              Passport
            </Row>
            <Row className="text-black text-lg font-medium">
              {cutomerData?.payload?.agency}
            </Row>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Table
          autoHeight
          minHeight={200}
          bordered
          data={getData()}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          loading={loading}
          style={{ margin: "25px 0 40px" }}
        >
          <Table.Column sortable flexGrow>
            <CustomHeaderCell>ID</CustomHeaderCell>
            <Table.Cell dataKey="no" />
          </Table.Column>
          <Table.Column sortable flexGrow>
            <CustomHeaderCell>Package ID</CustomHeaderCell>
            <Table.Cell dataKey="type" />
          </Table.Column>
          <Table.Column sortable flexGrow>
            <CustomHeaderCell>Amount</CustomHeaderCell>
            <Table.Cell dataKey="amount" />
          </Table.Column>
        </Table>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11}>
            <Row>Commision</Row>
            <Input {...register("commision")} name="commision" />
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
              data={paymentMethods?.payload.map((item) => ({
                label: item.method,
                value: item.id,
              }))}
              {...register("payment")}
              onChange={(value) => setValue("payment", value)}
            />
          </FlexboxGrid.Item>
          {getValues("payment") == "Cheque" && (
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
          <Button type="submit" className="w-40 h-10 bg-blue-800 text-white">
            Save
          </Button>
        </FlexboxGrid>
      </form>
    </Container>
  );
}

export default Cashier;
