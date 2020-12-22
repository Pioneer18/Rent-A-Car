import { SearchRentalRadius } from "../const";

export class RadiusToMeters {
    constructor() {}
    /**
     * **summary**: Convert the SearchRentalRadius to it's enumerated value in meters
     */
    convert = (radius: SearchRentalRadius): number => {
        let response: number;
        let trash: any;
        radius === 0 ? response = 3218 : trash = null;
        radius === 1 ? response = 6437 : trash = null;
        radius === 2 ? response = 9656 : trash = null;
        radius === 3 ? response = 12874 : trash = null;
        return response;
    }
}
