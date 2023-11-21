import React, { useState } from "react";
import "../assets/css/CreatePackage.css";
import { Button, ButtonGroup } from "react-bootstrap";
import {
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
import AddTest from "../components/modals/AddTest";

function CreatePackage() {
  const [testOpen, setTestOpen] = useState(false);
  const handleTestOpen = () => setTestOpen(true);
  const handleTestClose = () => setTestOpen(false);

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
            {/* <RadioGroup name="radioList" inline appearance="picker" className="border-none">
              <Link to="allTests" className="radio-link focus:border-b-2 border-black	font-bold	focus:text-black text-red-600">
                <Radio className="" value="All">All</Radio>
              </Link>
              <Link to="availableTests" className="radio-link">
                <Radio value="Available">Available</Radio>
              </Link>
              <Link to="selectedTests" className="radio-link">
                <Radio value="Selected">Selected</Radio>
              </Link>
            </RadioGroup> */}
            <ButtonGroup>
              <Link
                className="focus:border-b-2 focus:border-black"
                to="allTests"
              >
                <Button className="bg-transparent	text-gray-500 border-x-0 border-t-0 border-b-0	rounded-none	 hover:text-gray-600 focus:border-b-2 focus:border-black focus:text-black">
                  All
                </Button>
              </Link>
              <Link
                className="focus:border-b-2 border-black	font-bold	focus:text-black text-red-600"
                to="availableTests"
              >
                <Button className="bg-transparent	text-gray-500 border-x-0 border-t-0 border-b-0	rounded-none	 hover:text-gray-600 focus:border-b-2 focus:border-black focus:text-black">
                  Available
                </Button>
              </Link>
              <Link
                className="focus:border-b-2 border-black	font-bold	focus:text-black text-red-600"
                to="selectedTests"
              >
                <Button className="bg-transparent	text-gray-500 border-x-0 border-t-0 border-b-0	rounded-none	 hover:text-gray-600 focus:border-b-2 focus:border-black focus:text-black">
                  Selected
                </Button>
              </Link>
            </ButtonGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6}>
            <Row>
              <Col>Total selected amount:</Col>
              <Col>Rs.1900.00 </Col>
            </Row>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider className="mt-0 mb-10" />
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
            <Button
              onClick={handleTestOpen}
              className="w-30 h-10 bg-blue-600 text-white"
            >
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
          <Button type="submit" className="w-40 h-10 bg-blue-600 text-white">
            Continue
          </Button>
        </FlexboxGrid>
      </form>
      <AddTest open={testOpen} handleClose={handleTestClose} />
    </Container>
  );
}

export default CreatePackage;
