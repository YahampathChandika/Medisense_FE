import React, { useState } from "react";
import { Container, Content, Divider, Footer, Header, Modal } from "rsuite";
import "../../assets/css/AddAgency.css";
import { Button } from "react-bootstrap";
import {
  useAddAgencyMutation,
  useGetAgencyByIDQuery,
} from "../../store/api/agencyApi";

function AddAgency({ open, handleClose, agencyhead, buttonName, id }) {
  const [addAgency] = useAddAgencyMutation();
  console.log("id", id);
  const {
    data: getAGencybyId,
    isLoading,
    isError,
  } = useGetAgencyByIDQuery(id, { skip: !id });
  console.log("id", getAGencybyId?.payload?.name);

  const [inputData, setInputData] = useState({
    name: getAGencybyId?.payload?.name , 
    address: "",
    email: "",
    telephone: "",
    fax: "",
    contactPerson: "",
    labourLicence: "",
    commision: "",
  });

  const handleSubmit = () => {
    addAgency(inputData);
    console.log("input data", inputData);
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
                      defaultValue={getAGencybyId?.payload?.name}
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
                <div className="addAgency-input-con">
                  <div className="addAgency-input-con-left">
                    <label>Telephone</label>
                    <input
                      type="text"
                      className="rs-input"
                      value={inputData.telephone}
                      onChange={(e) => {
                        e.preventDefault();
                        setInputData((pre) => ({
                          ...pre,
                          telephone: e.target.value,
                        }));
                      }}
                    />
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
                    <label>Contact Person</label>
                    <input
                      type="text"
                      className="rs-input"
                      value={inputData.contactPerson}
                      onChange={(e) => {
                        e.preventDefault();
                        setInputData((pre) => ({
                          ...pre,
                          contactPerson: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="addAgency-input-con-two">
                  <div className="addAgency-input">
                    <label>Labour Licence</label>
                    <input
                      type="text"
                      className="rs-input"
                      value={inputData.labourLicence}
                      onChange={(e) => {
                        e.preventDefault();
                        setInputData((pre) => ({
                          ...pre,
                          labourLicence: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className="addAgency-input">
                    <label>Commision</label>
                    <input
                      type="text"
                      className="rs-input"
                      value={inputData.commision}
                      onChange={(e) => {
                        e.preventDefault();
                        setInputData((pre) => ({
                          ...pre,
                          commision: e.target.value,
                        }));
                      }}
                    />
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
