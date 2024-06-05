import React, { useState } from "react";
import "../../src/assets/css/OpdTest.css";
import { Divider, InputGroup } from "rsuite";
import { Button } from "react-bootstrap";
import { Input, DatePicker, SelectPicker } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";
import "rsuite/dist/rsuite-no-reset.min.css";
import { useEffect } from "react";
import {
  useAddCustomerMutation,
  useGetAllCustomersQuery,
} from "../store/api/customerApi";
import { useNavigate } from "react-router-dom";

function OpdTest() {
  const [registerCustomer] = useAddCustomerMutation();
  const { refetch } = useGetAllCustomersQuery();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [inputData, setInputData] = useState({
    fullName: "",
    dateOfBirth: "",
    profilePhoto: "",
    civilStatus: "",
    gender: "",
    address: "",
    mobileNo: "",
    email: "",
    nic: "",
    timeOfLastName: "",
    referredBy: "",
    medicalType: "OPD",
  });

  const resetForm = () => {
    setProfilePic("");
    setInputData({
      fullName: "",
      dateOfBirth: "",
      profilePhoto: "",
      civilStatus: "",
      gender: "",
      address: "",
      mobileNo: "",
      email: "",
      nic: "",
      timeOfLastName: "",
      referredBy: "",
    });
  };

  const formattedDate = formatDate(inputData.dateOfBirth);

  function formatDate(date) {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
    setInputData((prev) => ({
      ...prev,
      profilePhoto: URL.createObjectURL(file),
    }));
  };

  useEffect(() => {
    document.title = "OPD | Medisense";
  }, []);

  const handleSubmit = async () => {
    const updatedInputData = {
      ...inputData,
      dateOfBirth: formattedDate,
    };

    const formData = new FormData();

    formData.append("image", profilePic);
    formData.append("fullName", inputData.fullName);
    formData.append("sex", inputData.gender);
    formData.append("address", inputData.address);
    formData.append("email", inputData.email);
    formData.append("mobileNo", inputData.mobileNo);
    formData.append("civilStatus", inputData.civilStatus);
    formData.append("nic", inputData.nic);
    formData.append("timeOfLastName", inputData.timeOfLastName);
    formData.append("referredBy", inputData.referredBy);
    formData.append("medicalType", updatedInputData.medicalType);

    try {
      const response = await registerCustomer(formData);
      if (!response.error) {
        refetch();
        const customerId = response?.data?.customerId;
        const admissionId = response?.data?.admissionId;
        navigate(`/home/test/${customerId}/${admissionId}`);
      } else {
        console.error("Error registering customer:", response.payload);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }

    e.preventDefault();
    console.log("data", updatedInputData);
  };

  return (
    <div className="gcc-con">
      <div className="opdtest-header">
        <div>Applicant Details</div>
        <div style={{ width: "45%" }}>
          <InputGroup>
            <Input
              placeholder="Search by ID or name..."
              style={{ margin: 0 }}
            />
            <InputGroup.Button>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Button>
          </InputGroup>
        </div>
      </div>
      <Divider className="border-t-2 border-gray-300" />
      <div className="opdtest-container">
        <div className="opdtest-input-con">
          <div className="opdtest-input-single">
            <label>Full Name</label>
            <input
              type="text"
              className="rs-input"
              value={inputData.fullName}
              onChange={(e) => {
                e.preventDefault();
                setInputData((pre) => ({
                  ...pre,
                  fullName: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <div className="opdtest-input-con">
          <div className="opdtest-input-con-left">
            <div className="opdtest-input">
              <label>Profile Photo</label>
              <label className="opdtest-pro-pic">
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
                      width: "200px",
                      height: "200px",
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
          <div className="opdtest-input-con-right">
            <div className="opdtest-input-single">
              <label>Date of Birth</label>
              <DatePicker
                placeholder="YYYY-MM-DD"
                format="yyyy-MM-dd"
                autoComplete="off"
                id="dateOfBirth"
                value={inputData.dateOfBirth || null}
                onChange={(value) => {
                  setInputData((prev) => ({ ...prev, dateOfBirth: value }));
                }}
              />
            </div>
            <div className="opdtest-input-single ">
              <label>Sex</label>
              <SelectPicker
                searchable={false}
                style={{ width: "100%" }}
                data={["Male", "Female"].map((item) => ({
                  label: item,
                  value: item,
                }))}
                value={inputData.gender}
                onChange={(value) => {
                  setInputData((prev) => ({ ...prev, gender: value }));
                }}
              />
            </div>
          </div>
        </div>
        <div className="opdtest-input-con">
          <div className="opdtest-input-single">
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
        <div className="opdtest-input-con-two">
          <div className="opdtest-input">
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
          <div className="opdtest-input">
            <label>Mobile Number</label>
            <input
              type="text"
              className="rs-input"
              value={inputData.mobileNo}
              onChange={(e) => {
                e.preventDefault();
                setInputData((pre) => ({
                  ...pre,
                  mobileNo: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <div className="opdtest-input-con-two">
          <div className="opdtest-input">
            <label>Status</label>
            <SelectPicker
              searchable={false}
              style={{ width: "100%" }}
              data={["Married", "Single", "Divorced", "Widowed"].map(
                (item) => ({
                  label: item,
                  value: item,
                })
              )}
              value={inputData.civilStatus}
              onChange={(value) => {
                setInputData((prev) => ({ ...prev, civilStatus: value }));
              }}
            />
          </div>
          <div className="opdtest-input">
            <label>Nic</label>
            <input
              type="text"
              className="rs-input"
              value={inputData.nic}
              onChange={(e) => {
                e.preventDefault();
                setInputData((pre) => ({
                  ...pre,
                  nic: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        {/* <hr className="opdtest-line" /> */}
        <div className="opdtest-input-con-two">
          <div className="opdtest-input">
            <label>Time Of Last Meal</label>
            <input
              type="text"
              className="rs-input"
              value={inputData.timeOfLastName}
              onChange={(e) => {
                e.preventDefault();
                setInputData((pre) => ({
                  ...pre,
                  timeOfLastName: e.target.value,
                }));
              }}
            />
          </div>
          <div className="opdtest-input">
            <label>Referred By</label>
            <input
              type="text"
              className="rs-input"
              value={inputData.referredBy}
              onChange={(e) => {
                e.preventDefault();
                setInputData((pre) => ({
                  ...pre,
                  referredBy: e.target.value,
                }));
              }}
            />
          </div>
        </div>
      </div>
      <Divider />
      <div className="opdtest-footer">
        <Button
          type="submit"
          className="w-40 h-10 bg-blue-800 text-white mb-10"
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default OpdTest;
