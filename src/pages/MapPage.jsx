import React from "react";
import MapViewComponent from "../components/MapView";

export default function MapPage({ Nav, MapViewComponent }) {
  return (
    <>
      <Nav />
      <MapViewComponent />
    </>
  );
}
