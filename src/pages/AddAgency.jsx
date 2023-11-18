import React from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FlexboxGrid,
  Divider,
  Row,
  Input,
} from "rsuite";
import { Button } from "react-bootstrap";

function AddAgency() {
  return (
    <Container className="gcc-con">
      <Header>
        <FlexboxGrid justify="start">
          <FlexboxGrid.Item colspan={20} className="main-title">
            Add Agency
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Header>
      <Divider />
      <Content>
        <Row>
          <Row>Agency Name</Row>
          <Input />
        </Row>
        <Row>
          <Row>Address</Row>
          <Input name="address" />
        </Row>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11}>
            <Row>Telephone</Row>
            <Input name="Telephone" />
            <Row>Email</Row>
            <Input placeholder="john@example.com" name="email" />
            <Row>Labour License</Row>
            <Input name="nic" />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={11}>
            <Row>Fax</Row>
            <Input name="phone" />
            <Row>Contact Person</Row>
            <Input name="nic" />
            <Row>Commission</Row>
            <Input name="nic" />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
      <Divider />
      <Footer>
        <FlexboxGrid justify="end">
          <Button type="submit" className="w-40 h-10 bg-blue-600 text-white">
            Continue
          </Button>
        </FlexboxGrid>
      </Footer>
    </Container>
  );
}

export default AddAgency;
