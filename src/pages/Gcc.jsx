import React from "react";
import "../assets/css/Gcc.css";
import {
  Button,
  Col,
  Container,
  Divider,
  Input,
  InputGroup,
  Row,
  FlexboxGrid,
  Uploader,
  DatePicker,
  SelectPicker,
  Dropdown,
} from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import "rsuite/dist/rsuite-no-reset.min.css";
import AddJobModal from "../components/modals/AddJob";

function Gcc() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container className="gcc-con">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11} className="gcc-title">
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
            <Uploader listType="picture" action="//example.com/upload">
              <button style={{ width: "120px", height: "120px" }}>
                <FontAwesomeIcon icon={faCamera} />
              </button>
            </Uploader>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={11}>
            <Row>Date of Birth</Row>
            <DatePicker block oneTap />
            <Row>Sex</Row>
            <SelectPicker
              searchable={false}
              style={{ width: "100%" }}
              data={["Male", "Female"].map((item) => ({
                label: item,
                value: item,
              }))}
              {...register("sex")}
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
              data={["Married", "Single", "Divorced", "Widowed "].map(
                (item) => ({
                  label: item,
                  value: item,
                })
              )}
              {...register("civilStatus")}
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
              <SelectPicker className="gcc-select-drop" />
              <Button className="gcc-select-btn">Add</Button>
            </Row>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={7}>
            <Row>Job</Row>
            <Row className="gcc-select">
              <SelectPicker className="gcc-select-drop" />
              <Button className="gcc-select-btn">Add</Button>
            </Row>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={7}>
            <Row>Country</Row>
            <Row className="gcc-select">
              <SelectPicker className="gcc-select-drop" />
              <Button className="gcc-select-btn">Add</Button>
            </Row>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider />
        <FlexboxGrid justify="end">
          <Button
            type="submit"
            appearance="primary"
            style={{ height: 40, width: 100 }}
          >
            Continue
          </Button>
        </FlexboxGrid>
      </form>
    </Container>
  );
}

export default Gcc;
