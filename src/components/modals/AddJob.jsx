import React from "react";
import { Modal, Button, Row, Col, FlexboxGrid, Input } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { useAddJobMutation, useGetAllJobsQuery } from "../../store/api/jobApi";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

function AddJobModal({ open, handleClose }) {
  const form = useForm({
    mode: "onTouched",
  });

  const [addJob] = useAddJobMutation();
  const { refetch: refetch } = useGetAllJobsQuery();
  const { register, handleSubmit, reset, setValue, watch } = form;

  const onSubmit = async (data, e) => {
    try {
      e.preventDefault();

      const response = await addJob(data);
      if (response.error) {
        console.log("Error add job", response);
        Swal.fire({
          title: "Oops...",
          text: response?.error?.data?.payload,
          icon: "error",
        });
      } else {
        console.log("Success", response);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: response?.data?.payload || "Job Added",
        });
        reset();
        refetch();
        handleClose();
      }
    } catch (error) {
      console.log("Job Error", error);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexboxGrid
          justify="space-between"
          className="flex justify-between items-center"
        >
          <FlexboxGrid.Item colspan={7}>
            <Col className="font-semibold text-2xl">Create Job</Col>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={3}>
            <Col className="border-double border-4 text-blue-700	 border-slate-100 bg-slate-200 rounded-full h-12 w-12 items-center flex justify-center">
              <FontAwesomeIcon icon={faBriefcase} />
            </Col>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Row>Create a new job.</Row>
        <Row className="mt-4">
          <Row>Name of Job</Row>
          <Input className="mb-2" {...register("job")}/>
          <Row>Description</Row>
          <Input {...register("description")}/>
        </Row>
        <Row className="w-full flex justify-between mt-2 space-x-8">
          <Button
            type="submit"
            className="w-1/2 bg-blue-700 text-white hover:bg-blue-800"
          >
            Create
          </Button>
          <Button
            onClick={handleClose}
            className="w-1/2 border-solid border border-slate-700"
          >
            Cancel
          </Button>
        </Row>
      </form>
    </Modal>
  );
}

export default AddJobModal;
