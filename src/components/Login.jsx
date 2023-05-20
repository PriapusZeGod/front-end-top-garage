import React, { useEffect, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { login } from "../services/profileService";
import { useState } from "react";
import UserContext from "./UserContext";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const STORAGE_KEY = "userAuth";

export default function Authorization({ children }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [user, setUser] = useState(getUserFromStorage());
  const [show, setShow] = useState(!user); // Show the modal if user is not present

  const { isLoading, isError, error, data, mutate } = useMutation(
    "login",
    () => login(loginData)
  );

  useEffect(() => {
    if (data) {
      setShow(false);
      handleLoginOrRegister(data);
      saveUserToStorage(data); // Save user to storage on successful login
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    mutate();
  };

  const handleLoginOrRegister = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    removeUserFromStorage(); // Clear user from storage on logout
  };

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          handleLoginOrRegister,
          handleLogout,
        }}
      >
        <LoginForm
          handleSubmit={handleSubmit}
          setLoginData={setLoginData}
          loginData={loginData}
          show={show}
        />
        {children}
      </UserContext.Provider>
    </>
  );
}

// Helper function to retrieve user from storage
function getUserFromStorage() {
  const userJSON = localStorage.getItem(STORAGE_KEY);
  return userJSON ? JSON.parse(userJSON) : null;
}

// Helper function to save user to storage
function saveUserToStorage(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

// Helper function to remove user from storage
function removeUserFromStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

function LoginForm({ handleSubmit, setLoginData, loginData, show }) {
  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Please Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
