/**
 * **summary**: Interface returned by the rental.service.createRentalMethod()
 */
export interface CreateRentalReturn {
    pricing: {
        discounts: {
            weekly: number;
            monthly: number;
        },
        price: number;
    };
    features: string[];
    photos: any[];
    _id: string;
    rentalDescription: string;
    address: string;
    specs: {
        odometer: number;
        transmission: string;
        cityMpg: number | null;
        hwyMpg: number | null;
        mpgE: number | null;
        fuel: string;
        gasGrade: string;
        description: string;
        make: string;
        model: string;
        style: string;
        color: string;
        numOfSeats: number;
        numDoors: number;
    };
    registration: {
        vin: string;
        licensePlate: string;
        state: string;
    };
    scheduling: {
        requiredNotice: number;
        rentMinDuration: number;
        rentMaxDuration: number;
    };
    loc: {
        type: string;
        coordinates: [number, number]
    };
    listed: true;
    __v: number;
}
