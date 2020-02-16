/**
 * Interface for a mapped Rental
 */
export interface MappedRentalInterface {
    address: string;
    specs: {
        odometer: number;
        transmission: string;
        cityMpg: number;
        hwyMpg: number;
        fuel: string;
        gasGrade: string;
        description: string;
        model: string;
        style: string;
        color: string;
        numOfSeats: number;
        numDoors: number;
        driveAssist: boolean;
        rearviewCam: boolean;
        bluetooth: boolean;
        sunRoof: boolean;
    };
    registration: {
        vin: number;
        licensePlate: string;
        state: string;
    };
    features: [string];
    scheduling: {
        requiredNotice: number;
        rentMinDuration: number;
        rentMaxDuration: number;
    };
    pricing: {
        price: number;
        discounts: {
            weekly: number;
            monthly: number;
        };
    };
    loc: {
        type: 'Point';
        coordinates: [number, number];
    };
    photos: [File];
    listed: boolean;
}
