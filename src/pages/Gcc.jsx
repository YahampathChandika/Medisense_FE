import React, { useState } from "react";
import "../assets/css/Gcc.css";
import {
  Container,
  Divider,
  Input,
  InputGroup,
  Row,
  FlexboxGrid,
  Uploader,
  DatePicker,
  SelectPicker,
} from "rsuite";

import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import "rsuite/dist/rsuite-no-reset.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import AddJobModal from "../components/modals/AddJob";
import AddCountryModal from "../components/modals/AddCountry";
import { useNavigate } from "react-router-dom";

function Gcc() {
  const [jobOpen, setJobOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  const handleJobOpen = () => setJobOpen(true);
  const handleJobClose = () => setJobOpen(false);
  const handleCountryOpen = () => setCountryOpen(true);
  const handleCountryClose = () => setCountryOpen(false);

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
    setValue, // Add this line to destructure setValue from form methods
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Format the date before logging the data
    const formattedDateOfBirth = format(data.dateOfBirth, "yyyy-MM-dd");

    // Log the data with the formatted date
    console.log({ ...data, dateOfBirth: formattedDateOfBirth });
  };

  return (
    <Container className="gcc-con">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11} className="main-title">
            Applicant Details
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
        <Divider />
        <Row>Full Name</Row>
        <Input {...register("name")} />
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11}>
            <Row>Profile Photo</Row>
            <label className=" w-40 h-40 flex justify-center items-center bg-gray-300 rounded-full ml-40 cursor-pointer mt-1 transition duration-500">
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
            <DatePicker
              block
              oneTap
              format="yyyy-MM-dd"
              id="dateOfBirth"
              name="dateOfBirth"
              value={watch("dateOfBirth")} // Make sure to pass the value from react-hook-form
              onChange={(value) => setValue("dateOfBirth", value)} // Use setValue to update the form value
            />
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
          <Input {...register("address")} name="address" />
        </Row>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11}>
            <Row>Email</Row>
            <Input
              {...register("email")}
              placeholder="john@example.com"
              name="email"
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
            <Input {...register("phone")} name="phone" />
            <Row>NIC</Row>
            <Input {...register("nic")} name="nic" />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider />
        <Row>
          <Row>Passport Details</Row>
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={7}>
              <Input {...register("passportId")} placeholder="Passport ID" />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={7}>
              <DatePicker block oneTap placeholder="Issued Date" />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={7}>
              <Input
                {...register("passportPlace")}
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
                className="gcc-select-drop"
                {...register("agency")}
                onChange={(value) => setValue("agency", value)}
              />
              <Button
                onClick={() => navigate("/home/addAgency")}
                className="gcc-add-btn btn btn-outline-primary"
              >
                Add
              </Button>
            </Row>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={7}>
            <Row>Job</Row>
            <Row className="gcc-select">
              <SelectPicker className="gcc-select-drop" />
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
              <SelectPicker className="gcc-select-drop" />
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
        <FlexboxGrid justify="end">
          <Button type="submit" className="w-40 h-10 bg-blue-600 text-white">
            Continue
          </Button>
        </FlexboxGrid>
      </form>
      <AddJobModal open={jobOpen} handleClose={handleJobClose} />
      <AddCountryModal open={countryOpen} handleClose={handleCountryClose} />
    </Container>
  );
}

export default Gcc;
