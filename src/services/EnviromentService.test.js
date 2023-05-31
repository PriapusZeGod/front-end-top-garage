import { getStatsByGarageID, getStatsLimitByGarageID } from './EnviromentService';

describe('getStatsByGarageID', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return an empty array if the response status is 404', async () => {
    const mockResponse = { status: 404 };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await getStatsByGarageID(1);

    expect(result).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('http://34.36.170.138/Stats?GarageId=1');
  });

  it('should return the parsed JSON response if the response status is not 404', async () => {
    const mockResponse = { status: 200, json: jest.fn().mockResolvedValueOnce(['data']) };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await getStatsByGarageID(1);

    expect(result).toEqual(['data']);
    expect(global.fetch).toHaveBeenCalledWith('http://34.36.170.138/Stats?GarageId=1');
    expect(mockResponse.json).toHaveBeenCalled();
  });
});

describe('getStatsLimitByGarageID', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the environment limit for the given garage ID', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce([
        { garage: { id: 1 }, limit: 'yourLimit' },
        { garage: { id: 2 }, limit: 'otherLimit' }
      ])
    };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await getStatsLimitByGarageID(1);

    expect(result).toEqual({ garage: { id: 1 }, limit: 'yourLimit' });
    expect(global.fetch).toHaveBeenCalledWith('http://34.36.170.138/IndoorEnvironments');
    expect(mockResponse.json).toHaveBeenCalled();
  });
});
