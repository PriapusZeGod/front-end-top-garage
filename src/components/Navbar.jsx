import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
import "./Navbar.css";
import { Icon } from "@iconify/react";
import Addcar from "./Addcar";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import React from "react";
import logo from "../images/user.png";

function Navbar_Main() {
  const { data, isLoading, error } = useFetch("http://localhost:5055/Garages");
  const { CarsData, CarsIsLoading, CarsError } = useFetch(
    "http://localhost:5027/Cars"
  );
  const [currentGarageName, setCurrentGarageName] = useState("Select Garage");
  const [currentGarrage, setCurrentGarrage] = useState(data?.[0]);
  const [currentCars, setCurrentCars] = useState(CarsData?.[0]);

  useEffect(() => {
    const element = document.getElementById("collapsable-nav-dropdown");
    if (element) {
      element.innerText = currentGarageName;
    }
  }, [currentGarageName]);

  useEffect(() => {
    console.log(CarsData);
  }, [CarsData]);

  if (isLoading || CarsIsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleGarageSelect = (garageName, garage) => {
    setCurrentGarageName(garageName);
    setCurrentGarrage(garage);
  };
  return (
    <>
      {console.log(data)}
      {console.log(CarsData)}
      {[false].map((expand) => (
        <Navbar
          key={expand}
          bg="light"
          variant="light"
          expand={expand}
          className="mb-3"
          sticky="top"
        >
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <NavDropdown
              title={currentGarageName || data[0].name}
              id="collapsable-nav-dropdown"
              responsive="sm"
            >
              {data.map((garage) => (
                <NavDropdown.Item
                  href=""
                  onClick={() => handleGarageSelect(garage.name, garage)}
                  key={garage.id}
                >
                  {garage.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Form className="d-flex mt-2" responsive="sm">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-dark">Search</Button>
            </Form>
            <Nav.Item className="me-5 sm-12">
              <Nav.Link href="/#/profile">
                <Image src={logo} rounded />
              </Nav.Link>
            </Nav.Item>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  All Cars "Garage Title"
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* {CarsData?.map((car) =>
                    currentGarrage?.cars?.forEach((element) => {
                      if (car.id == element.id) {
                        <Nav.Link href="#action1" key={car.id}>
                          car.name
                        </Nav.Link>;
                      }
                    })
                  )} */}

                  <div className="mt-3 d-flex">
                    <div>
                      <div className="mt-4 rounded-circle">
                        <Icon icon="mdi-light:plus" />
                      </div>
                    </div>
                    <div className="ms-1 row">
                      <Button variant="light" className="col">
                        <Nav.Link href="/#/App"></Nav.Link>
                        add car
                      </Button>
                      <Button variant="light" className="col">
                        add garage
                      </Button>
                    </div>
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      {console.log("works")}
    </>
  );
}

export default Navbar_Main;
