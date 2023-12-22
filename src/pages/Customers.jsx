import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import {
  Container,
  Header,
  Content,
  FlexboxGrid,
  InputGroup,
  Input,
  InputPicker,
  DateRangePicker,
} from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretRight,
  faCaretDown,
  faArrowDownShortWide,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/Patients.css";
import TablePatients from "../components/tables/customers/TablePatients";
import { useNavigate } from "react-router";
import { useGetAllCustomersQuery } from "../store/api/customer";

function Customers() {
  const { data: customerData, isLoading, isError } = useGetAllCustomersQuery();
  const [activeButton, setActiveButton] = useState("total");
  const navigate = useNavigate();
  const handleBtnSelect = (buttonId) => {
    setActiveButton(buttonId);
  };

  useEffect(() => {
    document.title = "Customers | Medisense";
  }, []);

  const handleDateRangeSelect = (selectedDates) => {
    console.log("Start Date:", selectedDates[0], "End Date", selectedDates[1]);
  };

  return (
    <div style={{ width: "100%" }}>
      <Container className="gcc-con ">
        <Header className="patinet-header">
          <FlexboxGrid justify="space-between " className="mb-4">
            <FlexboxGrid.Item colspan={5} className="main-title">
              Customers
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={9}>
              <InputGroup style={{ marginLeft: "30%", marginRight: "10px" }}>
                <InputGroup.Button>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Button>
                <Input
                  placeholder="Search by ID or name..."
                  style={{ margin: 0, widows: "100%" }}
                />
              </InputGroup>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={2.5} className="main-title">
              <Button
                onClick={() => navigate("/home/dashboard")}
                style={{ width: "150px", height: "42px" }}
                className=" bg-blue-600 text-white"
              >
                Add Customer
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid>
            <FlexboxGrid.Item>
              <InputPicker
                style={{ width: 250, height: 40, marginRight: "40px" }}
                placeholder={
                  <div className="z-100">
                    <FontAwesomeIcon icon={faArrowDownShortWide} />
                    {" Sort :  Chronological"}
                  </div>
                }
              />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <DateRangePicker
                showOneCalendar
                placeholder="Select Date Range"
                style={{ width: 250 }}
                autoComplete="off"
                onOk={handleDateRangeSelect}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>
        <Content>
          <div className="patient-select-btns">
            <button
              className={`${activeButton === "total" ? "active" : ""}`}
              onClick={() => handleBtnSelect("total")}
            >
              <div style={{ display: "flex" }}>
                <p className="text-sm">Total</p>
                <FontAwesomeIcon
                  icon={faCaretRight}
                  style={{ marginTop: "7.8px", marginLeft: "3px " }}
                />
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
              <h4 className="md:text-lg lg:text-xl xl:text-2xl">300</h4>
              <h6 className="md:text-lg lg:text-xl xl:text-2xl">
                Rs.485,125.00
              </h6>
            </button>
            <button
              className={`${activeButton === "GCC" ? "active" : ""}`}
              onClick={() => handleBtnSelect("GCC")}
            >
              <div style={{ display: "flex" }}>
                <p className="text-sm">GCC Medicals</p>
                <FontAwesomeIcon
                  icon={faCaretRight}
                  style={{ marginTop: "7.8px", marginLeft: "3px " }}
                />
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
              <h4 className="md:text-lg lg:text-xl xl:text-2xl">120</h4>
              <h6 className="md:text-lg lg:text-xl xl:text-2xl">
                Rs.85,125.00
              </h6>
            </button>
            <button
              className={`${activeButton === "Non GCC" ? "active" : ""}`}
              onClick={() => handleBtnSelect("Non GCC")}
            >
              <div style={{ display: "flex" }}>
                <p className="text-sm">Non GCC Medicals</p>
                <FontAwesomeIcon
                  icon={faCaretRight}
                  style={{ marginTop: "7.8px", marginLeft: "3px " }}
                />
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
              <h4 className="md:text-lg lg:text-xl xl:text-2xl">110</h4>
              <h6 className="md:text-lg lg:text-xl xl:text-2xl">
                Rs.185,125.00
              </h6>
            </button>
            <button
              className={`${activeButton === "OPD" ? "active" : ""}`}
              onClick={() => handleBtnSelect("OPD")}
            >
              <div style={{ display: "flex" }}>
                <p className="text-sm">OPD Tests</p>
                <FontAwesomeIcon
                  icon={faCaretRight}
                  style={{ marginTop: "7.8px", marginLeft: "3px " }}
                />
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
              <h4 className="md:text-lg lg:text-xl xl:text-2xl">170</h4>
              <h6 className="md:text-lg lg:text-xl xl:text-2xl">
                Rs.385,125.00
              </h6>
            </button>
          </div>
        </Content>
      </Container>
      {!isLoading && !isError && (
        <TablePatients
          data={customerData?.payload}
          activeButton={activeButton}
        />
      )}
    </div>
  );
}

export default Customers;
