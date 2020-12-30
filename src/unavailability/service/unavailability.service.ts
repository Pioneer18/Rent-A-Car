import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnavailabilityModelInterface } from '../interface/model/unavailability-model.interface';
import { unavailabilityModel } from '../../common/Const';
import { UnavailabilityInterface } from '../interface/unavailability.interface';
import { RescheduleUnavailabilityDto } from '../dto/reschedule-unavailability.dto';
import { UnavailabilityDto } from '../dto/unavailability.dto';
import { DeleteResponseInterface } from 'src/common/interfaces/delete-response.interface';

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
            console.log(`SCHEDULE UNAVAILABILITY:`)
            console.log(unavailability);
            const document = await new this.unavailability(unavailability);
            console.log('DOCUMENT')
            console.log(document);
            await document.save();
            // map the returned model into a plain UnavailabilityInterface
            return document;
        } catch (err) {
            throw new Error(err);
        }
    }
    /**
     * **summary**: Select a rental by it's _id and view all of it's scheduled pickup-unavailability
     */
    viewUnavailability = async (rental_id: string) => {
        try {
            return await this.unavailability.find({ rentalId: rental_id })
        } catch (err) {
            throw new Error(err);
        }
    }
    /**
     * **summary**: Reschedule the selected unavailability
     */
    rescheduleUnavailability = async (unavailability: RescheduleUnavailabilityDto) => {
        try {
            const filter = { _id: unavailability.unavailability_id }
            const update: UnavailabilityDto = {
                rentalId: unavailability.rentalId,
                title: unavailability.title,
                startDateTime: unavailability.startDateTime,
                endDateTime: unavailability.endDateTime
            }
            return await this.unavailability.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false });
        } catch (err) {
            if (err) throw new Error(err);
        }
    }
    /**
     * **summary**: Remove the selected unavailability
     */
    removeUnavailability = async (_id: string): Promise<DeleteResponseInterface> => {
        try {
            const remove = await this.unavailability.remove({ _id: _id });
            if (remove.deletedCount === 0) {
                throw new Error('The requested unavailability was not found, no documents were deleted.')
            }
            return remove;
        } catch (err) {
            if (err) throw new Error(err);
        }
    }

}
