import React, { useState } from "react";
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

function UserRegistration({ open, handleClose }) {
  const [profilePic, setProfilePic] = useState("");
  const [inputData, setInputData] = useState({
    fullName: "",
    role:"",
    dateOfBirth: "",
    profilePhoto:"",

  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
       setInputData((prev) => ({
      ...prev,
      profilePhoto: URL.createObjectURL(file),
    }));
  };

  const formattedDate = formatDate(inputData.dateOfBirth);

  function formatDate(date) {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = () => {
    const updatedInputData = {
      ...inputData,
      dateOfBirth:formattedDate,
    }
    console.log("input data" , updatedInputData)
  }

  return (
    <Modal
      style={{
        width: "60%",
        top: "1%",
      }}
      open={open}
      onClose={handleClose}
    >
      <div className="userregistration-main-con">
        <Container>
          <Header className="userregistration-title">User Registration</Header>
          <Divider />
          <Content>
            <div className="userregistration-container">
              <div className="userregistration-input-con">
                <div className="userregistration-input-single">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="rs-input"
                    value={inputData.fullName}
                    onChange={(e)=> {
                      e.preventDefault();
                      setInputData((pre) => ({
                        ...pre,
                        fullName:e.target.value
                      }))
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
                      value={inputData.dateOfBirth || null}
                      onChange={(value) => {
                        setInputData((prev) => ({ ...prev, dateOfBirth: value }));
                      }}
                    />
                  </div>
                  <div className="userregistration-input-single ">
                    <label>Role</label>
                    <SelectPicker
                      searchable={false}
                      style={{ width: "100%" }}
                      data={["Admin", "Doctor"].map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      value={inputData.role}
                      onChange={(value) => {
                        setInputData((prev) => ({ ...prev, role: value }));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="userregistration-input-con">
                <div className="userregistration-input-single">
                  <label>Address</label>
                  <input type="text" className="rs-input" />
                </div>
              </div>
              <div className="userregistration-input-con-two">
                <div className="userregistration-input">
                  <label>Email</label>
                  <input type="text" className="rs-input" />
                </div>
                <div className="userregistration-input">
                  <label>Mobile Number</label>
                  <input type="text" className="rs-input" />
                </div>
              </div>
              {/* <hr className="userregistration-line" /> */}
            </div>
          </Content>
          <Footer className="userregistration-footer">
            <Button className="w-40 h-10 bg-blue-800 text-white" onClick={handleSubmit}>
              Register
            </Button>
          </Footer>
        </Container>
      </div>
    </Modal>
  );
}

export default UserRegistration;
