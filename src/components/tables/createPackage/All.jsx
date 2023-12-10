import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTests } from "../../../store/slice/testSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table, Checkbox } from "rsuite";
import AddTest from "../../modals/AddTest";
import {
  useDeleteTestMutation,
  useGetAllTestsQuery,
} from "../../../store/api/testApi";
import Swal from "sweetalert2";

function All() {
  const dispatch = useDispatch();
  const selectedTests = useSelector((state) => state.selectedTests);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [testOpen, setTestOpen] = useState(false);
  const { data: testData, isLoading, error, refetch } = useGetAllTestsQuery();
  const [deleteTest] = useDeleteTestMutation();
  const { Column, HeaderCell, Cell } = Table;

  const handleTestOpen = (id) => setTestOpen(id);
  const handleTestClose = () => setTestOpen(false);

  useEffect(() => {
    dispatch(setSelectedTests(checkedKeys));
    console.log("All Tests Data:", selectedTests);
  }, [checkedKeys, dispatch]);

  const getData = () => {
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    if (isLoading) {
      return [];
    }

    if (testData && testData.payload) {
      const sortedData = [...testData.payload];

      if (sortColumn && sortType) {
        sortedData.sort((a, b) => {
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

      return sortedData;
    }
    return [];
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const handleCheckAll = (value, checked) => {
    const keys = checked ? testData.payload.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };

  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  const handleDelete = async (testId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteTest(testId);
        await refetch();
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting test:", error);
      Swal.fire("Error", "There was an error deleting the record.", "error");
    }
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

  console.log("chk", checkedKeys);

  return (
    <>
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
        <Column flexGrow={1} align="center">
          <HeaderCell
            style={{ padding: 0, background: "#F2F4FF", color: "#768DC6" }}
          >
            <Checkbox
              inline
              checked={
                checkedKeys.length === testData?.payload?.length &&
                checkedKeys.length !== 0
              }
              indeterminate={
                checkedKeys.length > 0 &&
                checkedKeys.length < testData?.payload?.length
              }
              onChange={handleCheckAll}
              style={{ marginTop: "2px" }}
            />
          </HeaderCell>
          <CheckCell
            dataKey="id"
            checkedKeys={checkedKeys}
            onChange={handleCheck}
          />
        </Column>
        <Column sortable flexGrow={2}>
          {createHeaderCell("CODE")}
          <Cell dataKey="testCode" />
        </Column>
        <Column sortable flexGrow={3} fullText>
          {createHeaderCell("NAME")}
          <Cell dataKey="description" />
        </Column>
        <Column sortable flexGrow={2}>
          {createHeaderCell("TEST TYPE")}
          <Cell dataKey="type" />
        </Column>
        <Column sortable flexGrow={2}>
          {createHeaderCell("PRICE")}
          <Cell dataKey="price" />
        </Column>
        <Column>
          {createHeaderCell("")}
          <Cell dataKey="id" flexGrow={1}>
            {(rowData) => (
              <>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={() => handleTestOpen(rowData.id)}
                  style={{ width: 15, height: 15, marginRight: 20 }}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ width: 15, height: 15 }}
                  onClick={() => handleDelete(rowData.id)}
                />
              </>
            )}
          </Cell>
        </Column>
      </Table>
      <AddTest
        open={testOpen !== false}
        handleClose={() => setTestOpen(false)}
        headText={"Update Test"}
        bodyText={"Update existing test."}
        btnText={"Update"}
        id={testOpen}
      />
    </>
  );
}

export default All;
