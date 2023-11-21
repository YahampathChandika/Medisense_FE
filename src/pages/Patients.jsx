import React from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FlexboxGrid,
  InputGroup,
  Input,
} from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Patients() {
  return (
    <Container className="gcc-con">
      <Header>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={8} className="main-title">
            Applicant Details
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={11}>
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
          <FlexboxGrid.Item colspan={5} className="main-title">
            <button>Add Employee</button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Header>
      <Content>
        ifejwf
      </Content>
      <Footer>Footer</Footer>
    </Container>
  );
}

export default Patients;
