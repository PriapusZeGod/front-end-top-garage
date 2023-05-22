import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import gclass from "../images/g-class.png";
import React from "react";
import { useEffect } from "react";
import { getGaragesByUserID } from "../services/GarageService";
import { getCarsByGarageID } from "../services/CarService";
import { useQuery, useQueryClient } from "react-query";

export default function Addgarage({ userId }) {
    let id = userId;
    if (userId == null) {
      id = 1;
    }
    const queryClient = useQueryClient();
    const { data, status } = useQuery(["profile", id], () => getProfileById(id) );
  
  
    if (status === "loading") {
      return <div>Loading...</div>
    }
    if (status === "error") {
      return <div>Error fetching data</div>;
    }
    const garage = data[0];

  }