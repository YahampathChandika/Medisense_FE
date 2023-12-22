import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FlexboxGrid, CheckPicker } from "rsuite";
import {
  useGetAllPackagesQuery,
  useGetAllTestsQuery,
} from "../../../store/api/testApi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPackage , addTest } from "../../../store/slice/selectPackageSlice";

function SelectedPackages() {
  const { data: getAllPackage } = useGetAllPackagesQuery();
  const { data: getAllTest } = useGetAllTestsQuery();
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  console.log("getAllPackage", getAllPackage);
  console.log("getAllTest", getAllTest);

  const dispatch = useDispatch();

  const handlePackageSelect = (selectedItems) => {
    const selectedPackageItems = selectedItems.map((selectedItem) => {
      const correspondingPackage = getAllPackage?.payload.find(
        (item) => item.packageCode === selectedItem
      );

      if (correspondingPackage) {
        return {
          packageCode: correspondingPackage.packageCode,
          id: correspondingPackage.id,
          // Add other properties as needed
        };
      }

      return null;
    });

    const filteredSelectedPackages = selectedPackageItems.filter(Boolean);

    setSelectedPackages(filteredSelectedPackages);
    dispatch(addPackage(filteredSelectedPackages));
  };

  const handleTestSelect = (selectedItems) => {
    const selectedTestItems = selectedItems.map((selectedItem) => {
      const correspondingTest = getAllTest?.payload.find(
        (item) => item.testCode === selectedItem 
      );

      if (correspondingTest) {
        return {
          id: correspondingTest.id,
          testCode: correspondingTest.testCode,


          // Add other properties as needed
        };
      }

      return null;
    });

    const filteredSelectedTests = selectedTestItems.filter(Boolean);

    setSelectedTests(filteredSelectedTests);
    dispatch(addTest(filteredSelectedTests));
  };

  const checkPickerData = getAllPackage?.payload.map((item) => ({
    label: item.name,
    value: item.packageCode,
  }));

  const checkTestPickerData = getAllTest?.payload.map((item) => ({
    label: item.description,
    value: item.testCode,
  }));

  const form = useForm({
    mode: "onTouched",
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = () => {
    const selectedItems = watch("itemid");
    console.log(selectedItems);
  };

  return (
    <div className="selectedpackages-main-con">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="selectedpackages-table-top">
          <FlexboxGrid justify="space-between" className="m-3">
            <FlexboxGrid.Item colspan={11}>
              <CheckPicker
                data={checkPickerData}
                placeholder="Select Package"
                style={{ width: "45%", zIndex: "150" }}
                onChange={handlePackageSelect}
                renderValue={() => <div>Select Package</div>}
              />
              <CheckPicker
                data={checkTestPickerData}
                placeholder="Select Test"
                style={{ width: "45%", zIndex: "150", marginLeft: "25px" }}
                onChange={handleTestSelect}
                renderValue={() => <div>Select Test</div>}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>
        {(selectedPackages.length > 0 || selectedTests.length > 0) && (
          <div
            style={{
              maxHeight: "426px",
              overflowY: "auto",
              width: "auto",
              minHeight: "426px",
            }}
          >
            <Table>
              <thead className="selectedpackages-table-head">
                <tr>
                  <th>No</th>
                  <th>Package ID</th>
                  <th>Amount</th>
                  <th style={{ paddingLeft: "7.5%" }}>Action</th>
                </tr>
              </thead>
              <tbody className="selectedpackages-table-body">
                {[...selectedPackages, ...selectedTests].map(
                  (selectedItem, index) => {
                    const correspondingItem =
                      getAllPackage?.payload.find(
                        (pkg) => pkg.packageCode === selectedItem.packageCode
                      ) ||
                      getAllTest?.payload.find(
                        (test) => test.testCode === selectedItem.testCode
                      );

                    if (correspondingItem) {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {correspondingItem.packageCode ||
                              correspondingItem.testCode}
                          </td>
                          <td>{correspondingItem.price || "N/A"}</td>
                          <td style={{ paddingLeft: "7.5%" }}>
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              style={{ color: "#A30D11" }}
                            />
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  }
                )}
              </tbody>
            </Table>
          </div>
        )}
        <div className="selectedpackages-footer"></div>
      </form>
    </div>
  );
}

export default SelectedPackages;
