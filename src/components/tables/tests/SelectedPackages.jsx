import React from "react";
import { Button, Table } from "react-bootstrap";
import { mockData } from "../../../assets/mocks/mockData";
import "../../../assets/css/Tests.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FlexboxGrid, Input, InputGroup } from "rsuite";

function SelectedPackages() {
  const data = mockData(15);

  return (
    <div className="selectedpackages-main-con">
      <div className="selectedpackages-table-top">
        <FlexboxGrid justify="space-between" className="m-3">
          <FlexboxGrid.Item colspan={11}>
            <InputGroup>
              <Input placeholder="Search Tests ..." style={{ margin: 0 }} />
              <InputGroup.Button>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Button>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6} className="justify-end flex">
            <Button className="w-40 h-10 bg-blue-800 text-white">
              Add Test
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
      <div style={{ maxHeight: "426px", overflowY: "auto", width: "auto" }}>
        <Table >
          <thead className="selectedpackages-table-head">
            <tr>
              <th>No</th>
              <th>Package ID</th>
              <th>Amount</th>
              <th style={{paddingLeft:"7.5%"}}>Action</th>
            </tr>
          </thead>
          <tbody className="selectedpackages-table-body">
            {data.map((test, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{test.description}</td>
                <td>{test.amount}</td>
                <td style={{paddingLeft:"7.5%"}}>
                  <FontAwesomeIcon icon={faTrashCan} style={{color:"#A30D11"}}/>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="selectedpackages-footer">
      </div>
    </div>
  );
}

export default SelectedPackages;