import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Map.css";
const MAPS_API_KEY = "AIzaSyDfmL5P3N4WBD4YTpVfzvn1Wkg43L4NeHk";

export default function MapViewComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
}

function Map() {
  const  center = useMemo(() => ({lat: 44, lng: -80})); 
   return(<GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
    <Marker position={center}></Marker>
   </GoogleMap>);
}
