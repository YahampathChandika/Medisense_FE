import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FlexboxGrid, CheckPicker } from "rsuite";
import { useGetAllPackagesQuery } from "../../../store/api/testApi";
import { useForm } from "react-hook-form";

function SelectedPackages() {
  const { data: getAllPackage } = useGetAllPackagesQuery();
  const [selectedData, setSelectedData] = useState([]);
  console.log("data", getAllPackage);

  const handleDataSelect = (selectedItems) => {
    setSelectedData(selectedItems);
    setValue("itemid", selectedItems);

  };

  const checkPickerData = getAllPackage?.payload.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const form = useForm({
    mode: "onTouched",
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
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
                value={selectedData}
                style={{ width: "90%", zIndex: "150" }}
                onChange={handleDataSelect}
                // {...register("jobId")}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>
        {selectedData.length > 0 && (
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
                {selectedData.map((selectedItem, index) => {
                  const correspondingPackage = getAllPackage?.payload.find(
                    (item) => item.id === selectedItem
                  );

                  if (correspondingPackage) {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{correspondingPackage.packageCode}</td>
                        <td>{correspondingPackage.price}</td>
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
                })}
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
