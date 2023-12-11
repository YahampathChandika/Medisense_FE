import React, { useState } from "react";
import { mockData } from "../../../assets//mocks/mockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table, Checkbox } from "rsuite";

function Available() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);

  let checked = false;
  let indeterminate = false;

  const { Column, HeaderCell, Cell } = Table;
  const data = mockData(8);

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

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map((item) => item.code) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: "46px" }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item) => item === rowData[dataKey])}
        />
      </div>
    </Cell>
  );

  const createHeaderCell = (label) => (
    <HeaderCell
      style={{ background: "#F2F4FF", color: "#768DC6", fontWeight: "600" }}
    >
      {label}
    </HeaderCell>
  );

  return (
    <Table
      height={400}
      minHeight={200}
      bordered
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      style={{ margin: "25px 0 40px" }}
    >
      <Column width={100} align="center">
        <HeaderCell
          style={{ padding: 0, background: "#F2F4FF", color: "#768DC6" }}
        >
          <Checkbox
            inline
            checked={checked}
            indeterminate={indeterminate}
            onChange={handleCheckAll}
            style={{ marginTop: "2px" }}
          />
        </HeaderCell>
        <CheckCell
          dataKey="code"
          checkedKeys={checkedKeys}
          onChange={handleCheck}
        />
      </Column>

      <Column sortable flexGrow>
        {createHeaderCell("CODE")}
        <Cell dataKey="code" />
      </Column>

      <Column sortable flexGrow fullText>
        {createHeaderCell("DESCRIPTION")}
        <Cell dataKey="description" />
      </Column>

      <Column sortable flexGrow>
        {createHeaderCell("TEST TYPE")}
        <Cell dataKey="testType" />
      </Column>

      <Column sortable flexGrow>
        {createHeaderCell("AMOUNT")}
        <Cell dataKey="amount" />
      </Column>

      <Column>
        {createHeaderCell("")}
        <Cell>
          <FontAwesomeIcon icon={faPenToSquare} />
          <FontAwesomeIcon icon={faTrash} style={{ marginLeft: "15px" }} />
        </Cell>
      </Column>
    </Table>
  );
}

export default Available;