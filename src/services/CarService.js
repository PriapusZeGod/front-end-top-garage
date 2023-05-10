import { async } from "q";


const url = "http://localhost:5027/Cars";
async function Addcar(id){

}


export async function getCarsByGarageID(garageId)
{
    const response = await fetch(`${url}?GarageId=${garageId}`);
    const data = await response.json();
    return data;

}