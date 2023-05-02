import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import gclass from "../images/g-class.png";

export default function GarageList() {
  let garages = [
    {
      id: 1,
      name: "garage1",
    },
    {
      id: 2,
      name: "garage2",
    },
    {
      id: 3,
      name: "garage3",
    },
  ];


  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-4 mt-3">
            <GarageWidget garage={garages[0]} />
          </div>
          <div className="col-sm-4 mt-3">
            <GarageWidget garage={garages[1]} />
          </div>
          <div className="col-sm-4 mt-3">
            <GarageWidget garage={garages[2]} />
          </div>
        </div>
      </div>
    </>
  );
}

function GarageDropdown({ garages, currentGarage, setCurrentGarage }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        {currentGarage.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {garages.map((g) => (
          <Dropdown.Item key={g.id} onClick={() => setCurrentGarage(g)}>
            {g.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function GarageWidget({ garage }) {
  return (
    <>
      <div className="bg-primary rounded">
        <div className="row">
          <h1 className="text-center text-light mt-2 ">{garage.name}</h1>
          <div className="col m-2 border border-0">
            <div className="row">
              <div className="text-center text-light fw-bold mt-2 ">
                Free Spots:
              </div>
            </div>
            <div className="row">
              <div className="text-center text-light fw-bolder fs-2">10/10</div>
            </div>
          </div>
          <div className="col text-start border border-0">
            <ul className="text-light m-2">
              <li>Lamborghini</li>
              <li>Toyota</li>
              <li>BMW</li>
            </ul>
          </div>
        </div>

        <div className="row">
          <img src={gclass} />
        </div>
      </div>
    </>
  );
}
