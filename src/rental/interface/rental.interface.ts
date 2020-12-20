/**
 * **summary**: This interface is a lean version of the RentalModelInterface
 */
export interface RentalInterface {
    _id?: string;
    userId: string;
    rentalTitle: string;
    rentalDescription: string;
    address: string;
    loc: {
      type: string;
      coordinates: [number, number];
    };
    specs: {
      odometer: number;
      transmission: string;
      cityMpg: number;
      hwyMpg: number;
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
    features: string[];
    scheduling: {
      requiredNotice: number;
      rentMinDuration: number;
      rentMaxDuration: number;
    };
    pricing: {
      price: number | null;
      discounts: {
        weekly: number | null;
        monthly: number | null;
      };
    };
    photos: string[];
    listed: boolean;
    __v?: 0
}
