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
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function TestAndPackages() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Tests & Packages | Medisense";
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Container className="gcc-con">
        <Header>
          <FlexboxGrid justify="start">
            <FlexboxGrid.Item colspan={20} className="main-title">
              Tests And Packages
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
                onClick={() => navigate("packages")}
              >
                Packages
              </Radio>
              <Radio value="availableTests" onClick={() => navigate("tests")}>
                Tests
              </Radio>
            </RadioGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider className="mt-0 mb-7" />
        <Content>
          <Outlet />
        </Content>
      </Container>
    </div>
  );
}

export default TestAndPackages;
