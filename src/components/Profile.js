import React, { useEffect } from "react";
import profileImg from "../images/profile.webp";
import { useState } from "react";
import GarageList from "./Garage";
import { getProfileById } from "../services/profileService";
import ProfileEditModal from "./ProfileEditModal";

const url = "http://localhost:5158";

export default function Profile({ userId }) {
  const [profile, setProfile] = useState({
    id: 0,
    name: "Unknown",
    email: "unknown@mail",
    age: "0",
    phone: "0",
  });
  let id = userId;
  if (userId == null) {
    id = 1;
  }

  useEffect(() => {
    console.log("works");
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setProfile(await getProfileById(1));
  };

  const updateObjectState = (updatedObject) => {
    setProfile(updatedObject);
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
              Name: <span className="fw-bolder">{profile.name}</span>
            </p>
            <p className="fs-1 ">
              Age: <span className="fw-bolder">{profile.age}</span>
            </p>
            <p className="fs-1">
              E-mail: <span className="fw-bolder">{profile.email}</span>
            </p>
            <p className="fs-1">
              Phone Number: <span className="fw-bolder">{profile.phone}</span>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <ProfileEditModal profile={profile} setProfile={updateObjectState} />
          </div>
        </div>
      </div>
      <GarageList userId={id} />

    </>
  );
}
