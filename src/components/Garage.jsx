import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { getGaragesByUserID, deleteGarage } from "../services/GarageService";
import { getCarsByGarageID } from "../services/CarService";
import gclass from "../images/g-class.png";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { EditIcon, ViewIcon, DeleteIcon } from "@chakra-ui/icons";

export default function GarageList({ userId }) {
  const queryClient = useQueryClient();
  const { data, status } = useQuery(["garages", userId], () =>
      getGaragesByUserID(userId)
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error fetching data</div>;
  }
  if (data.status === 404) {
    return <div>No garages found</div>;
  }

  const garages = data;
  return (
      <>
        <SimpleGrid spacing={4} minChildWidth="300px">
          {garages.map((g) => (
              <div key={g.id}>
                <GarageWidget garage={g} userId={userId} />
              </div>
          ))}
        </SimpleGrid>
      </>
  );
}

function GarageWidget({ garage, userId }) {
  const queryClient = useQueryClient();
  const { data, status } = useQuery(["cars", garage.id], () =>
      getCarsByGarageID(garage.id)
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  const cars = data;

  const handleDeleteCar = async (carId) => {
    try {
      console.log("Deleting car with ID:", carId);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleDeleteGarage = async (garageId) => {
    try {
      await deleteGarage(garageId);
      queryClient.invalidateQueries(["garages", userId]); // Invalidate the "garages" query with the userId to trigger a re-fetch
    } catch (error) {
      console.error("Error deleting garage:", error);
    }
  };

  return (
      <>
        <SimpleGrid spacing={4} minChildWidth="300px">
          <Card borderTop="8px" borderColor="purple.400" bg="white">
            <CardHeader>
              <Heading as="h2">{garage.name}</Heading>
            </CardHeader>

            <CardBody color="gray.500">
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
                      <div className="text-center text-light fw-bolder fs-2">
                        {garage.availableSlots}/{garage.capacity}
                      </div>
                    </div>
                  </div>
                  <div className="col text-start border border-0">
                    <ul className="text-light m-2">
                      {cars.length &&
                          cars.map((c) => (
                              <li key={c.id}>
                                {c.name}
                              </li>
                          ))}
                    </ul>
                  </div>
                </div>

                <div className="row">
                  <img src={gclass} alt="Garage" />
                </div>
              </div>
            </CardBody>
            <Divider borderColor="gray.200" />
            <CardFooter>
              <HStack>
                <Button variant="ghost" leftIcon={<ViewIcon />}>
                  Watch
                </Button>
                <Button variant="ghost" leftIcon={<EditIcon />}>
                  Comment
                </Button>
                <Button
                    variant="ghost"
                    leftIcon={<DeleteIcon />}
                    onClick={() => handleDeleteGarage(garage.id)}
                    color={"red"}
                >
                </Button>
              </HStack>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </>
  );
}


// import { useState } from "react";
// import Dropdown from "react-bootstrap/Dropdown";
// import gclass from "../images/g-class.png";
// import React from "react";
// import { useEffect } from "react";
// import { getGaragesByUserID } from "../services/GarageService";
// import { getCarsByGarageID } from "../services/CarService";
// import { useQuery, useQueryClient } from "react-query";

// export default function GarageList({ userId }) {

// const queryClient = useQueryClient();
// const { data, status } = useQuery(["garages", userId], () => getGaragesByUserID(userId));

// if (status === "loading") {
//   return <div>Loading...</div>
// }
// if (status === "error") {
//   return <div>Error fetching data</div>;
// }

// const garages = data;

//   return (
// <>
//   <div className="container">
//     <div className="row mt-5">
//       {garages.map((g) => (
//         <div key={g.id} className="col-sm-4 mt-3">
//           <GarageWidget garage={g} />
//         </div>
//       ))}
//     </div>
//   </div>
// </>
//   );
// }

// function GarageDropdown({ garages, currentGarage, setCurrentGarage }) {
//   return (
//     <Dropdown>
//       <Dropdown.Toggle variant="dark" id="dropdown-basic">
//         {currentGarage.name}
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         {garages.map((g) => (
//           <Dropdown.Item key={g.id} onClick={() => setCurrentGarage(g)}>
//             {g.name}
//           </Dropdown.Item>
//         ))}
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// }

// function GarageWidget({ garage }) {
//   const queryClient = useQueryClient();
//   const { data, status } = useQuery(["cars", garage.id], () => getCarsByGarageID(garage.id));

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }
//   if (status === "error") {
//     return <div>Error fetching data</div>;
//   }

//   const cars = data;

//   return (
//     <>
//       <div className="bg-primary rounded">
//         <div className="row">
//           <h1 className="text-center text-light mt-2 ">{garage.name}</h1>
//           <div className="col m-2 border border-0">
//             <div className="row">
//               <div className="text-center text-light fw-bold mt-2 ">
//                 Free Spots:
//               </div>
//             </div>
//             <div className="row">
//               <div className="text-center text-light fw-bolder fs-2">
//                 {garage.availableSlots}/{garage.capacity}
//               </div>
//             </div>
//           </div>
//           <div className="col text-start border border-0">
//             <ul className="text-light m-2">
//               {cars.map((c) => (
//                 <li key={c.id}>{c.name}</li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="row">
//           <img src={gclass} />
//         </div>
//       </div>
//     </>
//   );
// }
