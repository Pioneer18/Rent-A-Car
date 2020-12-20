import { number } from "@hapi/joi";
import { RentalModelInterface } from "../interface/modelInterface/Rental/rental-model.interface";
import { RentalInterface } from "../interface/rental.interface";

export class MapRentalUtil {
    constructor() { }

    map = async (data: RentalModelInterface): Promise<RentalInterface> => {
        return {
            _id: data._id,
            userId: data.userId,
            rentalTitle: data.rentalTitle,
            rentalDescription: data.rentalDescription,
            address: data.address,
            loc: {
                type: data.loc.type,
                coordinates: data.loc.coordinates,
            },
            specs: {
                odometer: data.specs.odometer, 
                transmission: data.specs.transmission, 
                cityMpg: data.specs.cityMpg, 
                hwyMpg: data.specs.hwyMpg, 
                mpgE: data.specs.mpgE, 
                fuel: data.specs.fuel, 
                gasGrade: data.specs.gasGrade, 
                description: data.specs.description, 
                make: data.specs.make, 
                model: data.specs.model, 
                style: data.specs.style, 
                color: data.specs.color, 
                numOfSeats: data.specs.numOfSeats, 
                numDoors: data.specs.numDoors, 
            },
            registration: {
                vin: data.registration.vin,
                licensePlate: data.registration.licensePlate,
                state: data.registration.state,
            },
            features: data.features,
            scheduling: {
                requiredNotice: data.scheduling.requiredNotice, 
                rentMinDuration: data.scheduling.rentMinDuration, 
                rentMaxDuration: data.scheduling.rentMaxDuration, 
            },
            pricing: {
                price: data.pricing.price,
                discounts: {
                    weekly: data.pricing.discounts.weekly,
                    monthly: data.pricing.discounts.monthly,
                },
            },
            photos: data.photos, 
            listed: data.listed
        }
    }

}