export const toItemIndexes = <T>(a: T[]) => {
    return a.map((item, index) => ({item, index}));
};
