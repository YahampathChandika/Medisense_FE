import React from "react";
import { Button, Table } from "react-bootstrap";
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
import FailModal from "../../modals/Fail";

function SelectedPackages() {
  const [testOpen, setTestOpen] = useState(false);
  const [addTestOpen, setAddTestOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleAddTestOpen = () => setAddTestOpen(true);
  const handleTestOpen = (id) => setTestOpen(id);
  const handleDeleteOpen = (id) => setDeleteOpen(id);
  const handleDeleteclose = () => setDeleteOpen(false);
  const { data: testData, isLoading, error, refetch } = useGetAllTestsQuery();
  const [deleteTest] = useDeleteTestMutation();
  console.log("data", testData);

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
                      onClick={() => handleDeleteOpen(test.id)}
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
      <FailModal
        open={deleteOpen !== false}
        handleClose={handleDeleteclose}
        headtxt="Delete Test"
        bodytxt="Are you sure you want to delete this test? This action cannot be undone."
        btntxt="Delete"
        id={deleteOpen}
        deleteApi={deleteTest}
        refetchTable={refetch}
        titleSucess="Test Deleted"

      />
    </div>
  );
}

export default SelectedPackages;
