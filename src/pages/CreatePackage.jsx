import React, { useState } from "react";
import "../assets/css/CreatePackage.css";
import {
  Button,
  Col,
  Container,
  Divider,
  Input,
  Row,
  FlexboxGrid,
  InputGroup,
  Radio,
  RadioGroup,
} from "rsuite";
import { useForm } from "react-hook-form";
import "rsuite/dist/rsuite-no-reset.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";

function CreatePackage() {
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
        <Row className="main-title">Create Package</Row>
        <Divider />
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11}>
            <Row>Package Code</Row>
            <Input {...register("pkgCode")} />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={11}>
            <Row>Package Name</Row>
            <Input {...register("pkgName")} />
          </FlexboxGrid.Item>
        </FlexboxGrid>

        <Row className="main-title">Select Tests</Row>

        <FlexboxGrid justify="space-between" style={{ marginTop: "15px" }}>
          <FlexboxGrid.Item colspan={7}>
            <RadioGroup name="radioList" inline appearance="picker">
              <Link to="allTests" className="radio-link " >
                <Radio value="All" >All</Radio>
              </Link>
              <Link to="availableTests" className="radio-link">
                <Radio value="Available">Available</Radio>
              </Link>
              <Link to="selectedTests" className="radio-link">
                <Radio value="Selected">Selected</Radio>
              </Link>
            </RadioGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6}>
            <Row>
              <Col>Total selected amount:</Col>
              <Col>Rs.1900.00 </Col>
            </Row>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider />
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11}>
            <InputGroup>
              <Input placeholder="Search Tests ..." style={{ margin: 0 }} />
              <InputGroup.Button>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Button>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={3}>
            <Button appearance="primary" style={{ width: "100px" }}>
              Add Test
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>

        <Outlet />

        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11}>
            <Row>Package Price</Row>
            <Input {...register("pkgPrice")} />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={11}>
            <Row>Description</Row>
            <Input {...register("desc")} />
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

export default CreatePackage;
