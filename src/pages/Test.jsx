import React from "react";
import {
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Footer,
  Header,
  Radio,
  RadioGroup,
} from "rsuite";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";


function Test() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("id" ,id)

  return (
    <div style={{ width: "100%" }}>
      <Container className="gcc-con">
        <Header>
          <FlexboxGrid justify="start">
            <FlexboxGrid.Item colspan={20} className="main-title">
              Tests
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>
        <Divider className="border-t-2 border-gray-300 mb-1 mt-2" />
        <FlexboxGrid justify="space-between" style={{ marginTop: "15px" }}>
          <FlexboxGrid.Item colspan={7}>
            <RadioGroup
              name="radioList"
              inline
              appearance="picker"
              defaultValue="selectedPackages"
              className="border-none"
            >
              <Radio
                value="selectedPackages"
                onClick={() => navigate("selectedPackages")}
              >
                Select Packages
              </Radio>
              <Radio
                value="availableTests"
                onClick={() => navigate("selectedPackages")}
              >
                Package Contents
              </Radio>
            </RadioGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider className="mt-0 mb-7" />
        <Content>
          <Outlet />
        </Content>
      </Container>
      <Divider className="border-t-2 border-gray-200  mt-1" />
      <Footer>
          <FlexboxGrid justify="end" style={{paddingRight:"5%"}}>
            <Button type="submit" className="w-40 h-10 bg-blue-800 text-white">
              Save
            </Button>
          </FlexboxGrid>
        </Footer>
    </div>
  );
}

export default Test;
