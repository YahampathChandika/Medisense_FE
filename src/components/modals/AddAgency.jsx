import React, { useState } from "react";
import {
  Container,
  Content,
  Divider,
  Footer,
  Header,
  Modal,
} from "rsuite";
import "../../assets/css/AddAgency.css";
import { Button } from "react-bootstrap";
import { useAddUserMutation } from "../../store/api/userApi";

function AddAgency({ open, handleClose }) {
  const [addUser] = useAddUserMutation();
  const [inputData, setInputData] = useState({
    name: "",
    regNo: "",
    regDate: "",
    address: "",
    email: "",
    mobileNo: "",
  });

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
      dateOfBirth: formattedDate,
    };

    console.log("input data", updatedInputData);
    addUser(updatedInputData);
  };

  return (
    <Modal
      style={{
        width: "60%",
        top: "2%",
      }}
      open={open}
      onClose={handleClose}
    >
      <div className="addAgency-main-con">
        <Container>
          <Header className="addAgency-title">Add Agency</Header>
          <Divider />
          <Content>
            <div className="addAgency-container">
              <div className="addAgency-input-con">
                <div className="addAgency-input-single">
                  <label>Agency Name</label>
                  <input
                    type="text"
                    className="rs-input"
                    value={inputData.name}
                    onChange={(e) => {
                      e.preventDefault();
                      setInputData((pre) => ({
                        ...pre,
                        name: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="addAgency-input-con">
                <div className="addAgency-input-con-left">
                  <label>Reg No</label>
                  <input
                    type="text"
                    className="rs-input"
                    value={inputData.regNo}
                    onChange={(e) => {
                      e.preventDefault();
                      setInputData((pre) => ({
                        ...pre,
                        regNo: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="addAgency-input-con-right">
                  <label>Reg Date</label>
                  <input
                    type="text"
                    className="rs-input"
                    value={inputData.regDate}
                    onChange={(e) => {
                      e.preventDefault();
                      setInputData((pre) => ({
                        ...pre,
                        regDate: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="addAgency-input-con">
                <div className="addAgency-input-single">
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
              <div className="addAgency-input-con-two">
                <div className="addAgency-input">
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
                <div className="addAgency-input">
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
            </div>
          </Content>
          <Footer className="addAgency-footer">
            <Button
              className="w-40 h-10 bg-blue-800 text-white mr-5"
              onClick={handleSubmit}
            >
              Register
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

export default AddAgency;
