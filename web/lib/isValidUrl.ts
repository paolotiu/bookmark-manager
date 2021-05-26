// Regex from
// https://stackoverflow.com/a/48110743/14242400
export function isValidUrl(value: any) {
    if (typeof value !== 'string') return false;
    return /(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/.test(value);
}
