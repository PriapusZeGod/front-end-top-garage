import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { updateProfile } from "../services/profileService";
import Alert from "react-bootstrap/Alert";
import React from "react";

export default function ProdileEditModal({ profile, setProfile }) {
  const [show, setShow] = useState(false);
  const user = profile;

  const [alert, setAlert] = useState();

  const handleClose = () => {
    setShow(false);
    setAlert(null);
  };
  const handleShow = () => setShow(true);

  async function updateUser() {
    setAlert(null);
    try {
      const error = await updateProfile(user);
      console.log("Error: " + error);
      if (error != null) {
        setAlert(<Alert variant="danger">Error: {error.text}</Alert>);
      } else {
        console.log("User to be set: " + JSON.stringify(user));
        // setProfile(user);
        setAlert(
          <Alert variant="success">Profile updated successfully!</Alert>
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert(<Alert variant="danger">Error: {error.message}</Alert>);
    }
  }

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                autoFocus
                defaultValue={user.email}
                onChange={(e) => {
                  user.email = e.target.value;
                  console.log("Email: " + user.email);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlInput2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                autoFocus
                defaultValue={user.name}
                onChange={(e) => {
                  user.name = e.target.value;
                  console.log("Name: " + user.name);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlInput3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                autoFocus
                placeholder="Enter new password"
                onChange={(e) => {
                  user.password = e.target.value;
                  console.log("Password: " + user.password);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlInput4">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="name"
                autoFocus
                defaultValue={user.age}
                onChange={(e) => {
                  user.age = e.target.value;
                  console.log("Age: " + user.age);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlInput5">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="mobile"
                autoFocus
                defaultValue={user.phone}
                onChange={(e) => {
                  user.phone = e.target.value;
                  console.log("Phone: " + user.phone);
                }}
              />
            </Form.Group>
          </Form>

          {alert}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
