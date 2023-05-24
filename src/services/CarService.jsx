import { async } from "q";


const url = "http://localhost:5027/Cars";
async function Addcar(id){

}


export async function getCarsByGarageID(garageId) {
    const response = await fetch(`${url}?GarageId=${garageId}`);
    const data = await response.json(); 
    return data; 
  }



export async function createCar(name, description, manufacturer, model, year, seats, garageId, engine) {
  const url = 'http://localhost:5027/Cars';

  const payload = {
    Name: name,
    Description: description,
    Manufacturer: manufacturer,
    Model: model,
    Year: year,
    Seats: seats,
    Garage: {
      Id: garageId
    },
    Engine: engine
  };

  console.log("Payload: " + JSON.stringify(payload));

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    console.log("Status: " + status);

    if (status !== 201) {
      let data = await response.text();
      throw new Error(data);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getAllCars() {
  const url = 'http://localhost:5027/Cars';

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
      const response = await fetch(`${url}/${carId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  export async function getCarImage(id) {
    try {
      const response = await fetch(`${url}/${id}`);
  
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        return buffer;
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
        return null; 
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  


  
  
