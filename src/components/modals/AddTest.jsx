// ModalComponent.jsx
import React, { useEffect } from "react";
import { Modal, Button, Row, Col, FlexboxGrid, Input } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVial } from "@fortawesome/free-solid-svg-icons";
import {
  useAddTestMutation,
  useGetAllTestsQuery,
  useGetTestByIdQuery,
  useUpdateTestMutation,
} from "../../store/api/testApi";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function AddTest({ open, handleClose, headText, bodyText, btnText, id }) {
  const { refetch: refetcdata } = useGetAllTestsQuery();
  const [addTest] = useAddTestMutation();

  const [updateTest] = useUpdateTestMutation(id);
  const {
    data: testById,
    isLoading,
    isError,
    refetch: refetchUse,
  } = useGetTestByIdQuery(id, { skip: !id });
  const form = useForm({
    mode: "onTouched",
    defaultValues: {
      description: testById?.payload?.description || "",
      testCode: testById?.payload?.testCode || "",
      price: testById?.payload?.price || "",
      type: testById?.payload?.type || "",
      unit: testById?.payload?.unit || "",
    },
  });

  const { register, handleSubmit, reset, setValue } = form;
  useEffect(() => {
    const setDefaultValues = async () => {
      if (id && testById) {
        const { description, testCode, price, type, unit } = testById.payload;
        setValue("description", description);
        setValue("testCode", testCode);
        setValue("price", price);
        setValue("type", type);
        setValue("unit", unit);
      }
    };
    setDefaultValues();
  }, [id, testById, reset, setValue, open]);

  const isEditing = !!id;
  const isNewPatient = !isEditing;

  const onSubmit = async (data, e) => {
    if (isNewPatient) {
      try {
        e.preventDefault();
        console.log("data", data);
        console.log("register", register);

        const response = await addTest(data);
        console.log("Response:", response);

        if (response.error) {
          console.log("Login Error", response);
          Swal.fire({
            title: "Oops...",
            text: response?.error?.data?.payload,
            icon: "error",
          });
        } else {
          console.log("Success");
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
            title: "Test Added",
          });
          reset();
          await refetcdata();
          handleClose();
        }
      } catch (error) {
        console.log("Login Error", error);
      }
    } else {
      const updatedData = {
        id,
        ...data,
      };

      try {
        console.log("data", updatedData);
        console.log("Update", updatedData);

        const response = await updateTest({ id, updatedData });
        console.log("Response update", response);

        if (response.error) {
          console.log("Login Error", response);
          Swal.fire({
            title: "Oops...",
            text: response?.error?.data?.payload,
            icon: "error",
          });
        } else {
          console.log("Success");
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
            title: "Test Updated",
          });
          await handleClose();
          await refetchUse();
          await refetcdata();
        }
      } catch (error) {
        console.log("Login Error", error);
      }
      console.log(updatedData);
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
      {isLoading ? (
        <div>is Loding...</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Input
                  name="description"
                  defaultValue="description"
                  {...register("description")}
                />
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={7}>
                <Row>Code</Row>
                <Input
                  name="testCode"
                  defaultValue="testCode"
                  {...register("testCode")}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
            <FlexboxGrid
              justify="space-between"
              className="flex justify-between items-center"
            >
              <FlexboxGrid.Item colspan={7}>
                <Row>Unit</Row>
                <Input name="unit" defaultValue="unit" {...register("unit")} />
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={7}>
                <Row>Type</Row>
                <Input name="type" defaultValue="type" {...register("type")} />
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={7}>
                <Row>Amount</Row>
                <Input
                  name="price"
                  defaultValue="price"
                  {...register("price")}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Row>
          <Row className="w-full flex justify-between mt-2 space-x-8">
            <Button
              type="submit"
              className="w-3/6 bg-blue-700 text-white hover:bg-blue-800"
            >
              {btnText}
            </Button>
            <Button
              onClick={handleClose}
              className="w-3/6 border-solid border border-slate-700"
            >
              Cancel
            </Button>
          </Row>
        </form>
      )}
    </Modal>
  );
}

export default AddTest;
