import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../assets/css/Gcc.css";
import {
  Container,
  Divider,
  Input,
  InputGroup,
  Row,
  Button,
  FlexboxGrid,
  DatePicker,
  SelectPicker,
} from "rsuite";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import "rsuite/dist/rsuite-no-reset.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "react-bootstrap";
import AddAgency from "../components/modals/AddAgency";
import AddJobModal from "../components/modals/AddJob";
import AddCountryModal from "../components/modals/AddCountry";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  useGetGccCountriesQuery,
  useGetNonGccCountriesQuery,
} from "../store/api/countryApi";
import { useGetAllJobsQuery } from "../store/api/jobApi";
import { useGetAllAgencyQuery } from "../store/api/agencyApi";
import {
  useAddCustomerMutation,
  useGetAllCustomersQuery,
  useGetCustomerByIDQuery,
} from "../store/api/customerApi";
import { useParams } from "react-router-dom";
import { useGetCustomerQuery } from "../store/api/cashierApi";

function Gcc() {
  const { customerId } = useParams();
  console.log("customerId", customerId);
  const location = useLocation();
  const [testType, setTestType] = useState(null);
  const [agencyOpen, setAgencyOpen] = useState(false);
  const [jobOpen, setJobOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const { data: gccData } = useGetGccCountriesQuery();
  const { data: nonGccData } = useGetNonGccCountriesQuery();
  const { data: jobData } = useGetAllJobsQuery();
  const { data: agencyData } = useGetAllAgencyQuery();
  const [addCustomer] = useAddCustomerMutation();
  const { refetch } = useGetAllCustomersQuery();

  const handleAgencyOpen = () => setAgencyOpen(true);
  const handleAgencyClose = () => setAgencyOpen(false);
  const handleJobOpen = () => setJobOpen(true);
  const handleJobClose = () => setJobOpen(false);
  const handleCountryOpen = () => setCountryOpen(true);
  const handleCountryClose = () => setCountryOpen(false);
  const {
    data: customerData,
    error,
    isLoading,
    isError,
  } = useGetCustomerByIDQuery(customerId, { skip: !customerId });

  console.log("data", customerData);
  console.log("res", customerData?.payload?.fullName);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const testTypeParam = params.get("testType");

    if (customerId) {
      document.title = "Update Customer | Medisense";
    } else if (testTypeParam !== null) {
      const testTypeValue = testTypeParam === "true";
      setTestType(testTypeValue);
      document.title = testTypeValue
        ? "GCC | Medisense"
        : "Non GCC | Medisense";
    }
  }, [location, customerId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
  };
  const form = useForm({
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = form;

  const formattedDate = formatDate(getValues("dateOfBirth"));

  function formatDate(date) {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const navigate = useNavigate();

  // const onSubmit = async (data, e) => {
  //   console.log("data",data);
  //   const formattedDate = formatDate(data.dateOfBirth);
  //   const updatedInputData = {
  //     ...data,
  //     dateOfBirth: formattedDate,
  //     medicalType: testType ? "GCC" : "Non GCC",
  //   };

  //   try {
  //     const response = await addCustomer(updatedInputData);
  //     console.log("Customer:", response);

  //     if (!response.error) {
  //       const customerId = response?.data?.customerId;
  //       const admissionId = response?.data?.admissionId;
  //       console.log("Customer ID:", customerId);
  //       navigate(`/home/test/${customerId}/${admissionId}`);
  //     } else {
  //       console.error("Error registering customer:", response.payload);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }

  //   e.preventDefault();
  //   console.log("data", updatedInputData);
  // };

  const onSubmit = async (data, e) => {
    const formattedDate = formatDate(data.dateOfBirth);
    const updatedInputData = {
      ...data,
      dateOfBirth: formattedDate,
      medicalType: testType ? "GCC" : "Non GCC",
    };

    const formData = new FormData();

    formData.append("image", profilePic);
    formData.append("fullName", data.fullName);
    formData.append("dateOfBirth", updatedInputData.dateOfBirth);
    formData.append("sex", data.sex);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("mobileNo", data.mobileNo);
    formData.append("civilStatus", data.civilStatus);
    formData.append("nic", data.nic);
    formData.append("passportId", data.passportId);
    formData.append("issuedDate", data.issuedDate);
    formData.append("issuedPlace", data.issuedPlace);
    formData.append("agencyId", data.agencyId);
    formData.append("jobId", data.jobId);
    formData.append("countryId", data.countryId);
    formData.append("medicalType", updatedInputData.medicalType);

    try {
      console.log("data",data);
      console.log("formData", formData);
      const response = await addCustomer(formData);

      if (!response.error) {
        refetch();
        const customerId = response?.data?.customerId;
        const admissionId = response?.data?.admissionId;
        navigate(`/home/test/${customerId}/${admissionId}`);
      } else {
        console.error("Error registering customer:", response.payload);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }

    e.preventDefault();
    console.log("data", updatedInputData);
  };

  return (
    <Container className="gcc-con">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11} className="main-title">
            {customerId ? (
              <p>Update Customer</p>
            ) : (
              <p>{testType ? "GCC Register" : "Non GCC Register"}</p>
            )}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={11}>
            <InputGroup>
              <Input
                placeholder="Search by ID or name..."
                style={{ margin: 0 }}
              />
              <InputGroup.Button>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Button>
            </InputGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        {isLoading ? (
          <div>IsLoading</div>
        ) : isError ? (
          <div>Error..</div>
        ) : (
          <>
            <Divider className="border-t-2 border-gray-300" />
            <Row>Full Name</Row>
            <Input
              {...register("fullName")}
              defaultValue={customerData?.payload?.fullName}
            />
            <FlexboxGrid justify="space-between">
              <FlexboxGrid.Item colspan={11}>
                <Row>Profile Photo</Row>
                <label className="w-40 h-40 flex justify-center items-center bg-gray-300 rounded-full ml-40 cursor-pointer mt-1 transition duration-500">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  {profilePic ? (
                    <img
                      src={URL.createObjectURL(profilePic)}
                      alt="Profile"
                      className="w-40 h-40 rounded-full"
                    />
                  ) : customerData?.payload?.image ? (
                    <img
                      src={`http://localhost:3002/${customerData?.payload?.image}`}
                      alt="Profile"
                      className="w-40 h-40 rounded-full"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCamera}
                      style={{ width: 35, height: 50, color: "white" }}
                    />
                  )}
                </label>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={11}>
                <Row>Date of Birth</Row>
                {customerId ? (
                  <input
                    {...register("dateOfBirth")}
                    autoComplete="false"
                    className="rs-input"
                    defaultValue={customerData?.payload?.dateOfBirth}
                  />
                ) : (
                  <DatePicker
                    block
                    oneTap
                    format="MM-dd-yyyy"
                    placeholder="MM-dd-yyyy"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={watch("dateOfBirth")}
                    onChange={(value) => setValue("dateOfBirth", value)}
                  />
                )}
                <Row>Sex</Row>
                <SelectPicker
                  searchable={false}
                  style={{ width: "100%" }}
                  data={["Male", "Female"].map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  {...register("sex")}
                  onChange={(value) => setValue("sex", value)}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
            <Row>
              <Row>Address</Row>
              <input
                {...register("address")}
                autoComplete="false"
                className="rs-input"
              />
            </Row>
            <FlexboxGrid justify="space-between">
              <FlexboxGrid.Item colspan={11}>
                <Row>Email</Row>
                <input
                  {...register("email")}
                  placeholder="john@example.com"
                  name="email"
                  className="rs-input"
                />
                <Row>Civil Status</Row>
                <SelectPicker
                  searchable={false}
                  style={{ width: "100%" }}
                  data={["Married", "Single", "Divorced", "Widowed"].map(
                    (item) => ({
                      label: item,
                      value: item,
                    })
                  )}
                  {...register("civilStatus")}
                  onChange={(value) => setValue("civilStatus", value)}
                />
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={11}>
                <Row>Mobile Number</Row>
                <Input {...register("mobileNo")} />
                <Row>NIC</Row>
                <Input {...register("nic")} />
              </FlexboxGrid.Item>
            </FlexboxGrid>
            <Divider />
            <Row>
              <Row>Passport Details</Row>
              <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item colspan={7}>
                  <Input
                    {...register("passportId")}
                    placeholder="Passport ID"
                  />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={7}>
                  {customerId ? (
                    <Input
                      {...register("issuedDate")}
                      defaultValue={customerData?.payload?.issuedDate}
                    />
                  ) : (
                    <DatePicker
                      block
                      oneTap
                      placeholder="Issued Date"
                      id="issuedDate"
                      name="issuedDate"
                      value={watch("issuedDate")}
                      onChange={(value) => setValue("issuedDate", value)}
                    />
                  )}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={7}>
                  <Input
                    {...register("issuedPlace")}
                    placeholder="Issued Place"
                  />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Row>
            <FlexboxGrid justify="space-between">
              <FlexboxGrid.Item colspan={7}>
                <Row>Agency</Row>
                <Row className="gcc-select">
                  <SelectPicker
                    menuMaxHeight={120}
                    className="gcc-select-drop"
                    style={{ width: "100%" }}
                    data={agencyData?.payload.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    {...register("agencyId")}
                    onChange={(value) => setValue("agencyId", value)}
                  />
                  <Button
                    onClick={handleAgencyOpen}
                    className="gcc-add-btn btn btn-outline-primary"
                  >
                    Add
                  </Button>
                </Row>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={7}>
                <Row>Job</Row>
                <Row className="gcc-select">
                  <SelectPicker
                    menuMaxHeight={120}
                    className="gcc-select-drop"
                    style={{
                      width: "100%",
                      maxHeight: "100px",
                    }}
                    data={jobData?.payload.map((item) => ({
                      label: item.job,
                      value: item.id,
                    }))}
                    {...register("jobId")}
                    onChange={(value) => setValue("jobId", value)}
                  />
                  <Button
                    onClick={handleJobOpen}
                    className="gcc-add-btn btn btn-outline-primary"
                  >
                    Add
                  </Button>
                </Row>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={7}>
                <Row>Country</Row>
                <Row className="gcc-select">
                  {customerId ? (
                    <SelectPicker
                      menuMaxHeight={120}
                      className="gcc-select-drop"
                      style={{ width: "100%" }}
                      data={[
                        ...(gccData?.payload || []),
                        ...(nonGccData?.payload || []),
                      ].map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      {...register("countryId")}
                      onChange={(value) => setValue("countryId", value)}
                    />
                  ) : testType ? (
                    <SelectPicker
                      menuMaxHeight={120}
                      className="gcc-select-drop"
                      style={{ width: "100%" }}
                      data={gccData?.payload.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      {...register("countryId")}
                      onChange={(value) => setValue("countryId", value)}
                    />
                  ) : (
                    <SelectPicker
                      menuMaxHeight={100}
                      className="gcc-select-drop"
                      style={{ width: "100%" }}
                      data={nonGccData?.payload.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      {...register("countryId")}
                      onChange={(value) => setValue("countryId", value)}
                    />
                  )}

                  <Button
                    onClick={handleCountryOpen}
                    className="gcc-add-btn btn btn-outline-primary"
                  >
                    Add
                  </Button>
                </Row>
              </FlexboxGrid.Item>
            </FlexboxGrid>
            <Divider />
          </>
        )}

        <FlexboxGrid justify="end">
          <Button type="submit" className="w-40 h-10 btn btn-primary">
            Continue
          </Button>
        </FlexboxGrid>
      </form>
      <AddAgency
        open={agencyOpen !== false}
        handleClose={handleAgencyClose}
        agencyhead="Add Agency"
        buttonName="Register"
      />
      <AddJobModal open={jobOpen} handleClose={handleJobClose} />
      <AddCountryModal open={countryOpen} handleClose={handleCountryClose} />
    </Container>
  );
}

export default Gcc;
