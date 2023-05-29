import { getGaragesByUserID } from './GarageService';
import { getAvailableSlots } from './GarageService';
import { createGarages } from './GarageService';
import { getCapacity } from './GarageService';




describe('getGaragesByUserID', () => {
  const userId = '123';
  const mockResponse = [{ id: 1, name: 'Garage 1' }];

  it('should fetch garages by user ID and return the data', async () => {
    global.fetch = jest.fn().mockImplementation(async () => {
      return {
        status: 200,
        json: async () => mockResponse,
      };
    });

    const result = await getGaragesByUserID(userId);

    const expectedURL = `http://localhost:5055/Garages?UserId=${userId}`;
    expect(global.fetch).toHaveBeenCalledWith(expectedURL);

    expect(result).toEqual(mockResponse);
  });

  it('should return an empty array if the user has no garages', async () => {
    global.fetch = jest.fn().mockImplementation(async () => {
      return {
        status: 404,
        json: async () => ({ status: 404, title: 'Not Found' }),
      };
    });

    const result = await getGaragesByUserID(userId);

    const expectedURL = `http://localhost:5055/Garages?UserId=${userId}`;
    expect(global.fetch).toHaveBeenCalledWith(expectedURL);

    expect(result).toEqual([]);
  });

  it('should throw an error if the fetch request fails', async () => {
    const mockErrorMessage = 'Failed to fetch garages';

    global.fetch = jest.fn().mockImplementation(async () => {
      throw new Error(mockErrorMessage);
    });

    await expect(getGaragesByUserID(userId)).rejects.toThrowError(mockErrorMessage);

    const expectedURL = `http://localhost:5055/Garages?UserId=${userId}`;
    expect(global.fetch).toHaveBeenCalledWith(expectedURL);
  });
});





describe('getAvailableSlots', () => {
  it('should fetch available slots and return the data', async () => {
    const mockResponse = [{ id: 1, slotNumber: 1, isAvailable: true }];
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const result = await getAvailableSlots();

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5055/Garages');
    expect(result).toEqual(mockResponse);
  });

  test('should throw an error if the fetch request fails', async () => {
    const mockErrorMessage = 'Request failed';
  
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error(mockErrorMessage)));
  
    await expect(getAvailableSlots()).rejects.toThrowError(mockErrorMessage);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5055/Garages');
  });
});



//Garages unit Test
test('should create a garage', async () => {
    const user = {
      id: 1234
    };
    const id = 5678;
    const name = 'Test Garage';
    const capacity = 10;
    const location = {
      latitude: 37.7749,
      longitude: -122.4194
    };
  
    const mockResponse = {
      id: id,
      name: name,
      capacity: capacity,
      location: location,
      user: {
        id: user.id
      }
    };
  
    const mockFetchPromise = Promise.resolve({
      status: 201,
      json: jest.fn().mockResolvedValue(mockResponse)
    });
  
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  
    const result = await createGarages(user, id, name, capacity, location);
  
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5055/Garages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        capacity: capacity,
        location: {
          latitude: location.latitude,
          longitude: location.longitude
        },
        user: {
          id: user.id
        }
      }),
    });
  });
  




describe('getCapacity', () => {
  const mockGarageId = 123; 

  it('should return the capacity if the fetch request is successful', async () => {
    
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ capacity: 10 }), 
    };
 
    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    const result = await getCapacity(mockGarageId); 
    expect(result).toBe(10); 
    expect(fetch).toHaveBeenCalledWith(`http://localhost:5055/Garages/${mockGarageId}`);
  });
  it('should throw an error if the fetch request fails', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getCapacity(mockGarageId)).rejects.toThrowError(
      'Request failed with status 500'
    );
    expect(fetch).toHaveBeenCalledWith(`http://localhost:5055/Garages/${mockGarageId}`);
});
});
