import React from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  FlexboxGrid,
  Input,
  SelectPicker,
} from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  useAddCountryMutation,
  useGetAllCountriesQuery,
  useGetGccCountriesQuery,
  useGetNonGccCountriesQuery,
} from "../../store/api/countryApi";
import Swal from "sweetalert2";

function AddCountryModal({ open, handleClose }) {
  const form = useForm({
    mode: "onTouched",
  });

  const [addCountry] = useAddCountryMutation();
  const { refetch: allRefetch } = useGetAllCountriesQuery();
  const { refetch: gccRefetch } = useGetGccCountriesQuery();
  const { refetch: nonGccRefetch } = useGetNonGccCountriesQuery();

  const { register, handleSubmit, reset, setValue, watch } = form;

  const gccValue = watch("gcc");
  useEffect(() => {
    setValue("gcc", gccValue);
  }, [gccValue, setValue]);

  const onSubmit = async (data, e) => {
    try {
      e.preventDefault();

      const response = await addCountry(data);
      if (response.error) {
        console.log("Error add country", response);
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
          title: response?.data?.payload || "Country Added",
        });
        reset();
        allRefetch();
        gccRefetch();
        nonGccRefetch();
        handleClose();
      }
    } catch (error) {
      console.log("Country Error", error);
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
          <FlexboxGrid.Item colspan={9}>
            <Col className="font-semibold text-2xl">Add Country</Col>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={3}>
            <Col className="border-double border-4 text-blue-700	 border-slate-100 bg-slate-200 rounded-full h-12 w-12 items-center flex justify-center">
              <FontAwesomeIcon icon={faEarthAmericas} />
            </Col>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Row>Register a new Country.</Row>
        <Row className="mt-4">
          <Row>Name of Country</Row>
          <Input className="mb-2" {...register("name")} />
          <FlexboxGrid
            justify="space-between"
            className="flex justify-between items-center"
          >
            <FlexboxGrid.Item colspan={15}>
              <Row>Country Code</Row>
              <Input {...register("code")} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={7}>
              <Row>Type</Row>
              <SelectPicker
                searchable={false}
                style={{ width: "100%" }}
                data={[
                  { label: "GCC", value: 1 },
                  { label: "Non GCC", value: 0 },
                ]}
                onChange={(value) => setValue("gcc", value)}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
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

export default AddCountryModal;
