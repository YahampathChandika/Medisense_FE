import React from "react";
import "../../src/assets/css/OpdTest.css";
import { InputGroup } from "rsuite";
import { Uploader, Message, Loader, useToaster } from "rsuite";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import "rsuite/dist/rsuite-no-reset.min.css";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

function OpdTest() {
  const toaster = useToaster();
  const [uploading, setUploading] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState(null);
  return (
    <div className="opdtest-main-con">
      <div className="opdtest-header">Applicant Details</div>
      <hr className="opdtest-line" />
      <div className="opdtest-container">
        <div className="opdtest-input-con">
          <div className="opdtest-input">
            <InputGroup>
              <input
                type="text"
                className="rs-input"
                placeholder="Search by ID or Name"
              />
              <button className="rs-btn rs-btn-primary rs-btn-blue">
                Search
              </button>
            </InputGroup>
          </div>
        </div>
        <div className="opdtest-input-con">
          <div className="opdtest-input">
            <label>Full Name</label>
            <input type="text" />
          </div>
        </div>
        <div className="opdtest-input-con">
          <div className="opdtest-input">
            <label>Profile Photo</label>

            <label
              className="btn btn-secondary"
              style={{ width: 150, height: 150 , display:"flex" , justifyContent:"center" , alignItems:"center" , backgroundColor:"#bbbbbb" , borderRadius:"50%" }}
            >
              <CameraRetroIcon style={{ width: 25, height: 50 }} />
              <input
                type="file"
                accept="image/jpeg, image/png, image/gif"
                multiple
                // onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>
        <div className="opdtest-input-con-two">
          <div className="opdtest-input">
            <label>Date of Birth</label>
            <input type="text" />
          </div>
          <div className="opdtest-input">
            <label>Sex</label>
            <input type="text" />
          </div>
        </div>
        <div className="opdtest-input-con">
          <div className="opdtest-input">
            <label>Address</label>
            <input type="text" />
          </div>
        </div>
        <div className="opdtest-input-con-two">
          <div className="opdtest-input">
            <label>Email</label>
            <input type="text" />
          </div>
          <div className="opdtest-input">
            <label>Mobile Number</label>
            <input type="text" />
          </div>
        </div>
        <div className="opdtest-input-con-two">
          <div className="opdtest-input">
            <label>Civil Status</label>
            <input type="text" />
          </div>
          <div className="opdtest-input">
            <label>Nic</label>
            <input type="text" />
          </div>
        </div>
        {/* <hr className="opdtest-line" /> */}
        <div className="opdtest-input-con-two">
          <div className="opdtest-input">
            <label>Time Of Last Meal</label>
            <input type="text" />
          </div>
          <div className="opdtest-input">
            <label>Referred By</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <div className="opdtest-footer"></div>
    </div>
  );
}

export default OpdTest;
