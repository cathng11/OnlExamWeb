import { useEffect, useRef } from 'react';

const useUnload = fn => {
    const cb = useRef(fn);

    useEffect(() => {
        cb.current = fn;
    }, [fn]);
    useEffect(() => {
        const onUnload = (...args) => { cb.current?.(...args) };
        window.addEventListener("beforeunload", onUnload);
        return () => window.removeEventListener("beforeunload", onUnload );//eslint-disable-next-line
    }, []);
};

export default useUnload;