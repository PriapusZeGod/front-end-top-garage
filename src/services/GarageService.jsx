const url = "http://34.36.170.138/Garages";

export async function getGaragesByUserID(userId) {
  try {
    const response = await fetch(`${url}?UserId=${userId}`);

    const data = await response.json();
    console.log(data);
    if(data.status === 404 && data.title === "Not Found"){
      return [];
    }
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getAvailableSlots() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function createGarages(user, id, name, capacity, location) {
  const url = 'http://localhost:5055/Garages';

  const payload = {
    name: name,
    capacity: capacity,
    location: {
      latitude: location.latitude,
      longitude: location.longitude
    },
    user: {
      id: user.id
    }
  };

  console.log("Payload: " + JSON.stringify(payload));

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
}



export async function deleteGarage(garageId) {
  const response = await fetch(`${url}/${garageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete garage");
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    console.log("Response data:", data);
    return data;
  }
  return null;
}


export async function getCapacity(garageId) {
  try {
    const response = await fetch(`${url}/${garageId}`);
    if (response.ok) {
      const data = await response.json();
      return data.capacity;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}





