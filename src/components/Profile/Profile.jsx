import React, {useContext, useEffect} from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {ArrowUpIcon, EmailIcon, InfoIcon, PhoneIcon} from "@chakra-ui/icons";
import userpng from "../../images/profile.webp";
import GarageList from "../Garage/Garage.jsx";
import UserContext from "./UserContext.jsx";
import ProfileEditModal, {ChangePasswordModal} from "./ProfileEditModal.jsx";

export default function Profile() {
  const { user } = useContext(UserContext);
  const { changeUser } = useContext(UserContext);

  useEffect(() => {
    console.log("Profile: " + JSON.stringify(user));
  }, [user]);
  const profile = user;
  return (
    <Tabs p="4px" colorScheme="purple" variant="enclosed">
      <TabList>
        <Tab _selected={{ color: "white", bg: "purple.400" }}>Account Info</Tab>
        <Tab _selected={{ color: "white", bg: "purple.400" }}>My Garages</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {user && <ProfileData profile={profile} changeUser={changeUser} />}
        </TabPanel>
        <TabPanel>{user && <GarageList userId={profile.id} />}</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

function ProfileData({ profile, changeUser }) {
  const logoutDisclosure = useDisclosure();
  const editModalDisclosure = useDisclosure();
  const { handleLogout } = useContext(UserContext);

  // const imgStyle = {
  //   borderRadius: "50%",
  //   border: "2px solid black",
  // };

  function handleLogOutClose() {
    handleLogout();
    logoutDisclosure.onClose();
  }

  return (
    <SimpleGrid spacing={2} minChildWidth="300px">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Image
          // sx={imgStyle}
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
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <Button
              colorScheme="red"
              onClick={logoutDisclosure.onOpen}
              gridColumn="span 2"
            >
              <ArrowUpIcon boxSize={6} p="4px" />
              Log Out
            </Button>
            <ProfileEditModal
              isOpen={editModalDisclosure.isOpen}
              onClose={editModalDisclosure.onClose}
              profile={profile}
            />
            <ChangePasswordModal
              isOpen={editModalDisclosure.isOpen}
              onClose={editModalDisclosure.onClose}
            />
          </Grid>
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
              <Button colorScheme="red" onClick={handleLogOutClose} ml={3}>
                Log Out
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </SimpleGrid>
  );
}
