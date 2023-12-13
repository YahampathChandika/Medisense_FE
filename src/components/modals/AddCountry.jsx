// ModalComponent.jsx
import React from "react";
import { Modal, Button, Row, Col, FlexboxGrid, Input } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

function AddCountryModal({ open, handleClose }) {

  const form = useForm({
    mode: "onTouched",
  });
  const { register, handleSubmit, reset, setValue } = form;


  return (
    <Modal
      style={{
        top: "10%",
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={open}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit()}>
        <FlexboxGrid
          justify="space-between"
          className="flex justify-between items-center"
        >
          <FlexboxGrid.Item colspan={9}>
            <Col className="font-semibold text-2xl">Add Country</Col>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={3}>
            <Col className="border-double border-4 text-blue-700	 border-slate-100 bg-slate-200 rounded-full h-12 w-12 items-center flex justify-center">
              <FontAwesomeIcon icon={faEarthAmericas} />
            </Col>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Row>Add a new Country.</Row>
        <Row className="mt-4">
          <Row>Name of Country</Row>
          <Input className="mb-2" />
          <FlexboxGrid
            justify="space-between"
            className="flex justify-between items-center"
          >
            <FlexboxGrid.Item colspan={15}>
              <Row>Country Code</Row>
              <Input />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={7}>
              <Row>Type</Row>
              <Input />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Row>
        <Row className="w-full flex space-x-8 mt-2">
          <Button
            type="submit"
            className="w-3/6 bg-blue-700 text-white hover:bg-blue-800"
          >
            Create
          </Button>
          <Button
            onClick={handleClose}
            className="w-3/6 border-solid border border-slate-700"
          >
            Cancel
          </Button>
        </Row>
      </form>
    </Modal>
  );
}

export default AddCountryModal;
