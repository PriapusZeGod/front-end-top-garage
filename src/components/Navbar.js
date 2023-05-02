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

function Navbar_Main() {
  return (
    <>
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
              title="Garage Title"
              id="collasible-nav-dropdown"
              responsive="sm"
            >
              <NavDropdown.Item href="#action/3.1">Car 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Car 2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Car 3</NavDropdown.Item>
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
                <Image src={require("../images/user.png")} rounded />
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
                  <Nav.Link href="#action1">Car 1</Nav.Link>
                  <Nav.Link href="#action2">Car 2</Nav.Link>
                  <Nav.Link href="#action2">Car 3</Nav.Link>
                  <Nav.Link href="#action2">Car 4</Nav.Link>
                  <div className="mt-3 d-flex">
                    <div>
                      <div className="mt-4 rounded-circle">
                        <Icon icon="mdi-light:plus" />
                      </div>
                    </div>
                    <div className="ms-1 row">
                      <Button variant="light" className="col">
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
