// ModalComponent.jsx
import React from "react";
import { Modal, Button, Row, Col, FlexboxGrid, Input } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVial } from "@fortawesome/free-solid-svg-icons";

function AddTest({ open, handleClose, headText, bodyText, btnText }) {
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
      <FlexboxGrid
        justify="space-between"
        className="flex justify-between items-center"
      >
        <FlexboxGrid.Item colspan={9}>
          <Col className="font-semibold text-2xl">{headText}</Col>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={3}>
          <Col className="border-double border-4 text-blue-700	 border-slate-100 bg-slate-200 rounded-full h-12 w-12 items-center flex justify-center">
            <FontAwesomeIcon icon={faVial} />
          </Col>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Row>{bodyText}</Row>
      <Row className="mt-4">
        <FlexboxGrid
          justify="space-between"
          className="flex justify-between items-center"
        >
          <FlexboxGrid.Item colspan={15}>
            <Row>Test Name</Row>
            <Input />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={7}>
            <Row>Code</Row>
            <Input />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid
          justify="space-between"
          className="flex justify-between items-center"
        >
          <FlexboxGrid.Item colspan={15}>
            <Row>Amount</Row>
            <Input />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={7}>
            <Row>Type</Row>
            <Input />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Row>
      <Row className="w-full flex justify-between mt-2">
        <Button
          onClick={handleClose}
          className="w-2/5 bg-blue-700 text-white hover:bg-blue-800"
        >
          {btnText}
        </Button>
        <Button
          onClick={handleClose}
          className="w-2/5 border-solid border border-slate-700"
        >
          Cancel
        </Button>
      </Row>
    </Modal>
  );
}

export default AddTest;
