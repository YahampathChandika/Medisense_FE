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
import { useNavigate } from "react-router";
import {
  useDeletePackageMutation,
  useGetAllPackagesQuery,
} from "../../../store/api/testApi";
import FailModal from "../../modals/Fail";
import { useState } from "react";

function SelectedPackages() {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = (id) => setDeleteOpen(id);
  const handleDeleteclose = () => setDeleteOpen(false);
  const [deletePackage] = useDeletePackageMutation();
  const {
    data: packageData,
    isLoading,
    error,
    refetch,
  } = useGetAllPackagesQuery();


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
              <th>Package Code</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="selectedpackages-table-body">
            {packageData?.payload.map((data) => (
              <tr key={data.id}>
                <td>{data.packageCode}</td>
                <td>{data.packageCode}</td>
                <td>{data.packageCode}</td>
                <td>{data.packageCode}</td>
                <td>
                  <>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      // onClick={() => handleTestOpen(data.id)}
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

export default SelectedPackages;
