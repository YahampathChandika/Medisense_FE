import React from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FlexboxGrid,
  Divider,
  Row,
  Table,
} from "rsuite";
import { mockTests } from "../../src/assets/mocks/mockTests";

function SelectTests() {
  const { Column, HeaderCell, Cell } = Table;
  const data = mockTests(5);

  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);


  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];

        if (typeof x === "string") {
          x = x.toLowerCase();
        }
        if (typeof y === "string") {
          y = y.toLowerCase();
        }

        if (x < y) {
          return sortType === "asc" ? -1 : 1;
        }
        if (x > y) {
          return sortType === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  };

 
  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  return (
    <div className="gcc-con">
      <Container>
        <Header>
          <FlexboxGrid.Item colspan={6}>
            <Row className="main-title">Tests</Row>
          </FlexboxGrid.Item>
          <Divider />
        </Header>
        <Content>
          <Divider />
          <Table
            autoHeight
            minHeight={200}
            bordered
            data={getData()}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            loading={loading}
            style={{ margin: "25px 0 40px" }}
          >
            <Column align="center" flexGrow sortable>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="code" />
            </Column>

            <Column align="center" flexGrow sortable>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="code" />
            </Column>

            <Column align="center" flexGrow sortable>
              <HeaderCell>Gender</HeaderCell>
              <Cell dataKey="amount" />
            </Column>

            <Column align="center" flexGrow sortable>
              <HeaderCell>Age</HeaderCell>
              <Cell dataKey="amount" />
            </Column>
          </Table>
        </Content>
        <Footer>Footer</Footer>
      </Container>
    </div>
  );
}

export default SelectTests;
