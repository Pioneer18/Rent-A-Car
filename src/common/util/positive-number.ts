import { Injectable } from '@nestjs/common';

/**
 * **summary**: confirm the provided number is positive
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
