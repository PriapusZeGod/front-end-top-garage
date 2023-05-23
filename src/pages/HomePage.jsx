import React from "react";
import { useContext } from "react";
import UserContext from "../components/UserContext";


export default function HomePage({Nav, Home})
{
    const { user } = useContext(UserContext);
    return(
        <>
         {user && <Nav/>}
        <Home/>    
        </>
    );
}