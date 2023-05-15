import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useQuery } from "react-query";
import "./Map.css";

const MAPS_API_KEY = "AIzaSyDfmL5P3N4WBD4YTpVfzvn1Wkg43L4NeHk"; 
const url = "http://localhost:5055/Garages";

export default function MapViewComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
  });

  const { data: garages, isLoading, isError } = useQuery("garages", fetchGarages);

  async function fetchGarages() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Map garages={garages} isLoading={isLoading} isError={isError} />
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
