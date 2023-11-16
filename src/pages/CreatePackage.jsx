import React from "react";
import "../assets/css/CreatePackage.css";
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
        <Row className="main-title"> Create Package</Row>
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
