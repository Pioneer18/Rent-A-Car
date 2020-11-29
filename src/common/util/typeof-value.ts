/**
 * **summary**: Confirm the provided value is the expected type or null
 * @param value The value to be validated
 */
export class TypeOfValue {
    validate = (value: any, expected: string) => {
        if ((typeof value) !== expected && value !== null) {
            return false;
        }
        return true;
    }
}
