import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  DatePicker,
  Divider,
  Footer,
  Header,
  Modal,
  SelectPicker,
} from "rsuite";
import "../../assets/css/UserRegistration.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import {
  useAddUserMutation,
  useGetAllUsersQuery,
  useGetUserByIDQuery,
  useGetUserRolesQuery,
  useUpdateUserMutation,
} from "../../store/api/userApi";
import Swal from "sweetalert2";

function UserRegistration({ open, handleClose, userTitle, buttonName, id }) {
  const [addUser] = useAddUserMutation();
  const { refetch } = useGetAllUsersQuery();
  const { data: roles } = useGetUserRolesQuery();
  const [updateUser] = useUpdateUserMutation();
  const {
    data: getUserById,
    isLoading,
    isError,
  } = useGetUserByIDQuery(id, { skip: !id });
  const [profilePic, setProfilePic] = useState("");

  console.log("update", getUserById?.payload)

  useEffect(() => {
    if (getUserById) {
      const defaultValues = getUserById.payload || {};
      setInputData({
        firstName: defaultValues.firstName || "",
        lastName: defaultValues.lastName || "",
        address: defaultValues.address || "",
        email: defaultValues.email || "",
        contactNo: defaultValues.contactNo || "",
        username: defaultValues.username || "",
        roleId: defaultValues.roleId || "",
        // dob: defaultValues.dob || "",
      });
    }
  }, [getUserById]);

  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    roleId: "",
    dob: "",
    profilePhoto: "",
    address: "",
    email: "",
    contactNo: "",
    username: "",
    password: "",
  });


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
    setInputData((prev) => ({
      ...prev,
      profilePhoto: URL.createObjectURL(file),
    }));
  };

  const formattedDate = formatDate(inputData.dob);

  const roleData =
    roles?.payload?.map((item) => ({
      label: item.role,
      value: item.id,
    })) || [];

  function formatDate(date) {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function resetForm() {
    setInputData({
      firstName: "",
      lastName: "",
      roleId: "",
      dob: "",
      profilePhoto: "",
      address: "",
      email: "",
      contactNo: "",
      username: "",
      password: "",
    });
    setProfilePic("");
  }

  const updatedInputData = {
    ...inputData,
    dob: formattedDate,
  };

  const isEditing = !!id;
  const isNewUser = !isEditing;

  const handleSubmit = async (e) => {
    if (isNewUser) {
      try {
        e.preventDefault();
        const response = await addUser(updatedInputData);
        if (response.data && !response.data.error) {
          resetForm();
          handleClose();
          refetch();
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
            title: "User Registered successfully",
          });
        } else {
          console.log("User adding failed", response);
          Swal.fire({
            title: "Oops...",
            text: response?.error?.data?.payload || response?.data?.payload,
            icon: "error",
          });
        }
      } catch (error) {
        console.log("User Reg Error", error);
      }
    } else {
      try {
        
        const response = await updateUser({ id, inputData });
        console.log("User update", inputData);

        if (response.error) {
          console.log("User update Error", response);
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
          refetch();
        }
      } catch (error) {
        console.log("Update Error", error);
      }
    }
  };

  return (
    <Modal
      style={{
        width: "60%",
      }}
      open={open}
      onClose={handleClose}
    >
      <div className="userregistration-main-con">
        <Container>
          <Header className="userregistration-title">{userTitle}</Header>
          <Divider />
          <Content>
            <div className="userregistration-container">
              <div className="userregistration-input-con-two">
                <div className="userregistration-input">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="rs-input"
                    value={inputData.firstName}
                    onChange={(e) => {
                      e.preventDefault();
                      setInputData((pre) => ({
                        ...pre,
                        firstName: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="userregistration-input">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="rs-input"
                    value={inputData.lastName}
                    onChange={(e) => {
                      e.preventDefault();
                      setInputData((pre) => ({
                        ...pre,
                        lastName: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="userregistration-input-con">
                <div className="userregistration-input-con-left">
                  <div className="userregistration-input">
                    <label>Profile Photo</label>
                    <label className="userregistration-pro-pic">
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/gif"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                      {profilePic ? (
                        <img
                          src={URL.createObjectURL(profilePic)}
                          alt="Profile"
                          className="profile-image"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCamera}
                          style={{ width: 35, height: 50, color: "white" }}
                        />
                      )}
                    </label>
                  </div>
                </div>
                <div className="userregistration-input-con-right">
                  <div className="userregistration-input-single">
                    <label>Date of Birth</label>
                    <DatePicker
                      placeholder="YYYY-MM-DD"
                      format="yyyy-MM-dd"
                      autoComplete="off"
                      value={inputData.dob || null}
                      onChange={(value) => {
                        setInputData((prev) => ({
                          ...prev,
                          dob: value,
                        }));
                      }}
                    />
                  </div>
                  <div className="userregistration-input-single ">
                    <label>Role</label>
                    <SelectPicker
                      searchable={false}
                      style={{ width: "100%" }}
                      data={roleData}
                      value={inputData.roleId}
                      onChange={(value) => {
                        setInputData((prev) => ({
                          ...prev,
                          roleId: value,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="userregistration-input-con">
                <div className="userregistration-input-single">
                  <label>Address</label>
                  <input
                    type="text"
                    className="rs-input"
                    value={inputData.address}
                    onChange={(e) => {
                      e.preventDefault();
                      setInputData((pre) => ({
                        ...pre,
                        address: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="userregistration-input-con-two">
                <div className="userregistration-input">
                  <label>Email</label>
                  <input
                    type="text"
                    className="rs-input"
                    value={inputData.email}
                    onChange={(e) => {
                      e.preventDefault();
                      setInputData((pre) => ({
                        ...pre,
                        email: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="userregistration-input">
                  <label>Mobile Number</label>
                  <input
                    name="phone"
                    className="rs-input"
                    value={inputData.contactNo}
                    onChange={(e) => {
                      e.preventDefault();
                      setInputData((pre) => ({
                        ...pre,
                        contactNo: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="userregistration-input-con-two">
                <div className="userregistration-input">
                  <label>Username</label>
                  <input
                    type="text"
                    className="rs-input"
                    value={inputData.username}
                    onChange={(e) => {
                      e.preventDefault();
                      setInputData((pre) => ({
                        ...pre,
                        username: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="userregistration-input">
                  <label>Password</label>
                  <input
                    className="rs-input"
                    value={inputData.password}
                    onChange={(e) => {
                      e.preventDefault();
                      setInputData((pre) => ({
                        ...pre,
                        password: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              {/* <hr className="userregistration-line" /> */}
            </div>
          </Content>
          <Footer className="userregistration-footer">
            <Button
              className="w-40 h-10 bg-blue-800 text-white mr-5"
              onClick={handleSubmit}
            >
              {buttonName}
            </Button>
            <Button
              className="w-40 h-10 bg-red-700 text-white border-none hover:bg-red-600"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Footer>
        </Container>
      </div>
    </Modal>
  );
}

export default UserRegistration;
