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
  export async function createCar(car) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  export async function getAllCars() {
    try {
      const response = await fetch(url);
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  export async function deleteCar(carId) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  export async function getCarImage(id) {
    try {
      const response = await fetch(`${url}/${carId}`);

      if (response.ok) {
        const blob = await response.blob();
        return blob;
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  } 
  export async function createCarImage(carImage) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: carImage,
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
}