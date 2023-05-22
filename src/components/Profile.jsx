import React from "react";
import {
  TabList,
  TabPanels,
  Tabs,
  Tab,
  TabPanel,
  Box,
  SimpleGrid,
  CardHeader,
  CardBody,
  CardFooter,
  Card,
  Text,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Image,
  HStack,
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon, ArrowUpIcon, InfoIcon } from "@chakra-ui/icons";
import userpng from "../images/profile.webp";
import GarageList from "./Garage";
import { useQuery, useQueryClient } from "react-query";
import { useMutation } from "react-query";

import { getProfileById, updateProfile } from "../services/profileService";
import ProfileEditModal from "./ProfileEditModal";

export default function Profile({ userId }) {
  let id = userId;
  if (userId == null) {
    id = 1;
  }

  const queryClient = useQueryClient();
  const { data, status } = useQuery(["profile", id], () => getProfileById(id));

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  const profile = data[0];
  return (
    <Tabs p="4px" colorScheme="purple" variant="enclosed">
      <TabList>
        <Tab _selected={{ color: "white", bg: "purple.400" }}>Account Info</Tab>
        <Tab _selected={{ color: "white", bg: "purple.400" }}>My Garages</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ProfileData profile={profile} />
        </TabPanel>
        <TabPanel>
          <GarageList userId={id} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

function ProfileData({ profile }) {
  const logoutDisclosure = useDisclosure();
  const editModalDisclosure = useDisclosure();

  const imgStyle = {
    borderRadius: "50%",
    border: "2px solid black",
  };

  return (
    <SimpleGrid spacing={2} minChildWidth="300px">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Image
          sx={imgStyle}
          src={userpng}
          alt="profile"
          w={{ base: "full", sm: "300px" }}
        />
      </Box>

      <Card>
        <CardHeader as="h1">
          <InfoIcon p="2px" mb="6px" />
          Profile Data
        </CardHeader>
        <CardBody>
          <Text mt="4px" as="h4">
            Name: {profile.name} {profile.surname}
          </Text>
          <Text mt="4px" as="h5">
            Age: {profile.age}
          </Text>
          <Text mt="4px" as="h5">
            <EmailIcon p="4px" />
            {profile.email}
          </Text>
          <Text mt="4px" as="h5">
            <PhoneIcon p="4px" />
            {profile.phone}
          </Text>
        </CardBody>
        <CardFooter>
          <HStack>
            <Button colorScheme="red" onClick={logoutDisclosure.onOpen}>
              <ArrowUpIcon boxSize={6} p="4px" />
              Log Out
            </Button>
            <ProfileEditModal
              isOpen={editModalDisclosure.isOpen}
              onClose={editModalDisclosure.onClose}
              profile={profile}
            />
          </HStack>
        </CardFooter>
      </Card>

      <AlertDialog
        isOpen={logoutDisclosure.isOpen}
        leastDestructiveRef={logoutDisclosure.cancelRef}
        onClose={logoutDisclosure.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Log Out
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure you want to Log Out?</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={logoutDisclosure.cancelRef}
                onClick={logoutDisclosure.onClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={logoutDisclosure.onClose}
                ml={3}
              >
                Log Out
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </SimpleGrid>
  );
}

// import React, { useEffect } from "react";
// import profileImg from "../images/profile.webp";
// import { useState } from "react";
// import GarageList from "./Garage";
// import { useQuery, useQueryClient } from "react-query";
// import { useMutation } from 'react-query';

// import { getProfileById, updateProfile } from "../services/profileService";
// import ProfileEditModal from "./ProfileEditModal";

// // const url = "http://localhost:5158/";

// export default function Profile({ userId }) {
// let id = userId;
// if (userId == null) {
//   id = 1;
// }

// const queryClient = useQueryClient();
// const { data, status } = useQuery(["profile", id], () => getProfileById(id) );

// if (status === "loading") {
//   return <div>Loading...</div>
// }
// if (status === "error") {
//   return <div>Error fetching data</div>;
// }

// const profile = data[0];
//   return (
//     <>
//       <div className="container">
//         <div className="row mt-5">
//           <div className="col-md-6 text-center">
//             <img
//               src={profileImg}
//               width={"300px"}
//               style={{ borderRadius: "50%", border: "2px solid black" }}
//               alt="profile"
//               className="img-fluid"
//             />
//           </div>
//           <div className="col-md-6">
//             <p className="fs-1 ">
//               Name: <span className="fw-bolder">{profile.name}</span>
//             </p>
//             <p className="fs-1 ">
//               Age: <span className="fw-bolder">{profile.age}</span>
//             </p>
//             <p className="fs-1">
//               E-mail: <span className="fw-bolder">{profile.email}</span>
//             </p>
//             <p className="fs-1">
//               Phone Number: <span className="fw-bolder">{profile.phone}</span>
//             </p>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-12 text-center">
//             <ProfileEditModal profile={profile} />
//           </div>
//         </div>
//       </div>
//       <GarageList userId={id} />
//     </>
//   );
// }
