import React, { useState } from "react";
import {
  Container,
  Header,
  Content,
  FlexboxGrid,
  InputGroup,
  Input,
  Button,
  InputPicker,
  DatePicker,
} from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretRight,
  faCaretDown,
  faArrowDownShortWide,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/Patients.css";
import TablePatients from "../components/tables/TablePatients";
import { mockData } from "../assets/mocks/mockData";

function Patients() {
  const data = mockData(18);
  const [activeButton, setActiveButton] = useState();

  const handleBtnSelect = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <Container className="gcc-con ">
      <Header className="patinet-header">
        <FlexboxGrid justify="space-between " className="mb-4">
          <FlexboxGrid.Item colspan={11} className="main-title">
            Applicant Details
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={10}>
            <InputGroup>
              <InputGroup.Button>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Button>
              <Input
                placeholder="Search by ID or name..."
                style={{ margin: 0 }}
              />
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={2} className="main-title">
            <Button type="submit" className="w-35 h-11 bg-blue-600 text-white">
              Add Employee
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={5}>
            <InputPicker
              style={{ width: 250, height: 40 }}
              placeholder={
                <div className="z-100">
                  <FontAwesomeIcon icon={faArrowDownShortWide} />
                  {" Sort :  Chronological"}
                </div>
              }
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={5}>
            <DatePicker oneTap style={{ width: 250 }} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Header>
      <Content>
        <div className="patient-select-btns">
          <button
            className={`${activeButton === "gcc" ? "active" : ""}`}
            onClick={() => handleBtnSelect("gcc")}
          >
            <div style={{ display: "flex" }}>
              <p>GCC Medicals</p>
              <FontAwesomeIcon
                icon={faCaretRight}
                style={{ marginTop: "7.8px", marginLeft: "3px " }}
              />
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <h4>120</h4>
            <h6>Rs.85,125.00</h6>
          </button>
          <button
            className={`${activeButton === "nongcc" ? "active" : ""}`}
            onClick={() => handleBtnSelect("nongcc")}
          >
            <div style={{ display: "flex" }}>
              <p>Non GCC Medicals</p>
              <FontAwesomeIcon
                icon={faCaretRight}
                style={{ marginTop: "7.8px", marginLeft: "3px " }}
              />
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <h4>110</h4>
            <h6>Rs.185,125.00</h6>
          </button>
          <button
            className={`${activeButton === "opd" ? "active" : ""}`}
            onClick={() => handleBtnSelect("opd")}
          >
            <div style={{ display: "flex" }}>
              <p>OPD Tests</p>
              <FontAwesomeIcon
                icon={faCaretRight}
                style={{ marginTop: "7.8px", marginLeft: "3px " }}
              />
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <h4>170</h4>
            <h6>Rs.385,125.00</h6>
          </button>
          <button
            className={`${activeButton === "total" ? "active" : ""}`}
            onClick={() => handleBtnSelect("total")}
          >
            <div style={{ display: "flex" }}>
              <p>Total</p>
              <FontAwesomeIcon
                icon={faCaretRight}
                style={{ marginTop: "7.8px", marginLeft: "3px " }}
              />
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <h4>300</h4>
            <h6>Rs.485,125.00</h6>
          </button>
        </div>
        <TablePatients data={data} />
      </Content>
      {/* <Footer>Footer</Footer> */}
    </Container>
  );
}

export default Patients;
