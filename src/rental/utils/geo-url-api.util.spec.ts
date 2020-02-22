import {Test, TestingModule} from '@nestjs/testing';
import { GeoUrlApiUtil } from './geo-url-api.util';
/**
 * Summary:
 * creates a request string and makes the api request
 * returns the coordinates from the API request
 * Mocks:
 * geoUrlApiUtil.makeRequest method; no need to make actual api request
 */
describe('GeoUrlApiUtil Unit Test', () => {

    const appId: string = process.env.GEO_ID;
    const appCode: string = process.env.GEO_CODE;
    const geoUrl: string = process.env.GEO_URL;
    let util: GeoUrlApiUtil;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GeoUrlApiUtil],
        }).compile();

        util = module.get<GeoUrlApiUtil>(GeoUrlApiUtil);
    });

    describe('Check definition', () => {
        it('Should be defined', async () => {
            expect(util).toBeDefined();
        });
    });

    describe('Test the functionality of the Util', () => {
        it('should return coordinates', async () => {
            const address: string = '204 W Washington St Lexington 24450';
            // const expectedCoordinates = [37.786152, -79.443008];
            const mockResponse: object = {
                data: {Response: {View: [{Result: [{Location: {DisplayPosition: { Latitude: 37.786152, Longitude: -79.443008 }}}]}]}},
            };
            jest.spyOn(util, 'makeRequest').mockImplementation(async () => mockResponse);
            const coordinates: [number, number] = await util.getCoordinates(address, geoUrl, appId, appCode);
            expect(coordinates).toEqual([37.786152, -79.443008]);
        });
    });

});
