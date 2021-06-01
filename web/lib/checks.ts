type Obj = Record<string, unknown>;

// Very dirty, but quick
// Good enough for our purposes
export const checkObjEqual = (a: Obj, b: Obj) => JSON.stringify(a) === JSON.stringify(b);

export const checkWordInSentence = (str: string | undefined, word: string) => {
    return str?.split(' ').includes(word);
};
