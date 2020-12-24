import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnavailabilityModelInterface } from '../../rental/interface/modelInterface/Unavailability/unavailability.interface';
import { unavailabilityModel } from '../../common/Const';
import { UnavailabilityInterface } from 'src/rental/interface/unavailability.interface';

@Injectable()
export class UnavailabilityService {
    constructor(
        @InjectModel(unavailabilityModel) private readonly unavailability: Model<UnavailabilityModelInterface>,
    ) { }

    /**
     * **summary**: Save an Unavailabiity Document for the selected Rental
     * @param Unavailabiity The Unavailability Document to be saved
     */
    scheduleUnavailability = async (unavailability: UnavailabilityInterface) => {
        try {
            const document = await new this.unavailability(unavailability);
            await document.save();
            // map the returned model into a plain UnavailabilityInterface
            return document;
        } catch (err) {
            throw new Error(err);
        }
    }
    /**
     * **summary**:
     */
    viewUnavailability = async () => {

    }
    /**
     * **summary**:
     */
    rescheduleUnavailability = async () => {

    }
    /**
     * **summary**:
     */
    removeUnavailability = async () => {

    }
    
}
