import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useQuery } from "react-query";
import "./Map.css";
import { getGaragesByUserID } from "../services/GarageService";

const MAPS_API_KEY = "AIzaSyDfmL5P3N4WBD4YTpVfzvn1Wkg43L4NeHk"; 

export default function MapViewComponent({ userId }) {
  if (userId == null) {
    userId = 1;
  }
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
  });
  const { data, status } = useQuery(["garages", userId], () => getGaragesByUserID(userId));

  if (status === "loading") {
    return <div>Loading...</div>
  }
  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  const garages = data;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Map garages={garages} />
  );
}

function Map({ garages, isLoading, isError }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching garages</div>;
  }

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 55.8581, lng: 9.8476 }} // 
      mapContainerClassName="map-container"
    >
      {garages.map((garage) => (
        <Marker
          key={garage.id}
          position={{
            lat: garage.location.latitude,
            lng: garage.location.longitude,
          }}
        />
      ))}
    </GoogleMap>
  );
}
