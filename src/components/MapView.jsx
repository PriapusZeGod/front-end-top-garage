import React, { useEffect, useContext } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useQuery } from "react-query";
import "./Map.css";
import { getGaragesByUserID } from "../services/GarageService";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import UserContext from "./UserContext";

const MAPS_API_KEY = "AIzaSyDfmL5P3N4WBD4YTpVfzvn1Wkg43L4NeHk";

export default function MapViewComponent() {
  const { user } = useContext(UserContext);
  const userId = user.id;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
  });

  const { data: garages, status } = useQuery(["garages", userId], () =>
    getGaragesByUserID(userId)
  );

  useEffect(() => {
    if (status === "error") {
      console.log("Error fetching data");
    }
  }, [status]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Flex justifyContent="left" alignItems="left" height="100vh">
      <Map garages={garages} />
    </Flex>
  );
}

function Map({ garages }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const boxBg = useColorModeValue("white", "#111c44");
  const mainText = useColorModeValue("gray.800", "white");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      borderRadius="20px"
      bg={boxBg}
      p="10px"
      width={isExpanded ? "100%" : "300px"}
      height={isExpanded ? "100%" : "300px"}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      onClick={toggleExpand}
      position="relative"
      cursor="pointer"
      border="1px solid black"
    >
      <div style={{ height: "100%" }}>
        <GoogleMap
          zoom={10}
          center={{ lat: 55.8581, lng: 9.8476 }}
          mapContainerStyle={{
            width: isExpanded ? "100%" : "100%",
            height: isExpanded ? "100%" : "100%",
            borderRadius: "10px",
          }}
        >
          {garages &&
            garages.map((garage) => {
              if (
                garage &&
                garage.location &&
                garage.location.latitude &&
                garage.location.longitude
              ) {
                return (
                  <Marker
                    key={garage.id}
                    position={{
                      lat: garage.location.latitude,
                      lng: garage.location.longitude,
                    }}
                  />
                );
              } else {
                return null;
              }
            })}
        </GoogleMap>
      </div>
      {!isExpanded && (
        <Text
          fontWeight="600"
          color={mainText}
          textAlign="center"
          fontSize="xl"
        >
          Click to expand
        </Text>
      )}
    </Box>
  );
}
