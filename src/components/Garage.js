import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import gclass from "../images/g-class.png";
import { useEffect } from "react";
import { getGaragesByUserID } from "../services/GarageService";
import { getCarsByGarageID } from "../services/CarService";

export default function GarageList({userId}) {

  const [garages, setGarages] = useState([
    {
      "id": 1,
      "name": "Unknown",
      "capacity": 5,
      "availableSlots": 3,
      "location": {
        "id": 1,
        "latitude": 55.862656,
        "longitude": 9.837616
      },
      "user": {
        "id": 1
      },
      "cars": [
        {
          "id": 1
        },
        {
          "id": 2
        }
      ]
    }
  ]);

  useEffect(() => {
    fetchGarages();
  }, []);

  async function fetchGarages()
  {
    setGarages(await getGaragesByUserID(userId));
  }

  const [garage, setGarage] = useState(garages[0]);

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          {/* {garages.map((g) => <div key={g.id} className="col-sm-4 mt-3"><GarageWidget garage={g} /></div>)} */}
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

  const [cars, setCars] = useState([]);

  
  useEffect(() => {
    fetchCars();
  }, []);
  async function fetchCars()
  {
    setCars(await getCarsByGarageID(garage.id));
  }


  return (
    <>
      <div className="bg-primary rounded">
        <div className="row">
          <h1 className="text-center text-light mt-2">{garage.name}</h1>
          <div className="col m-2">
            <div className="row">
              <div className="text-center text-light fw-bold mt-2">
                Free Spots:
              </div>
            </div>
            <div className="row">
              <div className="text-center text-light fw-bolder fs-2">{garage.availableSlots}/{garage.capacity}</div>
            </div>
          </div>
          <div className="col text-start">
            <ul className="text-light m-2">
              {cars.map((c) => <li key={c.id}>{c.name}</li>)}
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
