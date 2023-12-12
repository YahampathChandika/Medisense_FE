import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table, Checkbox } from "rsuite";
import AddTest from "../../modals/AddTest";
import {
  useDeleteTestMutation,
  useGetAllTestsQuery,
} from "../../../store/api/testApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedTest,
  clearSelectedTests,
  removeSelectedTest,
} from "../../../store/slice/testSlice";
import FailModal from "../../modals/Fail";

function All() {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  // const [selectedTests, setSelectedTests] = useState([]);
  const [testOpen, setTestOpen] = useState(false);
  const { data: testData, isLoading, error, refetch } = useGetAllTestsQuery();
  const [deleteTest] = useDeleteTestMutation();
  const { Column, HeaderCell, Cell } = Table;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = (id) => setDeleteOpen(id);
  const handleDeletecloce = () => setDeleteOpen(false);



  const dispatch = useDispatch();
  const selectedTests = useSelector((state) => state.selectedTests);

  console.log("selectedTests", selectedTests.price);

  const handleTestOpen = (id) => setTestOpen(id);
  const handleTestClose = () => setTestOpen(false);

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
    const selectedTestsArray = checked
      ? testData.payload.map((item) => ({ id: item.id, price: item.price }))
      : [];

    dispatch(clearSelectedTests());
    selectedTestsArray.forEach((test) => {
      dispatch(addSelectedTest(test));
    });
  };

  const handleCheck = (value, checked) => {
    if (checked) {
      dispatch(addSelectedTest({ id: value.id, price: value.price }));
    } else {
      dispatch(removeSelectedTest({ id: value.id, price: value.price }));
    }
  };

  const CheckCell = ({ rowData, onChange, checkedKeys, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: "46px" }}>
        <Checkbox
          value={{ id: rowData.id, price: rowData.price }}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item) => item === rowData.id)}
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
                selectedTests.tests.length === testData?.payload?.length &&
                selectedTests.tests.length !== 0
              }
              indeterminate={
                selectedTests.tests.length > 0 &&
                selectedTests.tests.length < testData?.payload?.length
              }
              onChange={handleCheckAll}
              style={{ marginTop: "2px" }}
            />
          </HeaderCell>
          <CheckCell checkedKeys={selectedTests.tests} onChange={handleCheck} />
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
                  onClick={() => handleDeleteOpen(rowData.id)}
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
       <FailModal
          open={deleteOpen !== false}
          handleClose={handleDeletecloce}
          headtxt="Delete Test"
          bodytxt="Are you sure you want to delete this Test? This action cannot be undone."
          btntxt="Delete"
          id={deleteOpen}
          deleteApi={deleteTest}
          refetchTable={refetch}
        />
    </>
  );
}

export default All;
