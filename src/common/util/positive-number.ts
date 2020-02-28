import { Injectable } from '@nestjs/common';

/**
 * Confirm number is positive
 */
@Injectable()
export class PositiveNumber {
    validate = async (data: number): Promise<boolean> => {
        if (Math.sign(data) === -1) {
            return false;
        }
        return true;
    }
}
