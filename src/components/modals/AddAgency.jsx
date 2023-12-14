import React, { useEffect, useState } from "react";
import { Container, Content, Divider, Footer, Header, Modal } from "rsuite";
import "../../assets/css/AddAgency.css";
import { Button } from "react-bootstrap";
import {
  useAddAgencyMutation,
  useGetAgencyByIDQuery,
  useGetAllAgencyQuery,
  useUpdateAgencyMutation,
} from "../../store/api/agencyApi";
import Swal from "sweetalert2";

function AddAgency({ open, handleClose, agencyhead, buttonName, id }) {
  const [addAgency] = useAddAgencyMutation();
  const [loadingDefaults, setLoadingDefaults] = useState(true);
  const { refetch } = useGetAllAgencyQuery();
  const [updatteAgency] = useUpdateAgencyMutation();

  const {
    data: getAGencybyId,
    isLoading,
    isError,
  } = useGetAgencyByIDQuery(id, { skip: !id });

  useEffect(() => {
    if (getAGencybyId) {
      const defaultValues = getAGencybyId.payload || {};
      setInputData({
        name: defaultValues.name || "",
        address: defaultValues.address || "",
        email: defaultValues.email || "",
        telephone: defaultValues.telephone || "",
        fax: defaultValues.fax || "",
        contactPerson: defaultValues.contactPerson || "",
        labourLicence: defaultValues.labourLicence || "",
        commision: defaultValues.commision || "",
      });

      setLoadingDefaults(false);
    }
  }, [getAGencybyId]);

  const [inputData, setInputData] = useState({
    name: "",
    address: "",
    email: "",
    telephone: "",
    fax: "",
    contactPerson: "",
    labourLicence: "",
    commision: "",
  });

  const resetForm = () => {
    setInputData({
      fullName: "",
      dateOfBirth: "",
      profilePhoto: "",
      sevileStatus: "",
      gender: "",
      address: "",
      mobileNo: "",
      email: "",
      nic: "",
      timeOfLastName: "",
      referred: "",
    });
  };

  const isEditing = !!id;
  const isNewPatient = !isEditing;
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (field, value) => {
    setInputData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when the user types
    setValidationErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSubmit = async (e) => {
    const errors = {};
    if (!inputData.name) {
      errors.name = "Name is required*";
    }
    if (!inputData.address) {
      errors.address = "Address is required*";
    }
    if (!inputData.email) {
      errors.email = "Email is required*";
    } else if (!/\S+@\S+\.\S+/.test(inputData.email)) {
      errors.email = "Invalid email address*";
    }
    if (!inputData.telephone) {
      errors.telephone = "Telephone is required*";
    }
    if (!inputData.contactPerson) {
      errors.contactPerson = "Contact Person is required*";
    }
    if (!inputData.labourLicence) {
      errors.labourLicence = "Labour Liecence is required*";
    }
    if (!inputData.commision) {
      errors.commision = "Commision is required**";
    }

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    if (isNewPatient) {
      try {
        e.preventDefault();
        const response = await addAgency(inputData);
        if (response.error) {
          console.log("Add Agency Error", response);
          Swal.fire({
            title: "Oops...",
            text: response?.error?.data?.payload,
            icon: "error",
          });
        } else {
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
            title: response?.data?.payload,
          });
          resetForm();
          await refetch();
          handleClose();
        }
      } catch (error) {
        console.log("Add agency Error", error);
      }
    } else {
      try {
        const response = await updatteAgency({ id, inputData });
        console.log("response", response);
        if (response.error) {
          console.log("Update egency Error", response);
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
            title: response?.data?.payload,
          });
          await handleClose();
          refetch();
        }
      } catch (error) {
        console.log("Update Error", error);
      }
    }
  };

  const handleNewClose = () => {
    handleClose();
    setValidationErrors({});
    resetForm();
  };

  return (
    <Modal
      style={{
        width: "60%",
        top: "2%",
      }}
      open={open}
      onClose={handleNewClose}
    >
      <div className="addAgency-main-con">
        <Container>
          <Header className="addAgency-title">{agencyhead}</Header>
          <Divider />
          <Content>
            {isLoading ? (
              <div>is Loding...</div>
            ) : isError ? (
              <div>is Error...</div>
            ) : (
              <div className="addAgency-container">
                <div className="addAgency-input-con">
                  <div className="addAgency-input-single">
                    <label>Agency Name</label>
                    <input
                      type="text"
                      className="rs-input"
                      value={inputData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                    {validationErrors.name && (
                      <div className="validation-message">
                        {validationErrors.name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="addAgency-input-con">
                  <div className="addAgency-input-single">
                    <label>Address</label>
                    <input
                      type="text"
                      className="rs-input"
                      value={inputData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                    {validationErrors.address && (
                      <div className="validation-message">
                        {validationErrors.address}
                      </div>
                    )}
                  </div>
                </div>
                <div className="addAgency-input-con">
                  <div className="addAgency-input-con-left">
                    <label>Telephone</label>
                    <input
                      type="text"
                      className="rs-input"
                      value={inputData.telephone}
                      onChange={(e) =>
                        handleInputChange("telephone", e.target.value)
                      }
                    />
                    {validationErrors.telephone && (
                      <div className="validation-message">
                        {validationErrors.telephone}
                      </div>
                    )}
                  </div>
                  <div className="addAgency-input-con-right">
                    <label>Fax</label>
                    <input
                      type="text"
                      className="rs-input"
                      value={inputData.fax}
                      onChange={(e) => {
                        e.preventDefault();
                        setInputData((pre) => ({
                          ...pre,
                          fax: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="addAgency-input-con"></div>
                <div className="addAgency-input-con-two">
                  <div className="addAgency-input">
                    <label>Email</label>
                    <input
                      type="text"
                      className="rs-input"
                      value={inputData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                    {validationErrors.email && (
                      <div className="validation-message">
                        {validationErrors.email}
                      </div>
                    )}
                  </div>
                  <div className="addAgency-input">
                    <label>Contact Person</label>
                    <input
                      type="text"
                      className="rs-input"
                      value={inputData.contactPerson}
                      onChange={(e) =>
                        handleInputChange("contactPerson", e.target.value)
                      }
                    />
                    {validationErrors.contactPerson && (
                      <div className="validation-message">
                        {validationErrors.contactPerson}
                      </div>
                    )}
                  </div>
                </div>
                <div className="addAgency-input-con-two">
                  <div className="addAgency-input">
                    <label>Labour Licence</label>
                    <input
                      type="text"
                      className="rs-input"
                      value={inputData.labourLicence}
                      onChange={(e) =>
                        handleInputChange("labourLicence", e.target.value)
                      }
                    />
                    {validationErrors.labourLicence && (
                      <div className="validation-message">
                        {validationErrors.labourLicence}
                      </div>
                    )}
                  </div>
                  <div className="addAgency-input">
                    <label>Commision</label>
                    <input
                      type="text"
                      className="rs-input"
                      value={inputData.commision}
                      onChange={(e) =>
                        handleInputChange("commision", e.target.value)
                      }
                    />
                    {validationErrors.commision && (
                      <div className="validation-message">
                        {validationErrors.commision}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Content>
          <Footer className="addAgency-footer">
            <Button
              className="w-40 h-10 bg-blue-800 text-white mr-5"
              onClick={handleSubmit}
            >
              {buttonName}
            </Button>
            <Button
              className="w-40 h-10 bg-red-700 text-white border-none hover:bg-red-600"
              onClick={handleNewClose}
            >
              Cancel
            </Button>
          </Footer>
        </Container>
      </div>
    </Modal>
  );
}

export default AddAgency;
