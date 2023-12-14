// ModalComponent.jsx
import React from "react";
import { Modal, Button, Row, Col, FlexboxGrid, Input } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function FailModal({
  open,
  handleClose,
  headtxt,
  bodytxt,
  btntxt,
  id,
  deleteApi,
  refetchTable,
}) {

  const handleDelete = async () => {
    try {
      const responce = await deleteApi(id);
      console.log("Oops...",responce)
      if (responce.error) {
        console.log("error");
        Swal.fire({
          title: "Oops...",
          text: responce?.error?.data?.payload,
          icon: "error",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: responce?.data?.payload,
        });
        await refetchTable();
        handleClose();
      }
    } catch {
      console.log("Error Durring the Delete");
    }
  };

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
      <Row className="border-double border-4 text-red-600 text-xl border-slate-100 bg-slate-200 rounded-full h-12 w-12 items-center flex justify-center">
        <FontAwesomeIcon icon={faExclamation} />
      </Row>
      <Row className="text-black font-bold text-lg mt-3">{headtxt}</Row>
      <Row className="text-gray-500 text-md mt-3">{bodytxt}</Row>
      <Row className="w-full flex justify-between mt-4 space-x-8" >
        <Button
          // onClick={handleClose}
          className="w-3/6 bg-red-600 text-white hover:bg-red-700"
          onClick={handleDelete}
        >
          {btntxt}
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

export default FailModal;
