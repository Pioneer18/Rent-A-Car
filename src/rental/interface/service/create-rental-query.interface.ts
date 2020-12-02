/**
 * **summary**: Interface for the search rental MongoDB query
 */
export interface RentalQuery {
    'scheduling.rentMinDuration': { $lte: number };
    'scheduling.rentMaxDuration': { $gte: number };
    'scheduling.requiredNotice': { $lte: number };
    'loc': {
        $near: {
            $maxDistance: number; // 8 miles
            $geometry: {
                type: string;
                coordinates: [
                    number, // latitude
                    number // longitude
                ]
            }
        },
    };
    pricing?: {
        price: number;
    };
    features?: {$in: string[]};
}
