import React, { useEffect } from "react";
import profileImg from "../images/profile.webp";
import { useState } from "react";
import GarageList from "./Garage";
import { useQuery, useQueryClient } from "react-query";
import { getProfileById } from "../services/profileService";
import ProfileEditModal from "./ProfileEditModal";

// const url = "http://localhost:5158/";

export default function Profile({ userId }) {
  let id = userId;
  if (userId == null) {
    id = 1;
  }

  const queryClient = useQueryClient();
  const { data, status } = useQuery(["profile", id], () => getProfileById(id) );

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  const profile = data[0];
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
            {/* <ProfileEditModal profile={profile} setProfile={updateObjectState} /> */}
          </div>
        </div>
      </div>
      <GarageList userId={id} />
    </>
  );
}

