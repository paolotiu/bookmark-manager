import { useEffect, useRef } from 'react';

// Credits:
// https://stackoverflow.com/a/57335271/14242400
export const useDebouncedCallback = <A extends any[]>(cb: (...args: A) => void, delay: number) => {
    const argsRef = useRef<A>();
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    const cleanup = () => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
    };
    // make sure our timeout gets cleared if
    // our consuming component gets unmounted
    useEffect(() => cleanup, []);

    return (...args: A) => {
        argsRef.current = args;

        // clear debounce timer
        cleanup();

        // Start waiting again
        timeout.current = setTimeout(() => {
            if (argsRef.current) {
                cb(...argsRef.current);
            }
        }, delay);
    };
};
