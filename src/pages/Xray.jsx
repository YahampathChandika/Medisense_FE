import React, { useState } from "react";
import "../assets/css/Gcc.css";
import { mockData } from "../assets/mocks/mockData";
import {
  Container,
  Divider,
  Input,
  InputGroup,
  Row,
  FlexboxGrid,
  Uploader,
  SelectPicker,
  Table,
} from "rsuite";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import "rsuite/dist/rsuite-no-reset.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function Xray() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  const { Column, HeaderCell, Cell } = Table;
  const data = mockData(8);

  const CustomHeaderCell = ({ children, className, ...props }) => {
    // Add your Tailwind CSS classes to the className
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

  const form = useForm({
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container className="gcc-con">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11} className="main-title">
            X - Ray
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider className="border-t-2 border-gray-300" />
        <FlexboxGrid
          justify="space-between"
          className="flex items-center justify-between"
        >
          <FlexboxGrid.Item colspan={16}>
            <Row>Full Name</Row>
            <Input {...register("name")} />
            <Row>ID</Row>
            <Input {...register("id")} />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6}>
            <img
              className="h-40 w-40 rounded-full"
              src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
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
            <CustomHeaderCell>No</CustomHeaderCell>
            <Table.Cell dataKey="no" />
          </Table.Column>
          <Table.Column sortable flexGrow>
            <CustomHeaderCell>Type</CustomHeaderCell>
            <Table.Cell dataKey="type" />
          </Table.Column>
          <Table.Column sortable flexGrow>
            <CustomHeaderCell>Code</CustomHeaderCell>
            <Table.Cell dataKey="code" />
          </Table.Column>
          <Table.Column sortable flexGrow fullText>
            <CustomHeaderCell>Description</CustomHeaderCell>
            <Table.Cell dataKey="description" />
          </Table.Column>
          <Table.Column sortable flexGrow>
            <CustomHeaderCell>X-Ray Film</CustomHeaderCell>
            <Table.Cell dataKey="xrayFilm" />
          </Table.Column>
          <Table.Column sortable flexGrow>
            <CustomHeaderCell>Remarks</CustomHeaderCell>
            <Table.Cell dataKey="remarks" />
          </Table.Column>
        </Table>
        <p className="text-lg mb-3 font-semibold">
          Medical Officer's Recommendations
        </p>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11}>
            <Row>X - Ray Results</Row>
            <SelectPicker
              searchable={false}
              style={{ width: "100%" }}
              data={["Pass", "Fail"].map((item) => ({
                label: item,
                value: item,
              }))}
              {...register("xrayResults")}
              onChange={(value) => setValue("xrayResults", value)}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={11}>
            <Row>Radiographer</Row>
            <SelectPicker
              searchable={false}
              style={{ width: "100%" }}
              data={["Yoru", "Pheonix", "Iso"].map((item) => ({
                label: item,
                value: item,
              }))}
              {...register("radiographer")}
              onChange={(value) => setValue("radiographer", value)}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider />
        <FlexboxGrid justify="end">
          <Button type="submit" className="w-40 h-10 bg-blue-800 text-white">
            Save
          </Button>
        </FlexboxGrid>
      </form>
    </Container>
  );
}

export default Xray;
