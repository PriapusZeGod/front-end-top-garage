import { getCarsByGarageID } from './CarService'; 
import { createCar } from './CarService';
import { getAllCars } from './CarService';
import { deleteCar } from './CarService';
import { getCarImage } from './CarService';
import { createCarImage } from './CarService';
import { getImage } from './CarService';
const url = 'http://localhost:5027/Cars';



describe('getCarsByGarageID', () => {
  it('should fetch cars by garage ID and return the data', async () => {
    const mockGarageId = 'your-garage-id';
    const mockResponse = [{ id: 1, make: 'Toyota', model: 'Camry' }];
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => mockJsonPromise,
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const result = await getCarsByGarageID(mockGarageId);

    expect(global.fetch).toHaveBeenCalledWith(`http://localhost:5027/Cars?GarageId=${mockGarageId}`);
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the fetch request fails', async () => {
    const mockGarageId = 'your-garage-id';
    const mockErrorMessage = 'Failed to fetch cars';
    const mockFetchPromise = Promise.resolve({
      ok: false,
      json: () => Promise.reject(new Error(mockErrorMessage)),
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await expect(getCarsByGarageID(mockGarageId)).rejects.toThrowError(mockErrorMessage);
    expect(global.fetch).toHaveBeenCalledWith(`http://localhost:5027/Cars?GarageId=${mockGarageId}`);
  });
});


describe('createCar', () => {
  it('should create a new car and return the data if the request is successful', async () => {
    const mockCar = {
      make: 'Toyota',
      model: 'Camry',
    };
    const mockResponse = {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
    };
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const result = await createCar(mockCar);

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockCar),
    });
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the request fails', async () => {
    const mockCar = {
      make: 'Toyota',
      model: 'Camry',
    };
    const mockErrorMessage = 'Request failed with status 500';
    const mockFetchPromise = Promise.resolve({
      ok: false,
      status: 500,
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await expect(createCar(mockCar)).rejects.toThrowError(mockErrorMessage);
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockCar),
    });
  });
});


describe('getAllCars', () => {
  it('should fetch all cars and return the data if the request is successful', async () => {
    const mockResponse = [
      { id: 1, make: 'Toyota', model: 'Camry' },
      { id: 2, make: 'Honda', model: 'Civic' },
    ];
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const result = await getAllCars();

    expect(global.fetch).toHaveBeenCalledWith(url);
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the request fails', async () => {
    const mockErrorMessage = 'Request failed with status 404';
    const mockFetchPromise = Promise.resolve({
      ok: false,
      status: 404,
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await expect(getAllCars()).rejects.toThrowError(mockErrorMessage);
    expect(global.fetch).toHaveBeenCalledWith(url);
  });
});



describe('deleteCar', () => {
    it('should send a DELETE request and return the data if the request is successful', async () => {
      const carId = '1';
      const mockResponse = { success: true };
      const mockFetchPromise = Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });
  
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  
      const result = await deleteCar(carId);
  
      expect(global.fetch).toHaveBeenCalledWith(`${url}/${carId}`, { method: 'DELETE' });
      expect(result).toEqual(mockResponse);
    });
  
    it('should throw an error if the request fails', async () => {
      const carId = '1';
      const mockErrorMessage = 'Request failed with status 500';
      const mockFetchPromise = Promise.resolve({
        ok: false,
        status: 500,
      });
  
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  
      await expect(deleteCar(carId)).rejects.toThrowError(mockErrorMessage);
      expect(global.fetch).toHaveBeenCalledWith(`${url}/${carId}`, { method: 'DELETE' });
    });
  });



  describe('getCarImage', () => {
    it('should fetch and return the image blob if the request is successful', async () => {
      const carId = '1';
      const mockImage = 'image data';
      const mockFetchPromise = Promise.resolve({
        ok: true,
        arrayBuffer: () => Promise.resolve(mockImage),
      });
  
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  
      const result = await getCarImage(carId);
  
      expect(global.fetch).toHaveBeenCalledWith(`${url}/${carId}`);
      expect(result).toEqual(mockImage);
    });
  
    it('should throw an error if the request fails', async () => {
      const carId = '1';
      const mockErrorMessage = 'Request failed with status 500';
      const mockFetchPromise = Promise.resolve({
        ok: false,
        status: 500,
      });
  
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  
      await expect(getCarImage(carId)).rejects.toThrowError(mockErrorMessage);
      expect(global.fetch).toHaveBeenCalledWith(`${url}/${carId}`);
    });
  });

  
  describe('createCarImage', () => {
    const url = 'http://localhost:5027/Cars'; // Corrected URL
  
    it('should send a POST request with the car image and return the data if the request is successful', async () => {
      const carImage = 'image data';
      const mockResponse = { success: true };
  
      global.fetch = jest.fn().mockImplementation(async () => {
        return {
          ok: true,
          json: async () => mockResponse,
        };
      });
  
      const result = await createCarImage(carImage);
  
      expect(global.fetch).toHaveBeenCalledWith(url, {
        method: 'POST',
        body: carImage,
      });
      expect(result).toEqual(mockResponse);
    });
  
    it('should throw an error if the request fails', async () => {
      const carImage = 'image data';
      const mockErrorMessage = 'Request failed with status 500';
  
      global.fetch = jest.fn().mockImplementation(async () => {
        return {
          ok: false,
          status: 500,
        };
      });
  
      await expect(createCarImage(carImage)).rejects.toThrowError(mockErrorMessage);
  
      expect(global.fetch).toHaveBeenCalledWith(url, {
        method: 'POST',
        body: carImage,
      });
    });
  });






  describe('getImage', () => {
  const userId = '123';
  const imageURL = 'http://example.com/image.jpg';

  it('should return the image URL if the request is successful', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockImplementation(async () => {
      return {
        status: 200,
        blob: jest.fn().mockResolvedValue({}), // Mock the response.blob() method
      };
    });

    // Mock the URL.createObjectURL function
    global.URL.createObjectURL = jest.fn().mockReturnValue(imageURL);

    // Call the function
    const result = await getImage(userId);

    // Assert the fetch function was called with the correct arguments
    const expectedURL = `http://localhost:5027/Cars/${userId}/image`;
    const expectedOptions = {
      method: 'GET',
      headers: {
        Accept: '*/*',
      },
    };
    expect(global.fetch).toHaveBeenCalledWith(expectedURL, expectedOptions);

    // Assert the URL.createObjectURL function was called with the correct arguments
    expect(global.URL.createObjectURL).toHaveBeenCalled();

    // Assert the result is the expected image URL
    expect(result).toBe(imageURL);
  });
  it('should handle the error if the request fails', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockImplementation(async () => {
      return {
        status: 500,
      };
    });
  
    // Mock the console.error function
    console.error = jest.fn();
  
    // Call the function
    const result = await getImage(userId);
  
    // Assert the fetch function was called with the correct arguments
    const expectedURL = `http://localhost:5027/Cars/${userId}/image`;
    const expectedOptions = {
      method: 'GET',
      headers: {
        Accept: '*/*',
      },
    };
    expect(global.fetch).toHaveBeenCalledWith(expectedURL, expectedOptions);
  
    // Assert that console.error was called with the expected error message
    const expectedErrorMessage = 'Failed to fetch image';
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining(expectedErrorMessage));
  
    // Assert the result is null
    expect(result).toBeNull();
  });  
  });