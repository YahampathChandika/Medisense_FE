import React from "react";
import {
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Footer,
  Header,
} from "rsuite";
import SelectedPackages from "../components/tables/tests/SelectedPackages";

function Test() {
  return (
    <Container className="gcc-con">
      <Header>
        <FlexboxGrid justify="start">
          <FlexboxGrid.Item colspan={20} className="main-title">
            Test
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Header>
      <Divider className="border-t-2 border-gray-300" />
      <Content>
        <Divider className="border-t-2 border-gray-200" />
        <SelectedPackages/>
      </Content>
      <Footer>Footer</Footer>
    </Container>
  );
}

export default Test;
