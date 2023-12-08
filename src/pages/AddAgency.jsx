import React from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FlexboxGrid,
  Divider,
  Row,
} from "rsuite";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAddAgencyMutation } from "../store/api/agencyApi";

function AddAgency() {
  const [addAgency] = useAddAgencyMutation();

  const form = useForm({
    mode: "onTouched",
  });

  const { register, handleSubmit, reset } = form;

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log("data", data);
    console.log("register", register);

    const responce = await addAgency(data);

    if (responce.error) {
      console.log("Failed");
    } else {
      console.log("Success");
      reset();
    }
  };

  useEffect(() => {
    document.title = "Add Agency | Medisense";
  }, []);

  return (
    <Container className="gcc-con">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <FlexboxGrid justify="start">
            <FlexboxGrid.Item colspan={20} className="main-title">
              Add Agency
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>
        <Divider className="border-t-2 border-gray-300" />
        <Content>
          <Row>
            <label>Agency Name</label>
            <input
              className="rs-input"
              {...register("agencyName")}
              id="agencyName"
            />
          </Row>
          <Row>
            <Row>Address</Row>
            <input
              className="rs-input"
              name="address"
              {...register("address")}
            />
          </Row>
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={11}>
              <Row>Telephone</Row>
              <input
                className="rs-input"
                name="telephone"
                {...register("telephone")}
              />
              <Row>Email</Row>
              <input
                className="rs-input"
                placeholder="johnx@example.com"
                name="email"
                {...register("email")}
              />
              <Row>Labour License</Row>
              <input
                className="rs-input"
                name="labourLicence"
                {...register("labourLicence")}
              />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={11}>
              <Row>Fax</Row>
              <input className="rs-input" name="fax" {...register("fax")} />
              <Row>Contact Person</Row>
              <input
                className="rs-input"
                name="contactPerson"
                {...register("contactPerson")}
              />
              <Row>Commission</Row>
              <input
                className="rs-input"
                name="commition"
                {...register("commition")}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
        <Divider />
        <Footer>
          <FlexboxGrid justify="end">
            <Button type="submit" className="w-40 h-10 bg-blue-800 text-white">
              Continue
            </Button>
          </FlexboxGrid>
        </Footer>
      </form>
    </Container>
  );
}

export default AddAgency;
