import React from "react";
import MapViewComponent from "../../components/Widgets/MapView.jsx";

export default function MapPage({ Nav, MapViewComponent }) {
  return (
    <>
      <Nav />
      <MapViewComponent />
    </>
  );
}
