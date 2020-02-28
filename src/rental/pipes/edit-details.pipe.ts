import { Injectable, PipeTransform } from '@nestjs/common';
import { EditDetailsDto } from '../dto/edit-details.dto';
import { PositiveNumber } from '../../common/util/positive-number';
import { TypeOfValue } from '../../common/util/typeof-value';

@Injectable()
export class EditDetailsPipe implements PipeTransform {

    positiveNumber: PositiveNumber;
    typeOfValue: TypeOfValue;
    constructor() {
        this.positiveNumber = new PositiveNumber();
        this.typeOfValue = new TypeOfValue();
    }

    // validate EditDetailsDto
    private validateDetails = async (value: EditDetailsDto) => {
        // check rentalId
        if (!value.rentalId || !this.typeOfValue.validate(value.rentalId, 'string')) {
            throw new Error('Invalid rental id');
        }
        // must have at least one detail to update
        if (!value.specs && !value.features) {
            throw new Error('Invalid request, no details given');
        }
        // validate each spec value
        if (value.specs) {
            if (value.specs.odometer &&
                !this.typeOfValue.validate(value.specs.odometer, 'number') || !this.positiveNumber.validate(value.specs.odometer)
                ) {
                    throw new Error('Odometer must be a positive number');
                }
            if (value.specs.transmission &&
                !this.typeOfValue.validate(value.specs.transmission, 'string')) {
                    throw new Error('transmission must be a valid value (string)');
                }
            if (value.specs.cityMpg &&
                !this.typeOfValue.validate(value.specs.cityMpg, 'number') || !this.positiveNumber.validate(value.specs.cityMpg)) {
                    throw new Error('cityMpg must be a positive number');
                }
            if (value.specs.hwyMpg &&
                !this.typeOfValue.validate(value.specs.hwyMpg, 'number') || !this.positiveNumber.validate(value.specs.hwyMpg)) {
                    throw new Error('hwyMpg must be a positive number');
                }
            if (value.specs.fuel &&
                !this.typeOfValue.validate(value.specs.fuel, 'string')) {
                    throw new Error('fuel must be a valid value (string)');
                }
            if (value.specs.gasGrade &&
                !this.typeOfValue.validate(value.specs.gasGrade, 'string')) {
                    throw new Error('gasGrade must be a valid value (string)');
                }
            if (value.specs.description &&
                !this.typeOfValue.validate(value.specs.description, 'string')) {
                    throw new Error('description must be a valid value (string)');
                }
            if (value.specs.model &&
                !this.typeOfValue.validate(value.specs.model, 'string')) {
                    throw new Error('model must be a valid value (string)');
                }
            if (value.specs.style &&
                !this.typeOfValue.validate(value.specs.style, 'string')) {
                    throw new Error('style must be a valid value (string)');
                }
            if (value.specs.color &&
                !this.typeOfValue.validate(value.specs.color, 'string')) {
                    throw new Error('color must be a valid value (string)');
                }
            if (value.specs.numOfSeats &&
                !this.typeOfValue.validate(value.specs.numOfSeats, 'number') || !this.positiveNumber.validate(value.specs.numOfSeats)) {
                    throw new Error('numOfSeats must be a positive number');
                }
            if (value.specs.numDoors &&
                !this.typeOfValue.validate(value.specs.numDoors, 'number') || !this.positiveNumber.validate(value.specs.numDoors)) {
                    throw new Error('numDoors must be a positive number');
                }
            if (value.specs.driveAssist &&
                !this.typeOfValue.validate(value.specs.driveAssist, 'boolean')) {
                    throw new Error('driveAssist must be a valid value (boolean)');
                }
            if (value.specs.rearviewCam &&
                !this.typeOfValue.validate(value.specs.rearviewCam, 'boolean')) {
                    throw new Error('rearviewCam must be a valid value (boolean)');
                }
            if (value.specs.bluetooth &&
                !this.typeOfValue.validate(value.specs.bluetooth, 'boolean')) {
                    throw new Error('bluetooth must be a valid value (boolean)');
                }
            if (value.specs.sunRoof &&
                !this.typeOfValue.validate(value.specs.sunRoof, 'boolean')) {
                    throw new Error('sunRoof must be a valid value (boolean)');
                }
        }
        if (value.features) {
            if (value.features.length > 0) {
                for (const x of value.features) {
                    if (!this.typeOfValue.validate(x, 'string')) {
                        throw new Error('features must be valid values (string)');
                    }
                }
            }
        }
    }

    // apply validation
    async transform(value: EditDetailsDto) {
        this.validateDetails(value);
        return value;
    }
}
