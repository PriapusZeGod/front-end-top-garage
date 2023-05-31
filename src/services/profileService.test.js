import jwt_decode from 'jwt-decode';
import { decodeJWT, getProfileById, updateProfile } from './profileService';

jest.mock('jwt-decode');

describe('decodeJWT', () => {
  it('should return null for an invalid JWT', () => {
    const token = 'invalid_token';
    jwt_decode.mockImplementation(() => {
      throw new Error('Invalid JWT');
    });

    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    const result = decodeJWT(token);

    expect(jwt_decode).toHaveBeenCalledWith(token);
    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error decoding JWT:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});

describe('getProfileById', () => {
  it('should return the profile with the specified id', async () => {
    const id = 1;
    const profiles = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(profiles),
    });

    const result = await getProfileById(id);

    expect(global.fetch).toHaveBeenCalledWith('http://34.36.170.138/Users');
    expect(result).toEqual([{ id: 1, name: 'John Doe' }]);
  });
});

describe('updateProfile', () => {
  it('should log and handle error if an error occurs while parsing the response data', async () => {
    const user = { id: 1, name: 'John Doe' };
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockRejectedValue(new Error('Error parsing response data')),
    });
    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    const result = await updateProfile(user);

    expect(result).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('http://34.36.170.138/Users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  it('should log and return null if the response status is 204', async () => {
    const user = { id: 1, name: 'John Doe' };
    global.fetch = jest.fn().mockResolvedValue({
      status: 204,
    });
    const consoleLogSpy = jest.spyOn(console, 'log');
    consoleLogSpy.mockImplementation(() => {});

    const result = await updateProfile(user);

    expect(result).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('http://34.36.170.138/Users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    expect(consoleLogSpy).toHaveBeenCalledWith('Success');

    consoleLogSpy.mockRestore();
  });
});
