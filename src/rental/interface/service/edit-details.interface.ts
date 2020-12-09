/**
 * **summary**: Interface for the rental.service.editDetails() method
 */
export interface EditDetailsInterface {
    rentalId: string;
    specs?: {
        odometer?: number;
        transmission?: string;
        cityMpg?: number;
        hwyMpg?: number;
        mpgE?: number;
        fuel?: string;
        gasGrade?: string;
        description?: string;
        make?: string;
        model?: string;
        style?: string;
        color?: string;
        numOfSeats?: number;
        numDoors?: number;
    };
    features?: string[];
}
