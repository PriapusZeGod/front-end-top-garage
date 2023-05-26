import React, { useContext, useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, Box, Button, Heading } from "@chakra-ui/react";
import UserContext from "./UserContext";
import { uploadImageForCarID } from "../services/CarService";
import { useEffect } from "react";

const API_ENDPOINT = "http://localhost:5027/Cars/1/image";

const queryClient = new QueryClient();

async function uploadFile({ carId, file }) {
  try {
    const data = await uploadImageForCarID(carId, file);
    return await data;
  } catch (error) {
    console.error("Error:", error);
  }
}

function FileUploadComponent({ carId}) {
  const { user } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [data, setData] = useState(null);

  

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  async function handleUpload() {
    if (selectedFile) {
      console.log("car id "+ carId)
      const formData = new FormData();
      formData.append("image", selectedFile, selectedFile.name);
      queryClient.invalidateQueries("fileUpload");
      setData(await uploadFile({ carId: carId, file: formData }));
    }
  }

  if (data && !imageUrl) {
    setImageUrl(data);
  }

  return (
    <>
      {data != 200 && (
        <>
          <Box display="flex" flexDirection="column">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              py={12}
              bg="rgba(0, 0, 0, 0.7)"
              mb={2}
            >
              <Box color="white">
                <Heading as="h1">Upload Your Image</Heading>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={4}
            >
              <input type="file" onChange={handleFileChange} />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={4}
            >
              <Button colorScheme="purple" onClick={handleUpload}>
                Upload
              </Button>
            </Box>
            {imageUrl && (
              <Box display="flex" alignItems="center" justifyContent="center">
                <img src={imageUrl} alt="Uploaded" />
              </Box>
            )}
          </Box>
        </>
      )}
      {data == 200 && (
        <>
          <Box display="flex" flexDirection="column">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              py={12}
              bg="rgba(0, 0, 0, 0.7)"
              mb={2}
            >
              <Box color="white">
                <Heading as="h1">Upload Your Image</Heading>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={4}
            >
              <Heading as="h2">File uploaded successfully!</Heading>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

function App({ carId}) {
  const { user } = useContext(UserContext);
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        {user && <FileUploadComponent carId={carId} />}
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
