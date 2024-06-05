import React, { useState, useEffect } from "react";
import "../assets/css/Gcc.css";
import { mockData } from "../assets/mocks/mockData";
import {
  Container,
  Divider,
  Input,
  InputGroup,
  Row,
  FlexboxGrid,
  SelectPicker,
  Table,
  Button as RsuiteButton
} from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import "rsuite/dist/rsuite-no-reset.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function Lab() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(mockData(8));

  const { Column, HeaderCell, Cell } = Table;

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
    const nextData = data.map(item => {
      if (item.id === id) {
        return { ...item, [key]: value };
      }
      return item;
    });
    setData(nextData);
  };

  const handleEditState = id => {
    const nextData = data.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'EDIT' ? null : 'EDIT' };
      }
      return item;
    });
    setData(nextData);
  };

  const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {
    const editing = rowData.status === 'EDIT';
    return (
      <Cell {...props} className={editing ? 'table-content-editing' : ''}>
        {editing ? (
          <input
            className="rs-input"
            defaultValue={rowData[dataKey]}
            onChange={event => {
              onChange && onChange(rowData.id, dataKey, event.target.value);
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
      <Cell {...props} style={{ padding: '6px' }}>
        <RsuiteButton
          appearance="link"
          onClick={() => {
            onClick(rowData.id);
          }}
        >
          {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
        </RsuiteButton>
      </Cell>
    );
  };

  const form = useForm({
    mode: "onTouched",
  });

  const { register, handleSubmit, setValue } = form;

  const onSubmit = (formData) => {
    console.log(formData);
  };

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
          <FlexboxGrid.Item colspan={11}>
            <InputGroup>
              <Input
                placeholder="Search by ID or name..."
                style={{ margin: 0 }}
              />
              <InputGroup.Button>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Button>
            </InputGroup>
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
          rowHeight={70}
          style={{ margin: "25px 0 40px" }}
        >
          <Column sortable flexGrow>
            <CustomHeaderCell>#</CustomHeaderCell>
            <Cell dataKey="no" />
          </Column>

          <Column sortable flexGrow>
            <CustomHeaderCell>Code</CustomHeaderCell>
            <Cell dataKey="code" />
          </Column>

          <Column sortable flexGrow fullText>
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
              data={["Pass", "Fail"].map((item) => ({
                label: item,
                value: item,
              }))}
              {...register("xrayResults")}
              onChange={(value) => setValue("xrayResults", value)}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={7}>
            <Button
              type="submit"
              className="w-full h-10 bg-blue-800 text-white"
            >
              Mark Default
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider />
        <FlexboxGrid justify="end">
          <Button
            type="submit"
            className="w-32 h-10 mr-14 bg-blue-800 text-white"
          >
            Save
          </Button>
          <Button type="submit" className="w-32 h-10 bg-blue-800 text-white">
            New
          </Button>
        </FlexboxGrid>
      </form>
    </Container>
  );
}

export default Lab;
