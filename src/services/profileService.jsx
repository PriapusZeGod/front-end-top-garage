import jwt_decode from "jwt-decode";

const url = "http://localhost:5158/Users";
const authUrl = "http://localhost:5158/Auth";

function decodeJWT(token) {
  try {
    const decoded = jwt_decode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

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

export async function login({ email, password }) {
  console.log("User: " + JSON.stringify({ email, password }));
  const response = await fetch(authUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const status = response.status;
  console.log("Status: " + status);
  if (status != 200) {
    let data = await response.text();
    // console.log("Error: " + data);
    throw new Error(data);
  }
  const data = await response.text();
  const decodedToken = decodeJWT(data);
  // console.log(decodedToken);

  if (decodedToken) {
    console.log(decodedToken);
    // Access user information
    // const name = decodedToken["DisplayName"];
    const email =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ];
    // ... access other claims as needed
    // console.log("Name: " + name);
    console.log("Email: " + email);
    return getProfileByEmail(email);
  } else {
    console.log("Invalid JWT");
  }
  
}

export async function register({ name, email, password, age, phone }) {
  console.log("User: " + JSON.stringify({ name, email, password, age, phone }));
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, age, phone }),
  });
  const status = response.status;
  console.log("Status: " + status);
  if (status != 201) {
    let data = await response.text();
    // console.log("Error: " + data);
    throw new Error(data);
  }
  const data = await response.json();
  return data;
}


async function getProfileByEmail(email) {
  const response = await fetch(url + "/" + email);
  const data = await response.json();
  return data;
}
