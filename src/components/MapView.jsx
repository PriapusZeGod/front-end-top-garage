import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useQuery } from "react-query";
import "./Map.css";
import { getGaragesByUserID } from "../services/GarageService";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

const MAPS_API_KEY = "AIzaSyDfmL5P3N4WBD4YTpVfzvn1Wkg43L4NeHk";

export default function MapViewComponent({ userId }) {
  if (userId == null) {
    userId = 1;
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
  });

  const { data, status } = useQuery(["garages", userId], () =>
    getGaragesByUserID(userId)
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  const garages = data;

  if (!isLoaded) return <div>Loading...</div>;

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
      p="20px"
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
      <GoogleMap
        zoom={10}
        center={{ lat: 55.8581, lng: 9.8476 }}
        mapContainerStyle={{
          width: isExpanded ? "100%" : "100%",
          height: isExpanded ? "100%" : "100%",
          borderRadius: "20px",
        }}
      >
        {garages.length > 0 ? (
          garages.map((garage) => (
            <Marker
              key={garage.id}
              position={{
                lat: garage.location.latitude,
                lng: garage.location.longitude,
              }}
            />
          ))
        ) : (
          <Text>No garages found</Text>
        )}
      </GoogleMap>
      {!isExpanded && (
        <Text fontWeight="600" color={mainText} textAlign="center" fontSize="xl">
          Click to expand
        </Text>
      )}
    </Box>
  );
}
