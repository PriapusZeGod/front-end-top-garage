import React, { useEffect } from "react";
import profileImg from "../images/profile.webp";
import { useState } from "react";

const url = "http://localhost:5158";

function Profile() {
  const [profiles, setProfiles] = useState([{
    id: 0,
    name: "Unknown",
    email: "unknown",
    age: "0",
    phone: "0",
  }]);
  const [profile, setProfile] = useState({
    id: 0,
    name: "Unknown",
    email: "unknown",
    age: "0",
    phone: "0",
  });

  useEffect(() => {
    console.log("works");
    fetchProfiles();
  }, []);

  useEffect(() => {
    setProfile(profiles[0]);
  }, [profiles]);

  const fetchProfiles = async () => {
    const response = await getProfiles();
    const data = await response.json();
    setProfiles(await data);
    console.log(data);
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 text-center">
            <img
              src={profileImg}
              width={"300px"}
              style={{ borderRadius: "50%", border: "2px solid black" }}
              alt="profile"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <p className="fs-1 ">
              Name: <span className="fw-bolder">{profiles[0].name}</span>
            </p>
            <p className="fs-1">
              Surname: <span className="fw-bolder">{profiles[0].name}</span>
            </p>
            <p className="fs-1">
              E-mail: <span className="fw-bolder">{profiles[0].email}</span>
            </p>
            <p className="fs-1">
              Phone Number: <span className="fw-bolder">{profiles[0].phone}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

async function getProfiles() {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "*/*",
    Host: "localhost:5158",
    // Add any additional headers you want to include
  };

  const response = await fetch(`${url}/Users`, {
    headers: headers,
    mode: "no-cors",
  });

  console.log(await response);


  return response;
}


export default function App() {
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const data = await response.text();
      setResponseText(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>{responseText}</p>
    </div>
  );
}
