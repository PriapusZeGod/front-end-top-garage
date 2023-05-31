import React, {useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import {deleteGarage, getGaragesByUserID} from "../../services/GarageService.jsx";
import {getCarsByGarageID} from "../../services/CarService.jsx";
import {getAlarmByGarageId, setAlarmByGarage,} from "../../services/EnviromentService.jsx";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

export default function GarageList({ userId }) {
  const queryClient = useQueryClient();
  const { data, status } = useQuery(["garages", userId], () =>
    getGaragesByUserID(userId)
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error fetching data</div>;
  }
  if (data.status === 404) {
    return <div>No garages found</div>;
  }

  const garages = data;
  return (
    <>
      <SimpleGrid spacing={4} minChildWidth="300px">
        {garages.map((g) => (
          <div key={g.id}>
            <GarageWidget garage={g} userId={userId} />
          </div>
        ))}
      </SimpleGrid>
    </>
  );
}

function GarageWidget({ garage, userId }) {
  const queryClient = useQueryClient();
  const { data: carsData, status: carsStatus } = useQuery(
    ["cars", garage.id],
    () => getCarsByGarageID(garage.id)
  );

  const { data: alarmData, status: alarmStatus } = useQuery(
    ["alarm", garage.id],
    () => getAlarmByGarageId(garage.id)
  );

  const [showNotification, setShowNotification] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  if (carsStatus === "loading" || alarmStatus === "loading") {
    return <div>Loading...</div>;
  }
  if (carsStatus === "error" || alarmStatus === "error") {
    return <div>Error fetching data</div>;
  }

  const cars = carsData;
  const alarm = alarmData;

  const handleDeleteCar = async (carId) => {
    try {
      console.log("Deleting car with ID:", carId);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleDeleteGarage = async (garageId) => {
    try {
      await deleteGarage(garageId);
      queryClient.invalidateQueries(["garages", userId]);
    } catch (error) {
      console.error("Error deleting garage:", error);
    }
  };

  const handleToggleAlarm = async () => {
    try {
      await setAlarmByGarage(garage.id, !alarm);
      setShowNotification((prevShowNotification) => !prevShowNotification);
    } catch (error) {
      console.error("Error setting alarm:", error);
    }
  };

  const handleConfirmDelete = async (garageId) => {
    try {
      await deleteGarage(garageId);
      queryClient.invalidateQueries(["garages", userId]);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting garage:", error);
    }
  };

  return (
    <>
      <SimpleGrid spacing={4} minChildWidth="300px">
        <Card borderTop="8px" borderColor="purple.400" bg="white">
          <CardHeader>
            <Heading as="h2">{garage.name}</Heading>
          </CardHeader>

          <CardBody color="gray.500">
            <div className="bg-dark rounded">
              <div className="row">
                <h1 className="text-center text-light mt-2 ">{garage.name}</h1>
                <div className="col m-2 border border-0">
                  <div className="row">
                    <div className="text-center text-light fw-bold mt-2 ">
                      Free Spots:
                    </div>
                  </div>
                  <div className="row">
                    <div className="text-center text-light fw-bolder fs-2">
                      {garage.availableSlots}/{garage.capacity}
                    </div>
                  </div>
                </div>
                <div className="col text-start border border-0">
                  <ul className="text-light m-2">
                    {cars.length &&
                      cars.map((c) => <li key={c.id}>{c.name}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </CardBody>
          <Divider borderColor="gray.200" />
          <CardFooter>
            <HStack>
              <Button
                variant="ghost"
                leftIcon={<DeleteIcon />}
                onClick={() => setShowDeleteConfirmation(true)}
                color={"red"}
              >
                Delete
              </Button>
              <Button
                variant={showNotification ? "solid" : "outline"}
                colorScheme="blue"
                onClick={handleToggleAlarm}
              >
                {showNotification ? "Turn Off Alarm" : "Turn On Alarm"}
              </Button>
            </HStack>
          </CardFooter>
        </Card>
      </SimpleGrid>

      {showDeleteConfirmation && (
        <DeleteConfirmationPopup
          garageId={garage.id}
          handleConfirmDelete={handleConfirmDelete}
          handleClose={() => setShowDeleteConfirmation(false)}
        />
      )}
    </>
  );
}

function DeleteConfirmationPopup({
  garageId,
  handleConfirmDelete,
  handleClose,
}) {
  return (
    <Box
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="md"
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Heading as="h3" size="md" mb={4}>
        Are you sure you want to delete?
      </Heading>
      <Flex justify="center">
        <Button
          colorScheme="red"
          mr={2}
          onClick={() => handleConfirmDelete(garageId)}
        >
          Yes
        </Button>
        <Button onClick={handleClose}>No</Button>
      </Flex>
    </Box>
  );
}
