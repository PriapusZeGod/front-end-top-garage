const url = "http://34.36.170.138/Cars";

export async function getCarsByGarageID(garageId) {
  const response = await fetch(`${url}?GarageId=${garageId}`);
  const data = await response.json();
  return data;
}

export async function getCarsByCarName(carName) {
  try {
    const response = await fetch(
      `${url}?CarName=${encodeURIComponent(carName)}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching cars. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching cars: ${error.message}`);
  }
}

export async function createCar(
  name,
  description,
  manufacturer,
  model,
  year,
  seats,
  garageId,
  engine
) {
  const payload = {
    Name: name,
    Description: description,
    Manufacturer: manufacturer,
    Model: model,
    Year: year,
    Seats: seats,
    Garage: {
      Id: garageId,
    },
    Engine: engine,
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
  const response = await fetch(`${url}/${carId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete car. Status: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    console.log("Response data:", data);
    return data;
  }

  return null;
}

export async function getCarImage(id) {
  try {
    const response = await fetch(`${url}/${id}/image`);

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
      method: "POST",
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

export async function getImage(userId) {
  try {
    const response = await fetch(`${url}/${userId}/image`, {
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
export async function updateCar(carId, garageId) {
  console.log("Car ID: " + carId);
  console.log("Garage ID: " + garageId);

  const payload = {
    id: carId,
    garage: {
      id: garageId,
    },
  };

  console.log("Payload: " + JSON.stringify(payload.garage.id));

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return true;
}

export async function uploadImageForCarID(carID, formData) {
  const response = await fetch(`${url}/${carID}/image`, {
    method: "POST",
    applicationType: "multipart/form-data",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("File upload failed");
  }

  return response.status;
}
