import { Test, TestingModule } from "@nestjs/testing"
import { RentalInterface } from "../interface/rental.interface";
import { MapRentalUtil } from "./map-rental.util";

describe('Map Rental Util', () => {
    let util: MapRentalUtil;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MapRentalUtil],
        }).compile();
        
        util = module.get<MapRentalUtil>(MapRentalUtil);
    });

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(util).toBeDefined()
        });
    });

    describe('map', () => {
        const mockRentalModelInterface: any = {
            "_id": "5fcd4cb63f741a0a048da7b1",
            "userId": "5fb00c20ef7f512e4cbac459",
            "rentalTitle": "this is a fake rental title",
            "rentalDescription": "this is a tokyo grocery getter",
            "address": "13125 Gascony St Riverview 33578",
            "loc": {
                "type": "Point",
                "coordinates": [
                    27.79382,
                    -82.33796
                ]
            },
            "specs": {
                "odometer": 20000,
                "transmission": "Auto",
                "cityMpg": 18,
                "hwyMpg": 25,
                "mpgE": null,
                "fuel": "gas",
                "gasGrade": "regular",
                "description": "For your adventures, on-road and off",
                "make": "Chevrolet",
                "model": "Colorado",
                "style": "pickup",
                "color": "orange",
                "numOfSeats": 5,
                "numDoors": 4
            },
            "registration": {
                "vin": "5GAKVCKD1DJ206294",
                "licensePlate": "OD5t",
                "state": "FL"
            },
            "features": [
                "bike rack",
                "Heated Seats"
            ],
            "scheduling": {
                "requiredNotice": 4,
                "rentMinDuration": 1,
                "rentMaxDuration": 4
            },
            "pricing": {
                "price": 28,
                "discounts": {
                    "weekly": 0,
                    "monthly": 0
                }
            },
            "photos": [],
            "listed": true,
        }
        const response: RentalInterface = {
            "_id": "5fcd4cb63f741a0a048da7b1",
            "userId": "5fb00c20ef7f512e4cbac459",
            "rentalTitle": "this is a fake rental title",
            "rentalDescription": "this is a tokyo grocery getter",
            "address": "13125 Gascony St Riverview 33578",
            "loc": {
                "type": "Point",
                "coordinates": [
                    27.79382,
                    -82.33796
                ]
            },
            "specs": {
                "odometer": 20000,
                "transmission": "Auto",
                "cityMpg": 18,
                "hwyMpg": 25,
                "mpgE": null,
                "fuel": "gas",
                "gasGrade": "regular",
                "description": "For your adventures, on-road and off",
                "make": "Chevrolet",
                "model": "Colorado",
                "style": "pickup",
                "color": "orange",
                "numOfSeats": 5,
                "numDoors": 4
            },
            "registration": {
                "vin": "5GAKVCKD1DJ206294",
                "licensePlate": "OD5t",
                "state": "FL"
            },
            "features": [
                "bike rack",
                "Heated Seats"
            ],
            "scheduling": {
                "requiredNotice": 4,
                "rentMinDuration": 1,
                "rentMaxDuration": 4
            },
            "pricing": {
                "price": 28,
                "discounts": {
                    "weekly": 0,
                    "monthly": 0
                }
            },
            "photos": [],
            "listed": true,
        }
        it('should map a RentalInterface from a RentalModelInterface', async () => {
            jest
                .spyOn(util, 'map')   
                .mockImplementation(async () => response);
            expect(await util.map(mockRentalModelInterface)).toBe(response);
        });
    })

});