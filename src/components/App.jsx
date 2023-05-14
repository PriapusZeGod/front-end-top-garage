import React from "react";
import GarageList from "./Garage";
import { useQuery } from "react-query";
import { getAvailableSlots } from "../services/GarageService";
import "./Navbar.css";

const App = ({ userId }) => {
  const id = userId ?? 1;

  const { data: garagesData, status } = useQuery("availableSlots", getAvailableSlots);

  if (status === "loading") {
    return <div className="loading-spinner">Fetching available slots...</div>;
  }

  if (status === "error" || !garagesData) {
    return (
      <div className="error-container">
        <p className="error-text">Oops! Failed to fetch data.</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  const availableSlots = garagesData.reduce((total, garage) => total + garage.availableSlots, 0);
  const totalCapacity = garagesData.reduce((total, garage) => total + garage.capacity, 0);

  const lineStyle = {
    width: `${(availableSlots / totalCapacity) * 100}%`,
    backgroundColor: "#42b883",
    height: "4px",
    borderRadius: "2px",
  };
  

  return (
    <div>
      <h1>Welcome to the Garage</h1>
      <div className="slots-line" style={lineStyle}></div>
      <div class="paragraph-container">
  <p className="capacity-text">Total Capacity: {totalCapacity}</p>
  <p className="slots-text">Available Slots: {availableSlots}</p>
      </div>
      <GarageList userId={id} />
    </div>
  );
};

export default App;
