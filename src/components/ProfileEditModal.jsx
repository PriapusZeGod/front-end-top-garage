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

export default function ProfileEditModal({
  isOpenProp,
  onCloseProp,
  profile,
  setProfile,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
              {/*PASSWORD*/}
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter new password"
                onChange={(e) => {
                  user.password = e.target.value;
                  console.log("Password: " + user.password);
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
          </ModalBody>

          <ModalFooter>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
// import { updateProfile } from "../services/profileService";
// import Alert from "react-bootstrap/Alert";
// import React from "react";

// export default function ProdileEditModal({ profile, setProfile }) {
//   async function updateUser() {
//     setAlert(null);
//     try {
//       const error = await updateProfile(user);
//       console.log("Error: " + error);
//       if (error != null) {
//         setAlert(<Alert variant="danger">Error: {error.text}</Alert>);
//       } else {
//         console.log("User to be set: " + JSON.stringify(user));
//         // setProfile(user);
//         setAlert(
//           <Alert variant="success">Profile updated successfully!</Alert>
//         );
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setAlert(<Alert variant="danger">Error: {error.message}</Alert>);
//     }
//   }

//   return (
//     <>
//       <Button variant="dark" onClick={handleShow}>
//         Edit Profile
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Your Profile</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="ControlInput1">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 autoFocus
//                 defaultValue={user.email}
//                 onChange={(e) => {
//                   user.email = e.target.value;
//                   console.log("Email: " + user.email);
//                 }}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="ControlInput2">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="name"
//                 autoFocus
//                 defaultValue={user.name}
// onChange={(e) => {
//   user.name = e.target.value;
//   console.log("Name: " + user.name);
// }}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="ControlInput3">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 autoFocus
//                 placeholder="Enter new password"
// onChange={(e) => {
//   user.password = e.target.value;
//   console.log("Password: " + user.password);
// }}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="ControlInput4">
//               <Form.Label>Age</Form.Label>
//               <Form.Control
//                 type="name"
//                 autoFocus
//                 defaultValue={user.age}
//                 onChange={(e) => {
//                   user.age = e.target.value;
//                   console.log("Age: " + user.age);
//                 }}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="ControlInput5">
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control
//                 type="mobile"
//                 autoFocus
//                 defaultValue={user.phone}
// onChange={(e) => {
//   user.phone = e.target.value;
//   console.log("Phone: " + user.phone);
// }}
//               />
//             </Form.Group>
//           </Form>

//           {alert}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={updateUser}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }
