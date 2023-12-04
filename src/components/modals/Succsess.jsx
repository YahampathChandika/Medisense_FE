// ModalComponent.jsx
import React from "react";
import { Modal, Button, Row, Col, FlexboxGrid, Input } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

function SuccsessModal({ open, handleClose, headtxt, bodytxt, btntxt }) {
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
      <Row className="border-double border-4 text-green-600	text-xl border-slate-100 bg-slate-200 rounded-full h-12 w-12 items-center flex justify-center">
        <FontAwesomeIcon icon={faCircleCheck} />
      </Row>
      <Row className="text-black font-bold text-lg mt-3">{headtxt}</Row>
      <Row className="text-gray-500 text-md mt-3">{bodytxt}</Row>
      <Row className="w-full flex justify-between mt-4">
        <Button
          onClick={handleClose}
          className="w-2/5 bg-blue-700 text-white hover:bg-blue-800"
        >
          {btntxt}
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

export default SuccsessModal;
