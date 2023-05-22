import { async } from "q";


const url = "http://localhost:5027/Cars";
async function Addcar(id){

}


export async function getCarsByGarageID(garageId) {
    const response = await fetch(`${url}?GarageId=${garageId}`);
    const data = await response.json(); // Parse the response body as JSON
    return data; // Return the parsed response data
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
      }
    } catch (error) {
      console.error("Error:", error);
    }
    return null;
  }
  