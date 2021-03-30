export const unNullifyObj = <T>(obj: T): { [key: string]: string | number | Date } => {
    const entries = Object.entries(obj);
    const cleanedObj = Object.fromEntries(entries.filter((_, val) => val != null));
    return cleanedObj;
};
