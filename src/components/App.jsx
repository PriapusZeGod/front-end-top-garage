import React from "react";
import GarageList from "./Garage";
import { useQuery, useQueryClient } from "react-query";
import { getGaragesByUserID } from "../services/GarageService";
import "./Navbar.css";

const App = ({ userId }) => {
  const id = userId ?? 1;

  const queryClient = useQueryClient();
  const { data, status } = useQuery(["garages", id], () => getGaragesByUserID(id));

  if (status === "loading") {
    return <div>Loading...</div>
  }
  if (status === "error") {
    return (
      <div className="error-container">
        <p className="error-text">Oops! Failed to fetch data.</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  if(!data){
    return <div>No garages found</div>
  }

  



  const availableSlots = data.reduce((total, garage) => total + garage.availableSlots, 0);
  const totalCapacity = data.reduce((total, garage) => total + garage.capacity, 0);

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
      <div className="paragraph-container">
  <p className="capacity-text">Total Capacity: {totalCapacity}</p>
  <p className="slots-text">Available Slots: {availableSlots}</p>
      </div>
      <GarageList userId={id} />
    </div>
  );
};

export default App;
