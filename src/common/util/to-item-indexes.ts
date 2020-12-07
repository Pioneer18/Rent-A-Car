/**
 * **summary**: Map the passed array, of any Type, into a new array of tuples with the index for each value
 * @param a The passed in array that will be mapped
 */
export class ToItemsIndexes {
    toItemIndexes = <T>(a: T[]) => {
        return a.map((item, index) => ({item, index}));
    };
}
