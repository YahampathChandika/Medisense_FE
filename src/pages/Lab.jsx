import React, { useState, useEffect } from "react";
import "../assets/css/Gcc.css";
import {
  Container,
  Divider,
  Row,
  FlexboxGrid,
  SelectPicker,
  Table,
  Button as RsuiteButton,
} from "rsuite";
import { useForm } from "react-hook-form";
import "rsuite/dist/rsuite-no-reset.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetLabCustomerQuery,
  useUpdateLabStatusMutation,
} from "../store/api/labApi";

function Lab() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const { customerId, admissionId } = useParams();
  const [updateLabStatus] = useUpdateLabStatusMutation();
  const navigate = useNavigate();
  const { Column, HeaderCell, Cell } = Table;

  const { data: customerData } = useGetLabCustomerQuery({
    customerId: Number(customerId),
    admissionId: Number(admissionId),
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    if (customerData) {
      setData(customerData.payload.tests);
    }
  }, [customerData]);

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
      return [...data].sort((a, b) => {
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

  const handleChange = (id, key, value) => {
    const nextData = data.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: value };
      }
      return item;
    });
    setData(nextData);
  };

  const handleEditState = (id) => {
    const nextData = data.map((item) => {
      if (item.id === id) {
        return { ...item, status: item.status === "EDIT" ? null : "EDIT" };
      }
      return item;
    });
    setData(nextData);
  };

  const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {
    const [value, setValue] = useState(rowData[dataKey]);
    const editing = rowData.status === "EDIT";

    return (
      <Cell {...props} className={editing ? "table-content-editing" : ""}>
        {editing ? (
          <input
            className="rs-input"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            onBlur={() => {
              onChange && onChange(rowData.id, dataKey, value);
            }}
          />
        ) : (
          <span className="table-content-edit-span">{rowData[dataKey]}</span>
        )}
      </Cell>
    );
  };

  const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
      <Cell {...props} style={{ padding: "6px" }}>
        <RsuiteButton
          appearance="link"
          onClick={() => {
            onClick(rowData.id);
          }}
        >
          {rowData.status === "EDIT" ? "Save" : "Edit"}
        </RsuiteButton>
      </Cell>
    );
  };

  const form = useForm({
    mode: "onTouched",
  });

  const { register, handleSubmit, setValue, getValues } = form;

  const onSubmit = async (formData) => {
    const xrayResults = getValues("xrayResults");
    const labStatusId = xrayResults === 11 ? 11 : 12;

    const resultData = data.map((item) => ({
      id: item.id,
      result: item.result,
      status: item.status,
      unit: item.unit,
    }));

    const submitData = {
      testResults: resultData,
      labStatusId: labStatusId,
    };

    console.log(submitData);
    const response = await updateLabStatus({
      customerId,
      admissionId,
      data: submitData,
    });
    console.log(response);
    navigate("/home/labList")

  }

  useEffect(() => {
    document.title = "Lab | Medisense";
  }, []);

  return (
    <Container className="gcc-con">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11} className="main-title">
            Lab
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
                customerData?.payload?.customer?.image
                  ? `http://localhost:3002/${customerData?.payload?.customer?.image}`
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
          {customerData?.payload?.customer?.medicalType !== "OPD" && (
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
            {customerData?.payload?.customer?.medicalType !== "OPD" && (
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
        <Table
          autoHeight
          minHeight={200}
          bordered
          data={getData()}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          loading={loading}
          rowHeight={70}
          style={{ margin: "25px 0 40px" }}
        >
          <Column sortable flexGrow>
            <CustomHeaderCell>Test Code</CustomHeaderCell>
            <Cell dataKey="testCode" />
          </Column>

          <Column sortable flexGrow>
            <CustomHeaderCell>Description</CustomHeaderCell>
            <Cell dataKey="description" />
          </Column>

          <Column sortable flexGrow>
            <CustomHeaderCell>Result</CustomHeaderCell>
            <EditableCell dataKey="result" onChange={handleChange} />
          </Column>

          <Column sortable flexGrow>
            <CustomHeaderCell>Unit</CustomHeaderCell>
            <Cell dataKey="unit" />
          </Column>

          <Column sortable flexGrow>
            <CustomHeaderCell>Status</CustomHeaderCell>
            <EditableCell dataKey="status" onChange={handleChange} />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Action</HeaderCell>
            <ActionCell dataKey="id" onClick={handleEditState} />
          </Column>
        </Table>
        <FlexboxGrid
          justify="space-between"
          className="flex items-center justify-between"
        >
          <FlexboxGrid.Item colspan={11}>
            <Row>Status</Row>
            <SelectPicker
              searchable={false}
              style={{ width: "100%" }}
              data={[
                { label: "Pass", value: 11 },
                { label: "Fail", value: 12 },
              ]}
              {...register("xrayResults")}
              onChange={(value) => setValue("xrayResults", value)}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={3}>
            <Button
              type="submit"
              className="w-48 h-10 mr-14 bg-blue-800 text-white"
            >
              Save
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </form>
    </Container>
  );
}

export default Lab;
