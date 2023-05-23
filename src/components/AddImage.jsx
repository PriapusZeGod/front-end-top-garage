import React, { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, Box, Button, Heading } from '@chakra-ui/react';

const API_ENDPOINT = 'http://localhost:5027/Cars/1/image';

const queryClient = new QueryClient();

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('image', file, file.name);

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }

  const data = await response.blob();

  const imageUrl = URL.createObjectURL(data);

  return imageUrl;
};

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      queryClient.invalidateQueries('fileUpload');
    }
  };

  const { isLoading, isError, error, data } = useQuery('fileUpload', () => uploadFile(selectedFile), {
    enabled: !!selectedFile,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (data && !imageUrl) {
    setImageUrl(data);
  }

  return (
    <Box display='flex' flexDirection='column'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        width='100%'
        py={12}
        bg='rgba(0, 0, 0, 0.7)'
        mb={2}
      >
        <Box color='white'>
          <Heading as='h1'>File Upload App</Heading>
        </Box>
      </Box>
      <Box display='flex' alignItems='center' justifyContent='center' mb={4}>
        <input type='file' onChange={handleFileChange} />
      </Box>
      <Box display='flex' alignItems='center' justifyContent='center' mb={4}>
        <Button colorScheme='purple' onClick={handleUpload}>
          Upload
        </Button>
      </Box>
      {imageUrl && (
        <Box display='flex' alignItems='center' justifyContent='center'>
          <img src={imageUrl} alt='Uploaded' />
        </Box>
      )}
    </Box>
  );
};

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <FileUploadComponent />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
