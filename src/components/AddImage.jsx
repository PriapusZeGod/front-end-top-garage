import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { useQueryClient, useQuery } from 'react-query';
import React from 'react';

const baseUrl = "http://localhost:5027/Cars"; // Base URL for API

export default function AddImage({ userId }) {
  const garageId = userId != null ? userId : 1;
  const queryClient = useQueryClient();
  const { data, status } = useQuery(["cImage", garageId], () => getCarsByGarageID(garageId));

  const handleUploadImage = async (garageId, image) => {
    await uploadImage(garageId, image);
    queryClient.invalidateQueries(["cImage", garageId]);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  const cImage = data;

  const getUploadParams = ({ meta, file }) => {
    return {
      url: `${baseUrl}/${garageId}/image`,
    };
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  const handleSubmit = (files) => {
    const uploadedFile = files[0];
    if (uploadedFile) {
      const image = uploadedFile.file;

      // Upload the image
      handleUploadImage(garageId, image);
    }
  };

  return (
    <>
      {/* Render image data */}
      {cImage && (
        <div>
          <h2>{cImage.name}</h2>
          {/* Render other image information */}
          {/* ... */}
        </div>
      )}

      {/* Render Dropzone */}
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept=".jpg, .jpeg, .png, .gif, .jfif"
      />
    </>
  );
}

// Fetches cars by garage ID
export async function getCarsByGarageID(garageId) {
  try {
    const response = await fetch(`${baseUrl}?GarageId=${garageId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cars data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Uploads image to Cars/{id}/image
export async function uploadImage(garageId, image) {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(`${baseUrl}/${garageId}/image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    console.log("Image uploaded successfully");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
