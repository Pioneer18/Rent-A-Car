/**
 * Confirm give value is the expected type or null
 */
export class TypeOfValue {
    validate = async (value: any, expected: string): Promise<boolean> => {
        if (typeof value !== expected && typeof value !== null) {
            return false;
        }
        return true;
    }
}
