import React, { useState } from "react";
import "../../src/assets/css/OpdTest.css";
import { Divider, InputGroup } from "rsuite";
import { Input, DatePicker, SelectPicker , Button, } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";
import "rsuite/dist/rsuite-no-reset.min.css";

function OpdTest() {
  const [profilePic, setProfilePic] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
      setProfilePic(file); 
  };
  return (
    <div className="opdtest-main-con">
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
      <hr className="opdtest-line" />
      <div className="opdtest-container">
        <div className="opdtest-input-con">
          <div className="opdtest-input-single">
            <label>Full Name</label>
            <input type="text" className="rs-input" />
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
                    style={{ width:"200px", height:"200px", borderRadius: "50%" }}
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
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="YYYY-MM-DD"
                format="yyyy-MM-dd"
                // onChange={(value) => {
                //   if (value instanceof Date) {
                //     form.setValue("dateOfBirth", value);
                //   }
                // }}
                // onClick={handleDatePickerClick}
                // value={form.getValues("dateOfBirth")}
                // style={{borderStyle:'none' , border:'1px solid rgba(0, 0, 0, 0.5)' , borderRadius:'5px'  }}
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
              />
            </div>
          </div>
        </div>
        <div className="opdtest-input-con">
          <div className="opdtest-input-single">
            <label>Address</label>
            <input type="text" className="rs-input" />
          </div>
        </div>
        <div className="opdtest-input-con-two">
          <div className="opdtest-input">
            <label>Email</label>
            <input type="text" className="rs-input" />
          </div>
          <div className="opdtest-input">
            <label>Mobile Number</label>
            <input type="text" className="rs-input" />
          </div>
        </div>
        <div className="opdtest-input-con-two">
          <div className="opdtest-input">
            <label>Civil Status</label>
            <SelectPicker
              searchable={false}
              style={{ width: "100%" }}
              data={["Married", "Single", "Divorced", "Widowed "].map(
                (item) => ({
                  label: item,
                  value: item,
                })
              )}
            />
          </div>
          <div className="opdtest-input">
            <label>Nic</label>
            <input type="text" className="rs-input" />
          </div>
        </div>
        {/* <hr className="opdtest-line" /> */}
        <div className="opdtest-input-con-two">
          <div className="opdtest-input">
            <label>Time Of Last Meal</label>
            <input type="text" className="rs-input" />
          </div>
          <div className="opdtest-input">
            <label>Referred By</label>
            <input type="text" className="rs-input" />
          </div>
        </div>
      </div>
      <Divider />
      <div className="opdtest-footer">
         <Button appearance="primary" style={{ height: 40, width: 100 }}>
           Continue
        </Button>
      </div>
    </div>
  );
}

export default OpdTest;
