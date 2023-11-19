import React, { useState } from "react";
import { mockData } from "../../assets/mocks/mockTests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table, Checkbox } from "rsuite";

function All() {
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

  return (
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
      <Column width={50} align="center">
        <HeaderCell style={{ padding: 0 }}>
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
        <HeaderCell>Code</HeaderCell>
        <Cell dataKey="code" />
      </Column>

      <Column sortable flexGrow fullText>
        <HeaderCell>Description</HeaderCell>
        <Cell dataKey="description" />
      </Column>

      <Column sortable flexGrow>
        <HeaderCell>Test Type</HeaderCell>
        <Cell dataKey="testType" />
      </Column>

      <Column sortable flexGrow>
        <HeaderCell>Amount</HeaderCell>
        <Cell dataKey="amount" />
      </Column>

      <Column flexGrow>
        <HeaderCell>Action</HeaderCell>
        <Cell>
          <FontAwesomeIcon icon={faPenToSquare} />
          <FontAwesomeIcon icon={faTrash} style={{ marginLeft: "15px" }} />
        </Cell>
      </Column>
    </Table>
  );
}

export default All;
