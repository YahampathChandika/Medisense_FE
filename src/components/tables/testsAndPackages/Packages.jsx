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
import Swal from "sweetalert2";

function SelectedPackages() {
  const data = mockData(15);
  const navigate = useNavigate();
  const [deletePackage] = useDeletePackageMutation();
  const {
    data: packageData,
    isLoading,
    error,
    refetch,
  } = useGetAllPackagesQuery();

  const handleDelete = async (packageId) => {
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
        await deletePackage(packageId);
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
                      onClick={() => handleDelete(data.id)}
                    />
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="selectedpackages-footer"></div>
    </div>
  );
}

export default SelectedPackages;
