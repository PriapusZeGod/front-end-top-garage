const url = "http://localhost:5055/Garages";

export async function getGaragesByUserID(userId) {
  try {
    const response = await fetch(`${url}?UserId=${userId}`);

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getAvailableSlots() {
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
export async function createGarage(garageId) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(garageId),
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
