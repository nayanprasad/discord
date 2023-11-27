import {useEffect, useState} from "react";

export const useOrigin = () => {
    const [isMounted, setIsMounted] = useState(false);

    const origin = window.location.origin !== "undefined" && window.location.origin ? window.location.origin : "";

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return "";

    return origin;
}
