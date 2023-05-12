const url = "http://localhost:5158/Users";

export async function getProfileById(id) {
  const response = await fetch(url);
  const data = await response.json();
  const profile = data.filter((profile) => profile.id === id);
  return profile;
}

export async function updateProfile(user) {
  console.log("User: " + JSON.stringify(user));
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.status != 204) {
      try {
        const data = await response.json();
        console.log("Success:", data);
        return data;
      } catch (error) {
        console.error("Error:", error);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
  console.log("Success");
  return null;
}
