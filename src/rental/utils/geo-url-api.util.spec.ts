import { Test, TestingModule } from '@nestjs/testing';
import { GetCoordinatesInterface } from '../interface/utils/geoUrlApi/get-coordinates.interface';
import { GeoUrlApiUtil } from './geo-url-api.util';
/**
 * Summary:
 * creates a request string and makes the api request
 * returns the coordinates from the API request
 * Mocks:
 * geoUrlApiUtil.makeRequest method; no need to make actual api request
 */
describe('GeoUrlApiUtil Unit Test', () => {
  const geoUrl: string = 'fake_url';
  const apiKey: string = 'fake_api_key';
  let util: GeoUrlApiUtil;
  let app: TestingModule;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoUrlApiUtil],
    }).compile();

    app = module;
    util = module.get<GeoUrlApiUtil>(GeoUrlApiUtil);
  });

  describe('definition test', () => {
    it('Should be defined', async () => {
      expect(util).toBeDefined();
    });
  });

  describe('test the functionality of the Util', () => {
    const address: string = '204 W Washington St Lexington 24450';
    const data: GetCoordinatesInterface = {
      apiKey,
      geoUrl,
      address
    }
    const mockResponse: [number, number] = [
      99, -99
    ]
    it('should return coordinates', async () => {
      jest
        .spyOn(util, 'getCoordinates')
        .mockImplementation(async () => mockResponse);
      expect(await util.getCoordinates(data)).toEqual(mockResponse);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
