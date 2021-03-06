/**
 * **summary**: Interface for the rental.service.editDetails() method's MongoDB updater
 */
export interface EditDetailsUpdater {
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
        }
        features?: string[];
}
