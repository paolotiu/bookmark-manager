export const unNullifyObj = <T>(obj: T): { [key: string]: string | number | Date } => {
    const entries = Object.entries(obj);
    const cleanedObj = Object.fromEntries(
        entries.filter(([, val]) => {
            // False is val is null or undefined
            return val != null;
        }),
    );
    return cleanedObj;
};
