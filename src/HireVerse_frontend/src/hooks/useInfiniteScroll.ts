import { createRef, useEffect, useState } from "react";
import { useThrottleCallback } from "./useThrottleCallback";

export function useInfiniteScroll() {
    const [isIntersecting, setIntersecting] = useState(false);
    const ref = createRef<any>();
    const throttledIntersecting = useThrottleCallback(setIntersecting, 1000);
    const observer = new IntersectionObserver(([entry]) =>
        throttledIntersecting(entry.isIntersecting),
    );

    useEffect(() => {
        observer.observe(ref?.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return {
        detector: ref,
        isIntersecting,
    };
}
