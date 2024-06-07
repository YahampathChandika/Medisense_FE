import React from "react";
import {
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Footer,
  Header,
  Radio,
  RadioGroup,
} from "rsuite";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectePackage, selecteTest } from "../store/slice/selectPackageSlice";
import {
  useAddPackageAndTestMutation,
  useGetAllCustomersQuery,
} from "../store/api/customerApi";

import Swal from "sweetalert2";
import {
  useGetCashierListMatricesQuery,
  useGetCashierListQuery,
} from "../store/api/cashierApi";

function Test() {
  const { customerId, admissionId } = useParams();
  const navigate = useNavigate();
  // console.log("id", customerId);
  // console.log("id2", admissionId);
  const { refetch: getAllCustomersrefetch } = useGetAllCustomersQuery();
  const [addPackage] = useAddPackageAndTestMutation();
  const selectedPackage = useSelector(selectePackage);
  const selectedTest = useSelector(selecteTest);
  const { refetch: cashierListrefetch } = useGetCashierListQuery();
  const { refetch: cashierMatricesrefetch } = useGetCashierListMatricesQuery();
  // console.log("selectedTest from Redux store:", selectedTest);
  const ids = selectedPackage.map((item) => item.id);
  // console.log("IDs from Redux store:", ids);

  const testId = selectedTest.map((item) => item.id);
  // console.log("testId from Redux store:", testId);

  const handleSubmit = async () => {
    const data = {
      packages: ids,
      tests: testId,
    };

    console.log("Data to be sent:", data);

    try {
      const response = await addPackage({ data, customerId, admissionId });

      if (response.error) {
        Swal.fire({
          title: "Oops...",
          text: response?.error?.data?.payload,
          icon: "error",
        });
      } else {
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
          title: response?.data?.payload,
        });
        console.log("Response from the server:", response);
        navigate("/home/dashboard");
        getAllCustomersrefetch();
        cashierMatricesrefetch();
        cashierListrefetch();
      }
    } catch (error) {
      // Handle errors if the mutation fails
      console.error("Error adding package:", error);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Container className="gcc-con">
        <Header>
          <FlexboxGrid justify="start">
            <FlexboxGrid.Item colspan={20} className="main-title">
              Tests
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>
        <Divider className="border-t-2 border-gray-300 mb-1 mt-1" />
        <FlexboxGrid justify="space-between" style={{ marginTop: "15px" }}>
          <FlexboxGrid.Item colspan={7}>
            <RadioGroup
              name="radioList"
              inline
              appearance="picker"
              defaultValue="selectedPackages"
              className="border-none"
            >
              <Radio
                value="selectedPackages"
                onClick={() => navigate("selectedPackages")}
              >
                Select Packages
              </Radio>
              <Radio
                value="availableTests"
                onClick={() => navigate("selectedPackages")}
              >
                Package Contents
              </Radio>
            </RadioGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider className="mt-0 " />
        <Content>
          <Outlet />
        </Content>
      </Container>
      <Divider className="border-t-2 border-gray-200  mt-1" />
      <Footer>
        <FlexboxGrid justify="end" style={{ paddingRight: "5%" }}>
          <Button
            onClick={handleSubmit}
            className="w-40 h-10 bg-blue-800 text-white mb-4"
          >
            Save
          </Button>
        </FlexboxGrid>
      </Footer>
    </div>
  );
}

export default Test;
