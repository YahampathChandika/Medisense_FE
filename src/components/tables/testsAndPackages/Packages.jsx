import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import "../../../assets/css/Tests.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSearch,
  faTrash,
  faCaretUp,
  faCaretDown,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FlexboxGrid, Input, InputGroup } from "rsuite";
import { useNavigate } from "react-router";
import {
  useDeletePackageMutation,
  useGetAllPackagesQuery,
} from "../../../store/api/testApi";
import FailModal from "../../modals/Fail";

function Packages() {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState({
    column: null,
    order: "asc",
  });
  const [deletePackage] = useDeletePackageMutation();
  const {
    data: packageData,
    isLoading,
    error,
    refetch,
  } = useGetAllPackagesQuery();

  const handleDeleteOpen = (id) => setDeleteOpen(id);
  const handleDeleteclose = () => setDeleteOpen(false);

  const handleSort = (column) => {
    setSorting((prevSorting) => ({
      column,
      order:
        prevSorting.column === column && prevSorting.order === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const filteredData = packageData?.payload
    ? packageData.payload.filter((data) =>
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
        const aValue = a[sorting.column];
        const bValue = b[sorting.column];
        return sorting.order === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
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
              onClick={() => navigate("/home/createPackage")}
              className="w-40 h-10 bg-blue-800 text-white"
            >
              Add Package
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
              <th onClick={() => handleSort("packageCode")}>
                Package Code
                <FontAwesomeIcon
                  icon={
                    sorting.column === "packageCode"
                      ? sorting.order === "asc"
                        ? faCaretUp
                        : faCaretDown
                      : faSort
                  }
                  className="ml-2"
                />
              </th>
              <th onClick={() => handleSort("name")}>
                Name
                <FontAwesomeIcon
                  icon={
                    sorting.column === "name"
                      ? sorting.order === "asc"
                        ? faCaretUp
                        : faCaretDown
                      : faSort
                  }
                  className="ml-2"
                />
              </th>
              <th onClick={() => handleSort("discription")}>
                Description
                <FontAwesomeIcon
                  icon={
                    sorting.column === "discription"
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
            {sortedData().map((data) => (
              <tr key={data.id}>
                <td>{data.packageCode}</td>
                <td>{data.name}</td>
                <td>{data.discription}</td>
                <td>{data.price}</td>
                <td>
                  <>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ width: 15, height: 15, marginRight: 20 }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ width: 15, height: 15 }}
                      onClick={() => handleDeleteOpen(data.id)}
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
      <FailModal
        open={deleteOpen !== false}
        handleClose={handleDeleteclose}
        headtxt="Delete Package"
        bodytxt="Are you sure you want to delete this package? This action cannot be undone."
        btntxt="Delete"
        id={deleteOpen}
        deleteApi={deletePackage}
        refetchTable={refetch}
      />
    </div>
  );
}

export default Packages;
