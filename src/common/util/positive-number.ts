import { Injectable } from '@nestjs/common';

/**
 * **summary**: Confirm the provided number is positive
 * @param data The provided number
 */
@Injectable()
export class PositiveNumber {
    validate = (data: number): Boolean => {
        if (Math.sign(data) === -1) {
            return false;
        }
        return true;
    }
}
