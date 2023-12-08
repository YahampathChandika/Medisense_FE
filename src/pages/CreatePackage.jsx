import React, { useState, useEffect } from "react";
import "../assets/css/CreatePackage.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Container,
  Divider,
  Input,
  Row,
  FlexboxGrid,
  InputGroup,
  RadioGroup,
  Radio,
} from "rsuite";
import { useForm } from "react-hook-form";
import "rsuite/dist/rsuite-no-reset.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import AddTest from "../components/modals/AddTest";

function CreatePackage() {
  const [testOpen, setTestOpen] = useState(false);
  const handleTestOpen = () => setTestOpen(true);
  const handleTestClose = () => setTestOpen(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    document.title = "Create Package | Medisense";
  }, []);

  const btnStyles =
    "bg-transparent	text-gray-500 border-x-0 border-t-0 border-b-0	rounded-none	 hover:text-black focus:border-b-2 focus:border-black focus:text-black";

  return (
    <Container className="gcc-con">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="text-black font-montserrat text-3xl font-semibold">
          Create Package
        </Row>
        <Divider className="border-t-2 border-gray-300" />
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

        <Row className="text-black font-montserrat text-2xl font-semibold">
          Select Tests
        </Row>

        <FlexboxGrid justify="space-between" style={{ marginTop: "15px" }}>
          <FlexboxGrid.Item colspan={7}>
            <RadioGroup
              name="radioList"
              inline
              appearance="picker"
              defaultValue="allTests"
              className="border-none"
            >
              <Radio value="allTests" onClick={() => navigate("allTests")}>
                All
              </Radio>
              <Radio
                value="availableTests"
                onClick={() => navigate("availableTests")}
              >
                Available
              </Radio>
              <Radio
                value="selectedTests"
                onClick={() => navigate("selectedTests")}
              >
                Selected
              </Radio>
            </RadioGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item
            colspan={10}
            className="flex flex-nowrap justify-end items-center"
          >
            <Row className="space-x-2">
              <Col className="flex flex-nowrap">Total selected amount:</Col>
              <Col className="flex flex-nowrap font-semibold">Rs.19000.00 </Col>
            </Row>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider className="mt-0 mb-10" />
        <Row className="border-1 rounded-md mb-4">
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
                onClick={handleTestOpen}
                className="w-40 h-10 bg-blue-800 text-white"
              >
                Add Test
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Outlet />
        </Row>
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
          <Button type="submit" className="w-40 h-10 bg-blue-800 text-white">
            Create
          </Button>
        </FlexboxGrid>
      </form>
      <AddTest
        open={testOpen}
        handleClose={handleTestClose}
        headText={"Add Test"}
        bodyText={"Create a new test."}
        btnText={"Create"}
      />
    </Container>
  );
}

export default CreatePackage;
