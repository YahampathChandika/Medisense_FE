import React from "react";
import { Button, Table } from "react-bootstrap";
import { mockData } from "../../../assets/mocks/mockData";
import "../../../assets/css/Tests.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FlexboxGrid, Input, InputGroup } from "rsuite";
import AddTest from "../../modals/AddTest";
import { useState } from "react";
import {
  useDeleteTestMutation,
  useGetAllTestsQuery,
} from "../../../store/api/testApi";
import Swal from "sweetalert2";

function SelectedPackages() {
  const data = mockData(15);
  const [testOpen, setTestOpen] = useState(false);
  const [addTestOpen, setAddTestOpen] = useState(false);
  const handleAddTestOpen = () => setAddTestOpen(true);
  const handleTestOpen = (id) => setTestOpen(id);
  const handleTestClose = () => setTestOpen(false);
  const { data: testData, isLoading, error, refetch } = useGetAllTestsQuery();
  const [deleteTest] = useDeleteTestMutation();
  console.log("data", testData);

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
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Test Deleted",
        });
      }
    } catch (error) {
      console.error("Error deleting test:", error);
      Swal.fire("Error", "There was an error deleting the record.", "error");
    }
  };

  return (
    <div className="selectedpackages-main-con">
      <div className="selectedpackages-table-top">
        <FlexboxGrid justify="space-between" className="m-3">
          <FlexboxGrid.Item colspan={11}>
            <InputGroup>
              <Input placeholder="Search Tests ..." style={{ margin: 0 }} />
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
              <th>Code</th>
              <th>Description</th>
              <th>Type</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="selectedpackages-table-body">
            {testData?.payload.map((test) => (
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
                      onClick={() => handleDelete(test.id)}
                    />
                  </>
                </td>
              </tr>
            ))}
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
    </div>
  );
}

export default SelectedPackages;
