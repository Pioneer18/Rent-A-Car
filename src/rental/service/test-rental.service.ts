import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentalInterface } from '../interface/rental.interface';
import { Injectable } from '@nestjs/common';

/**
 * Test Rental Service provides access to private rentalModel for Unit Testing
 */
@Injectable()
export class TestRentalService {
    constructor(
        @InjectModel('Rental') private readonly rentalModel: Model<RentalInterface>,
    ) {}

    async returnRentalModel() {
        return this.rentalModel;
    }
}
