import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";

import Alert from "react-bootstrap/Alert";
import { updateProfile } from "../services/profileService";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { useQuery, useQueryClient } from "react-query";
import { useContext } from "react";
import UserContext from "./UserContext";

export default function ProfileEditModal({ isOpenProp, onCloseProp, profile }) {
  const { handleLogout } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const user = profile;

  const [alert, setAlert] = useState();
  const [success, setSuccess] = useState(false);

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
        if (error.errors.Email != null) {
          setAlert(<Alert variant="danger">Error: {error.errors.Email}</Alert>);
        } else if (error.errors.Password != null) {
          setAlert(
            <Alert variant="danger">Error: {error.errors.Password}</Alert>
          );
        }
      } else {
        console.log("User to be set: " + JSON.stringify(user));

        setAlert(
          <Alert variant="success">Profile updated successfully!</Alert>
        );
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert(<Alert variant="danger">Error: {error.message}</Alert>);
    }
  }

  function handleCloseAndLogout() {
    handleClose();
    handleLogout();
  }

  return (
    <>
      <Button colorScheme="gray" onClick={onOpen}>
        Edit Profile
      </Button>

      <Modal isOpen={isOpen || isOpenProp} onClose={onClose || onCloseProp}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Edit Your Profile</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!success && (
              <FormControl>
                {/*EMAIL*/}
                <FormLabel>Email address</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <EmailIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder={user.email}
                    onChange={(e) => {
                      user.email = e.target.value;
                      console.log("Email: " + user.email);
                    }}
                  />
                </InputGroup>
                {/*NAME*/}
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder={user.name}
                  onChange={(e) => {
                    user.name = e.target.value;
                    console.log("Name: " + user.name);
                  }}
                />
                {/*AGE*/}
                <FormLabel>Age</FormLabel>
                <Input
                  type="age"
                  placeholder={user.age}
                  onChange={(e) => {
                    user.age = e.target.value;
                    console.log("Age: " + user.age);
                  }}
                />
                {/*PHONE NUMBER*/}
                <FormLabel>Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <PhoneIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="tel"
                    placeholder={user.phone}
                    onChange={(e) => {
                      user.phone = e.target.value;
                      console.log("Phone: " + user.phone);
                    }}
                  />
                </InputGroup>
              </FormControl>
            )}
            {alert}
          </ModalBody>

          <ModalFooter>
            {!success && (
              <>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  mr={3}
                  onClick={onClose || onCloseProp}
                >
                  Close
                </Button>
                <Button variant="ghost" onClick={updateUser}>
                  Update User
                </Button>
              </>
            )}

            {success && (
              <Button
                variant="ghost"
                colorScheme="blue"
                mr={3}
                onClick={handleCloseAndLogout}
              >
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export function ChangePasswordModal({ isOpenProp, onCloseProp }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user } = useContext(UserContext);

  let profile = user;
  const handleClose = () => {
    setIsOpen(false);
    setNewPassword("");
    setConfirmPassword("");
    setAlert(null);
  };

  const handleShow = () => {
    setIsOpen(true);
  };

  async function updatePassword() {
    setAlert(null);

    if (newPassword !== confirmPassword) {
      setAlert(<Alert variant="danger">Passwords do not match</Alert>);
      return;
    }

    try {
      profile.password = newPassword;
      // Perform password update logic here
      // Replace the following lines with your actual password update code
      const error = await updateProfile(profile);
      if (error != null) {
        if (error.errors.Password != null) {
          setAlert(
            <Alert variant="danger">Error: {error.errors.Password}</Alert>
          );
        }
      } else {
        setSuccess(true);
        setAlert(
          <Alert variant="success">Password updated successfully!</Alert>
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert(<Alert variant="danger">Error: {error.message}</Alert>);
    }
  }

  return (
    <>
      <Button colorScheme="gray" onClick={handleShow}>
        Change Password
      </Button>

      <Modal isOpen={isOpen || isOpenProp} onClose={onCloseProp || handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!success && (
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
               
              </FormControl>
            )}
             {alert}
          </ModalBody>

          <ModalFooter>
            {!success && (
              <>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  mr={3}
                  onClick={onCloseProp || handleClose}
                >
                  Close
                </Button>
                <Button variant="ghost" onClick={updatePassword}>
                  Update Password
                </Button>
              </>
            )}

            {success && (
              <Button
                variant="ghost"
                colorScheme="blue"
                mr={3}
                onClick={onCloseProp || handleClose}
              >
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
