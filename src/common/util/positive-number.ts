import { Injectable } from '@nestjs/common';

/**
 * Confirm number is positive
 */
@Injectable()
export class PositiveNumber {
    validate = (data: number) => {
        if (Math.sign(data) === -1) {
            return false;
        }
        return true;
    }
}
