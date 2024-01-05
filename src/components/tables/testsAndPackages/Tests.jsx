import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import "../../../assets/css/Tests.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faPenToSquare,
  faSearch,
  faSort,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FlexboxGrid, Input, InputGroup } from "rsuite";
import AddTest from "../../modals/AddTest";
import {
  useDeleteTestMutation,
  useGetAllTestsQuery,
} from "../../../store/api/testApi";
import FailModal from "../../modals/Fail";

function Tests() {
  const [testOpen, setTestOpen] = useState(false);
  const [addTestOpen, setAddTestOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState({
    column: null,
    order: null,
  });

  const handleAddTestOpen = () => setAddTestOpen(true);
  const handleTestOpen = (id) => setTestOpen(id);
  const handleDeleteOpen = (id) => setDeleteOpen(id);
  const handleDeleteclose = () => setDeleteOpen(false);
  const { data: testData, isLoading, error, refetch } = useGetAllTestsQuery();
  const [deleteTest] = useDeleteTestMutation();

  const handleSort = (column) => {
    setSorting((prevSorting) => ({
      column,
      order:
        prevSorting.column === column && prevSorting.order === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const filteredData = testData?.payload
    ? testData.payload.filter((data) =>
        Object.values(data).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    : [];

  const sortedData = () => {
    if (sorting.column && filteredData) {
      const sorted = [...filteredData];
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
    return filteredData || [];
  };

  return (
    <div className="selectedpackages-main-con">
      <div className="selectedpackages-table-top">
        <FlexboxGrid justify="space-between" className="m-3">
          <FlexboxGrid.Item colspan={11}>
            <InputGroup>
              <Input
                placeholder="Search Tests ..."
                style={{ margin: 0 }}
                value={searchValue}
                onChange={(value) => setSearchValue(value)}
              />
              <InputGroup.Button>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Button>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6} className="justify-end flex">
            <Button
              onClick={handleAddTestOpen}
              className="w-40 h-10 bg-blue-800 text-white"
            >
              Add Test
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
      <div
        style={{
          maxHeight: "426px",
          overflowY: "auto",
          width: "auto",
          minHeight: "426px",
        }}
      >
        <Table>
          <thead className="selectedpackages-table-head">
            <tr>
              <th onClick={() => handleSort("testCode")}>
                Test Code
                <FontAwesomeIcon
                  icon={
                    sorting.column === "testCode"
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
              <th onClick={() => handleSort("type")}>
                Type
                <FontAwesomeIcon
                  icon={
                    sorting.column === "type"
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
              <th></th>
            </tr>
          </thead>

          <tbody className="selectedpackages-table-body">
            {sortedData().map((test) => (
              <tr key={test.id}>
                <td>{test.testCode}</td>
                <td>{test.description}</td>
                <td>{test.type}</td>
                <td>{test.price}</td>
                <td>
                  <>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={() => handleTestOpen(test.id)}
                      style={{ width: 15, height: 15, marginRight: 20 }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ width: 15, height: 15 }}
                      onClick={() => handleDeleteOpen(test.id)}
                    />
                  </>
                </td>
              </tr>
            ))}
            {filteredData && filteredData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  <p className="text-gray-500">No data to display.</p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="selectedpackages-footer"></div>
      <AddTest
        open={testOpen !== false}
        handleClose={() => setTestOpen(false)}
        headText={"Update Test"}
        bodyText={"Update existing test."}
        btnText={"Update"}
        id={testOpen}
      />
      <AddTest
        open={addTestOpen !== false}
        handleClose={() => setAddTestOpen(false)}
        headText={"Add Test"}
        bodyText={"Create a new test."}
        btnText={"Create"}
      />
      <FailModal
        open={deleteOpen !== false}
        handleClose={handleDeleteclose}
        headtxt="Delete Test"
        bodytxt="Are you sure you want to delete this test? This action cannot be undone."
        btntxt="Delete"
        id={deleteOpen}
        deleteApi={deleteTest}
        refetchTable={refetch}
      />
    </div>
  );
}

export default Tests;