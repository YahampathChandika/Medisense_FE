import React from "react";
import { Modal, Button, Row, Col, FlexboxGrid, Input } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function LogoutModal({ open, handleClose, headtxt, bodytxt, btntxt }) {
  const navigate = useNavigate();

  const handlerLogout = async () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <Modal
      style={{
        top: "10%",
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={open}
      onClose={handleClose}
    >
      <Row className="border-double border-4 text-red-600 text-xl border-slate-100 bg-slate-200 rounded-full h-12 w-12 items-center flex justify-center">
        <FontAwesomeIcon icon={faExclamation} />
      </Row>
      <Row className="text-black font-bold text-lg mt-3">Are you want logout?</Row>
      <Row className="text-gray-500 text-md mt-3">{bodytxt}</Row>
      <Row className="w-full flex justify-between mt-4 space-x-8">
        <Button
          // onClick={handleClose}
          className="w-3/6 bg-red-600 text-white hover:bg-red-700"
          onClick={handlerLogout}
        >
          Logout
        </Button>
        <Button
          onClick={handleClose}
          className="w-3/6 border-solid border border-slate-700"
        >
          Cancel
        </Button>
      </Row>
    </Modal>
  );
}

export default LogoutModal;
