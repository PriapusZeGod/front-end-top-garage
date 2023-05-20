import React, { useEffect, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { login, register } from "../services/profileService";
import { useState } from "react";
import UserContext from "./UserContext";
import { Alert , Modal,Button,Form  } from "react-bootstrap";

const STORAGE_KEY = "userAuth";

export default function Authorization({ children }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
  });
  const [user, setUser] = useState(getUserFromStorage());
  const [show, setShow] = useState(!user); // Show the modal if user is not present
  const [registerShow, setRegisterShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  const { isLoading, isError, error, data, mutate } = useMutation("login", () =>
    login(loginData)
  );
  const { isLoading: isRegisterLoading, isError: isRegisterError, error: registerError, mutate: registerMutate } = useMutation("register", (registerData) =>
  register(registerData)
);

useEffect(() => {
  if (isError) {
    setErrorMessage(error.message);
  }
  if(isRegisterError){
    setErrorMessage(registerError.message);
  }
}, [isError, error,isRegisterError,registerError]);


  useEffect(() => {
    if (data) {
      setShow(false);
      handleLoginOrRegister(data);
      saveUserToStorage(data); // Save user to storage on successful login
    }
  }, [data]);

  const handleSubmit = async (event) => {
    setErrorMessage(null);
    event.preventDefault();
    mutate();
  };

  const handleLoginOrRegister = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    removeUserFromStorage(); // Clear user from storage on logout
    setShow(true);
  };

  const handleRegisterShow = () => {
    setErrorMessage(null);
    setShow(false);
    setRegisterShow(true);
  };

  const handleLoginShow = () => {
    setErrorMessage(null);
    setShow(true);
    setRegisterShow(false);
  };

  const handleRegisterSubmit = async (event) => {
    setErrorMessage(null);
    event.preventDefault();
    registerMutate(registerData);
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
          handleRegisterShow={handleRegisterShow}
          error={errorMessage}
        />
        <RegisterForm
          handleSubmit={handleRegisterSubmit}
          setRegisterData={setRegisterData}
          registerData={registerData}
          show={registerShow}
          handleLoginShow={handleLoginShow}
          error={errorMessage}
        />
        {children}
        <Button onClick={handleLogout}>Log Out</Button>
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

function LoginForm({
  handleSubmit,
  setLoginData,
  loginData,
  show,
  handleRegisterShow,
  error,
}) {
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
                required={true}
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
              required={true}
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleRegisterShow}>
            Register
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function RegisterForm({
  handleSubmit,
  setRegisterData,
  registerData,
  show,
  handleLoginShow,
  error
}) {
  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Please Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
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
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                value={registerData.age}
                onChange={(e) =>
                  setRegisterData({ ...registerData, age: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={registerData.phone}
                onChange={(e) =>
                  setRegisterData({ ...registerData, phone: e.target.value })
                }
              />
            </Form.Group>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleLoginShow}>
            Log In
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
