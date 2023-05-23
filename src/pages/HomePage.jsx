import React from "react";
import { useContext, useState } from "react";
import UserContext from "../components/UserContext";
import { useEffect } from "react";


export default function HomePage({Nav, Home})
{
    const { user } = useContext(UserContext);
    const [currentCar, setCurrentCar] = useState({});

    useEffect(() => {
        console.log("Current car: " + JSON.stringify(currentCar));
        }, [currentCar]);
    
    return(
        <>
         {user && <Nav currentCar={currentCar} setCurrentCar={setCurrentCar}/>}
        <Home currentCar={currentCar} />    
        </>
    );
}