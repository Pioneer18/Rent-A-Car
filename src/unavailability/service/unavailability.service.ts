import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnavailabilityModelInterface } from '../../rental/interface/modelInterface/Unavailability/unavailability.interface';
import { unavailabilityModel } from '../../common/Const';

@Injectable()
export class UnavailabilityService {
    constructor(
        @InjectModel(unavailabilityModel) private readonly unavailability: Model<UnavailabilityModelInterface>,
    ) { }

    /**
     * **summary**:
     */
    scheduleUnavailability = async () => {

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
