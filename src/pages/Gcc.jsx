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
} from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";
import "rsuite/dist/rsuite-no-reset.min.css";

function Gcc() {
  return (
    <Container className="gcc-con">
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
      <Input />
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={11}>
          <Row>Profile Photo</Row>
          <Uploader listType="picture">
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
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Row>
        <Row>Address</Row>
        <Input name="address" />
      </Row>
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={11}>
          <Row>Email</Row>
          <Input placeholder="john@example.com" name="email" />
          <Row>Civil Status</Row>
          <SelectPicker
            searchable={false}
            style={{ width: "100%" }}
            data={["Married", "Single", "Divorced", "Widowed "].map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11}>
          <Row>Mobile Number</Row>
          <Input name="phone" />
          <Row>NIC</Row>
          <Input name="nic" />
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Divider />
      <Row>
        <Row>Passport Details</Row>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={7}>
            <Input placeholder="Passport ID" />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={7}>
            <DatePicker block oneTap placeholder="Issued Date" />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={7}>
            <Input placeholder="Issued Place" />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Row>
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={7}>
          <Row>Agency</Row>
          <Row className="gcc-select">
            <SelectPicker className="gcc-select-drop"/>
            <Button className="gcc-select-btn">
              Add
            </Button>
          </Row>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={7}>
          <Row>Job</Row>
          <Row className="gcc-select">
            <SelectPicker className="gcc-select-drop"/>
            <Button className="gcc-select-btn">
              Add
            </Button>
          </Row>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={7}>
          <Row>Country</Row>
          <Row className="gcc-select">
            <SelectPicker className="gcc-select-drop"/>
            <Button className="gcc-select-btn">
              Add
            </Button>
          </Row>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Divider />
      <FlexboxGrid justify="end">
        <Button appearance="primary" style={{ height: 40, width: 100 }}>
          Continue
        </Button>
      </FlexboxGrid>
    </Container>
  );
}

export default Gcc;
