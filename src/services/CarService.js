import { async } from "q";


const url = "http://localhost:5027/Cars";
async function Addcar(id){

}


export async function getCarsByGarageID(garageId) {
    const response = await fetch(`${url}?GarageId=${garageId}`);
    const data = await response.json(); // Parse the response body as JSON
    return data; // Return the parsed response data
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
      const response = await fetch(`${url}/${id}`);

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

  export async function uploadImage(garageId, image) {
    try {
      const formData = new FormData();
      formData.append("image", image);
  
      const uploadUrl = url.replace("{id}", garageId);
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Accept: "*/*",
        },
        body: formData,
      });
  
      if (response.status === 200) {
        console.log("Image uploaded successfully");
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  export async function getImage(userId) {
    try {
      const response = await fetch(`http://localhost:5027/Cars/${userId}/image`, {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });
      if (response.status === 200) {
        const imageURL = URL.createObjectURL(await response.blob());
        console.log("Image URL:", imageURL);
        return imageURL;
      } else {
        console.error("Failed to fetch image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    return null;
  }
  

