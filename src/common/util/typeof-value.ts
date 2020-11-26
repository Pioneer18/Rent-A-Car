/**
 * **summary**: confirm the provided value is the expected type or null
 */
export class TypeOfValue {
    validate = (value: any, expected: string) => {
        if ((typeof value) !== expected && value !== null) {
            return false;
        }
        return true;
    }
}
